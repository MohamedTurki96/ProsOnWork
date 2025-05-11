import { ApiProperty } from '@nestjs/swagger';
import { IQuery, SerializeableQuery } from '@pros-on-work/utils';
import { Expose, Type } from 'class-transformer';
import { IsArray, IsDefined, IsObject, ValidateNested } from 'class-validator';

import { FeedbackGetDTO } from '../../dtos/feedback/feedback-get.dto';
import { FeedbackDTO } from '../../dtos/feedback/feedback.dto';

export class FeedbackGetForProductResultDTO {
  @IsDefined()
  @IsArray()
  @IsDefined({ each: true })
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => FeedbackDTO)
  @Expose()
  @ApiProperty({ type: FeedbackDTO, isArray: true })
  items: FeedbackDTO[];
}

@SerializeableQuery({ resource: 'feedback', action: 'list' })
export class FeedbackGetQuery implements IQuery<FeedbackGetDTO> {
  constructor(readonly payload: FeedbackGetDTO) {}
}
