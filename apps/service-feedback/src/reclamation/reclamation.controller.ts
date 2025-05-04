import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { CommandPattern, QueryPattern } from '@pros-on-work/core';
import {
  ReclamationCreateCommand,
  ReclamationCreateDTO,
  ReclamationGetDTO,
  ReclamationGetQuery,
  ReclamationUpdateCommand,
  ReclamationUpdateDTO,
} from '@pros-on-work/resources';

import { ReclamationService } from './reclamation.service';

@Controller('Reclamation')
export class ReclamationController {
  constructor(private readonly reclamationService: ReclamationService) {}

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
