import { extname, join } from 'path';

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QueryPattern } from '@pros-on-work/core';
import { MediaDTO, MediaGetDTO, MediaGetQuery } from '@pros-on-work/resources';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

import { FileService } from './file.service';

@ApiTags('Files')
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: HttpStatus.CREATED })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, 'media'),
        filename: (_req, file, callback) => {
          const uniqueName = uuidv4() + extname(file.originalname);
          callback(null, uniqueName);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.fileService.saveFileMetadata(file);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: MediaDTO })
  async getFile(@Param('id') id: number) {
    return await this.fileService.getFileById(id);
  }

  @QueryPattern(MediaGetQuery)
  async getMedia(@Payload('payload') query: MediaGetDTO) {
    return await this.fileService.getFileById(query.id);
  }
}
