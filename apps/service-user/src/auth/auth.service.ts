import { randomUUID } from 'crypto';

import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventHub, PRISMA_CLIENT } from '@pros-on-work/core';
import {
  ChangePasswordDTO,
  RequestPasswordResetDTO,
  ResetPasswordDTO,
  UserLoginDTO,
  UserPasswordChangedEvent,
  VerifyEmailDTO,
} from '@pros-on-work/resources';
import * as bcrypt from 'bcrypt';

import { ExtendedPrismaClient } from '../db';

@Injectable()
export class AuthService {
  private static TOKEN_EXPIRATION: number = 2 * 60 * 60 * 1000; // 2 hours in ms

  constructor(
    @Inject(PRISMA_CLIENT) private readonly client: ExtendedPrismaClient,
    private readonly eventHub: EventHub,
  ) {}

  async login(dto: UserLoginDTO) {
    const user = await this.client.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    return user.toDTO();
  }

  async changePassword(userId: number, dto: ChangePasswordDTO) {
    const user = await this.client.user.findUnique({ where: { id: userId } });
    if (!user || !(await bcrypt.compare(dto.currentPassword, user.password))) {
      throw new BadRequestException('Current password is incorrect');
    }

    const newHash = await bcrypt.hash(dto.newPassword, 10);

    await this.client.user.update({
      where: { id: userId },
      data: { password: newHash },
    });
    return { success: true };
  }

  async requestReset(dto: RequestPasswordResetDTO) {
    const user = await this.client.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new NotFoundException('User not found');

    const token = randomUUID();

    await this.client.passwordResetToken.upsert({
      where: { email: dto.email },
      update: { token, createdAt: new Date() },
      create: { email: dto.email, token },
    });

    return { token };
  }

  async resetPassword(dto: ResetPasswordDTO) {
    const record = await this.client.passwordResetToken.findUnique({
      where: { token: dto.token },
    });
    if (!record) throw new BadRequestException('Invalid or expired token');

    const tokenAge = Date.now() - new Date(record.createdAt).getTime();

    if (tokenAge > AuthService.TOKEN_EXPIRATION) {
      throw new BadRequestException('Token has expired');
    }

    const newHash = await bcrypt.hash(dto.newPassword, 10);

    await this.client.user.update({
      where: { email: record.email },
      data: { password: newHash },
    });

    await this.client.passwordResetToken.delete({
      where: { email: record.email },
    });

    await this.eventHub.emitEvent(
      new UserPasswordChangedEvent({
        email: record.email,
      }),
    );

    return { success: true };
  }

  async verifyEmail(dto: VerifyEmailDTO) {
    const record = await this.client.emailVerificationToken.findUnique({
      where: { token: dto.token },
    });

    if (!record) throw new BadRequestException('Invalid verification token');

    const tokenAge = Date.now() - new Date(record.createdAt).getTime();

    if (tokenAge > AuthService.TOKEN_EXPIRATION) {
      throw new BadRequestException('Token has expired');
    }

    await this.client.user.update({
      where: { email: record.email },
      data: { emailVerifiedAt: new Date() },
    });

    await this.client.emailVerificationToken.delete({
      where: { email: record.email },
    });

    return { success: true };
  }
}
