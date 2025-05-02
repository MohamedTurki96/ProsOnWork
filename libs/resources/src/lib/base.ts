import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class GenericDeleteDTO {
  @ValidateIf((o) => !o.ids)
  @IsNotEmpty()
  @IsUUID()
  @Expose()
  @ApiPropertyOptional()
  id?: string;

  @ValidateIf((o) => !o.id)
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty({ each: true })
  @IsUUID('all', { each: true })
  @Expose()
  @ApiPropertyOptional({ isArray: true, type: String })
  ids?: string[];
}
