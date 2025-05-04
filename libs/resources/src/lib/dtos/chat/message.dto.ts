import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export const MessageType = {
  Text: 'text',
  File: 'file',
  System: 'system',
} as const;

export type MessageType = (typeof MessageType)[keyof typeof MessageType];

export class MessageDTO {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  chatId: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  senderId: number;

  @IsOptional()
  @IsString()
  @Expose()
  @ApiPropertyOptional()
  content?: string;

  @IsNotEmpty()
  @IsEnum(MessageType)
  @Expose()
  @ApiProperty({ enum: MessageType, enumName: 'MessageType' })
  type: MessageType;

  @IsOptional()
  @IsNumber()
  @Expose()
  @ApiPropertyOptional()
  mediaId?: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;
}

export class MessageCreateDTO {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  chatId: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  senderId: number;

  @IsOptional()
  @IsString()
  @Expose()
  @ApiPropertyOptional()
  content?: string;

  @IsOptional()
  @IsNumber()
  @Expose()
  @ApiPropertyOptional()
  mediaId?: number;
}
