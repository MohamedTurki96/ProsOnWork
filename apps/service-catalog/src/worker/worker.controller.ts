import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { CommandPattern, QueryPattern } from '@pros-on-work/core';
import {
  PaginationResponse,
  WorkerCreateCommand,
  WorkerCreateDTO,
  WorkerDeleteCommand,
  WorkerGetDTO,
  WorkerGetQuery,
  WorkerListDTO,
  WorkerListQuery,
  WorkerUpdateCommand,
  WorkerUpdateCommandDTO,
} from '@pros-on-work/resources';

import { WorkerService } from './worker.service';

@Controller('Worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @QueryPattern(WorkerListQuery)
  async listWorkers(@Payload('payload') query: WorkerListDTO) {
    if (!query.where) {
      query.where = {};
    }

    const ownerId = query.where.ownerId;

    delete query.where.ownerId;

    const workers = await this.workerService.findMany({
      skip: query.skip,
      take: query.take,
      orderBy: query.sort
        ? {
            [query.sort.property]: query.sort.order,
          }
        : undefined,
      where: {
        ...(query.where ?? {}),
        ...(ownerId
          ? {
              shop: {
                ownerId,
              },
            }
          : {}),
      },
    });

    const count = await this.workerService.count({ where: query.where });

    const dtoItems = workers.map((i) => i.toDTO());

    return PaginationResponse(dtoItems, count, query);
  }

  @QueryPattern(WorkerGetQuery)
  async getWorker(@Payload('payload') query: WorkerGetDTO) {
    return await this.workerService.get(query.id);
  }

  @CommandPattern(WorkerCreateCommand)
  async handleCreate(@Payload('payload') dto: WorkerCreateDTO) {
    const result = await this.workerService.create(dto);

    return result.toDTO();
  }

  @CommandPattern(WorkerUpdateCommand)
  async handleUpdate(@Payload('payload') dto: WorkerUpdateCommandDTO) {
    const result = await this.workerService.update(dto.id, dto);

    return result.toDTO();
  }

  @CommandPattern(WorkerDeleteCommand)
  async handleDelete(@Payload('payload') dto: WorkerGetDTO) {
    return await this.workerService.delete(dto.id);
  }
}
