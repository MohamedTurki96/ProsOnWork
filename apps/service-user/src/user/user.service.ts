import crypto from 'crypto';

import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PRISMA_CLIENT } from '@pros-on-work/core';
import {
  UserCreateDTO,
  UserDTO,
  UserGetDTO,
  UserRole,
  UserUpdateDTO,
} from '@pros-on-work/resources';
import * as bcrypt from 'bcrypt';

import { ExtendedPrismaClient } from '../db';
import { Prisma } from '../prisma';

@Injectable()
export class UserService {
  constructor(
    @Inject(PRISMA_CLIENT) private readonly client: ExtendedPrismaClient,
  ) {}

  async findMany(args: Prisma.UserFindManyArgs = {}) {
    if (!args.where) {
      args.where = {};
    }

    if (!args.skip) {
      delete args.skip;
    }

    if (!args.take) {
      delete args.take;
    }

    return await this.client.user.findMany(args);
  }

  async count(args: Prisma.UserCountArgs = {}) {
    return await this.client.user.count(args);
  }

  async get(dto: UserGetDTO): Promise<UserDTO> {
    let result = null;

    if (dto.id) {
      result = await this.client.user.findUnique({ where: { id: dto.id } });
    } else if (dto.email) {
      result = await this.client.user.findUnique({
        where: { email: dto.email },
      });
    }

    if (!result) {
      throw new NotFoundException('User not found');
    }

    return result.toDTO();
  }

  async getActive(dto: UserGetDTO) {
    const user = await this.get(dto);

    if (!user.emailVerifiedAt) {
      throw new UnauthorizedException('User not Verified');
    }

    return user;
  }

  async create(dto: UserCreateDTO) {
    const exists = await this.client.user.exists({
      email: dto.email,
    });

    if (exists) {
      throw new BadRequestException('User exists!');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    return await this.client.$transaction(async (client) => {
      const user = await client.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: passwordHash,
          plan: dto.plan,
          role: dto.isClient ? UserRole.Client : UserRole.ServiceProvider,
        },
      });

      const emailVerificationToken = await client.emailVerificationToken.create(
        {
          data: {
            email: user.email,
            token: crypto.randomBytes(10).toString('hex'),
          },
        },
      );

      return { user, emailVerificationToken };
    });
  }

  async update(id: number, dto: UserUpdateDTO) {
    return this.client.user.update({
      where: { id },
      data: dto,
    });
  }
}
