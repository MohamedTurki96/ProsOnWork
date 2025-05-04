
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PRISMA_CLIENT } from '@pros-on-work/core';
import { MediaDTO } from '@pros-on-work/resources';

import { ExtendedPrismaClient } from '../db';

@Injectable()
export class FileService {
  constructor(
    @Inject(PRISMA_CLIENT) private readonly client: ExtendedPrismaClient,
  ) {}

  async saveFileMetadata(file: Express.Multer.File): Promise<MediaDTO> {
    const result = await this.client.media.create({
      data: {
        filename: file.originalname,
        filePath: file.filename,
        mimeType: file.mimetype,
        size: file.size,
      },
    });

    return result.toDTO();
  }

  async getFileById(id: number): Promise<MediaDTO | null> {
    const result = await  this.client.media.findUnique({ where: { id } });

    if (!result) {
      throw new NotFoundException("File not found")
    }

    return result.toDTO()
  }
}
