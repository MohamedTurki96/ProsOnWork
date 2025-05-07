import {
  ArgumentsHost,
  Catch,
  HttpException,
  Injectable,
  InternalServerErrorException,
  ExceptionFilter as NestExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ErrorDTO } from '@pros-on-work/resources';
import { AxiosError } from 'axios';
import { instanceToPlain } from 'class-transformer';
import type { Request, Response } from 'express';
import { throwError } from 'rxjs';

import { InjectableLogger } from '../logger/pino';

interface PlainError {
  status: number;
  message: string;
  name: string;
  stack?: string;
}
const fallbackInternalServerErrorMessage = 'An internal server error occured';

@Injectable()
@Catch()
export class ExceptionFilter implements NestExceptionFilter {
  constructor(private readonly logger: InjectableLogger) {}

  catch(exception: Error, host: ArgumentsHost): any {
    let responseData;

    // Error from Axios
    if (
      exception instanceof HttpException &&
      exception?.cause instanceof AxiosError
    ) {
      responseData = exception?.cause?.response?.data;
    }

    this.logger.error({
      err: exception,
      responseData,
    });

    // The health endpoint requires dedicated error handling
    if (host.getType() === 'http' && exception instanceof HttpException) {
      const ctx = host.switchToHttp();
      const request = ctx.getRequest<Request>();
      const response = ctx.getResponse<Response>();

      if (request.url.endsWith('/health')) {
        response.status(exception.getStatus()).json(exception.getResponse());
        return;
      }
    }

    // Convert unknown exception into plain error that can be exposed to requestors.
    let error: PlainError;

    if (exception instanceof HttpException) {
      error = {
        status: exception.getStatus(),
        message: exception.message,
        name: exception.name,
        stack: exception.stack,
      };
    } else if (exception instanceof RpcException) {
      error = {
        status: 500,
        message: exception.message,
        name: exception.name,
        stack: exception.stack,
      };
    } else {
      // Fallback for unknown exception
      let status = 500;
      let message =
        typeof exception === 'string'
          ? exception
          : fallbackInternalServerErrorMessage;
      let name = InternalServerErrorException.name;

      if (typeof exception === 'object' && exception !== null) {
        if ('status' in exception && typeof exception.status === 'number') {
          status = exception.status as number;
        }

        if ('message' in exception && typeof exception.message === 'string') {
          message = exception.message;
        }

        if ('name' in exception && typeof exception.name === 'string') {
          name = exception.name;
        }
      }

      error = { status, message, name };
    }

    // Response handling depending on the host type
    if (host.getType() === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();

      const errorDto = new ErrorDTO();
      errorDto.statusCode = error.status;
      errorDto.timestamp = new Date().toISOString();
      errorDto.path = request.url;
      errorDto.message = error.message;

      response.status(error.status).json(instanceToPlain(errorDto));
      return;
    } else if (host.getType() === 'rpc') {
      return throwError(() => error);
    }
  }
}
