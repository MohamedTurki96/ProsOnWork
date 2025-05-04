import { createReadStream, existsSync } from 'fs';
import { extname, join } from 'path';

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QueryPattern } from '@pros-on-work/core';
import { MediaDTO, MediaGetDTO, MediaGetQuery } from '@pros-on-work/resources';
import { Response } from 'express';
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

  @Get(':id/serve')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Serves the actual file based on media ID.',
    content: {
      'application/octet-stream': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })

  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'File not found' })
  async serveFile(@Param('id') id: number, @Res() res: Response) {
    const media = await this.fileService.getFileById(id);
    if (!media) {
      res.status(HttpStatus.NOT_FOUND).send('File not found');
      return;
    }

    const filePath = join(__dirname, 'media', media.filename);
    if (!existsSync(filePath)) {
      res.status(HttpStatus.NOT_FOUND).send("File not found");
      return;
    }

    res.setHeader(
      'Content-Disposition',
      `inline; filename="${media.filename}"`,
    );
    res.setHeader(
      'Content-Type',
      media.mimeType || 'application/octet-stream',
    );

    const stream = createReadStream(filePath);
    stream.pipe(res);
  }

  @QueryPattern(MediaGetQuery)
  async getMedia(@Payload('payload') query: MediaGetDTO) {
    return await this.fileService.getFileById(query.id);
  }
}
