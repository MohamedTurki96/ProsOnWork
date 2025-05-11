import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { CommandPattern, QueryPattern } from '@pros-on-work/core';
import {
  PaginationResponse,
  ReclamationCreateCommand,
  ReclamationCreateDTO,
  ReclamationGetDTO,
  ReclamationGetQuery,
  ReclamationListDTO,
  ReclamationListQuery,
  ReclamationUpdateCommand,
  ReclamationUpdateDTO,
} from '@pros-on-work/resources';

import { ReclamationService } from './reclamation.service';

@Controller('Reclamation')
export class ReclamationController {
  constructor(private readonly reclamationService: ReclamationService) {}

  @QueryPattern(ReclamationListQuery)
  async list(@Payload('payload') query: ReclamationListDTO) {
    if (!query.where) {
      query.where = {};
    }

    const reclamations = await this.reclamationService.findMany({
      skip: query.skip,
      take: query.take,
      orderBy: query.sort
        ? {
            [query.sort.property]: query.sort.order,
          }
        : undefined,
      where: {
        ...(query.where ?? {}),
      },
    });

    const count = await this.reclamationService.count({ where: query.where });

    const dtoItems = reclamations.map((i) => i.toDTO());

    return PaginationResponse(dtoItems, count, query);
  }

  @QueryPattern(ReclamationGetQuery)
  async getReclamation(@Payload('payload') query: ReclamationGetDTO) {
    return await this.reclamationService.get(query.id);
  }

  @CommandPattern(ReclamationCreateCommand)
  async handleCreate(@Payload('payload') dto: ReclamationCreateDTO) {
    const result = await this.reclamationService.create(dto);

    return result.toDTO();
  }

  @CommandPattern(ReclamationUpdateCommand)
  async handleUpdate(@Payload('payload') dto: ReclamationUpdateDTO) {
    const result = await this.reclamationService.update(dto);

    return result.toDTO();
  }
}
