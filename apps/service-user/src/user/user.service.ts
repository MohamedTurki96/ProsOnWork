import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PRISMA_CLIENT } from '@pros-on-work/core';
import {
  UserCreateDTO,
  UserGetDTO,
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

    return await this.client.user.findMany({
      ...args,
    });
  }

  async count(args: Prisma.UserCountArgs = {}) {
    return await this.client.user.count(args);
  }

  async get(dto: UserGetDTO) {
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

    return result.toDTO()
  }

  async create(dto: UserCreateDTO) {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    return this.client.user.create({
      data: {
        ...dto,
        password: passwordHash,
      },
    });
  }

  async update(id: number, dto: UserUpdateDTO) {
    return this.client.user.update({
      where: { id },
      data: dto,
    });
  }
}
