import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

import { ReservationStatus } from '../booking/reservation.dto';
import { PaymentStatus } from '../payment/payment.dto';

export const NotificationType = {
  Booking: 'booking',
  Message: 'message',
  Payment: 'payment',
  Feedback: 'feedback',
  System: 'system',
} as const;

export type NotificationType =
  (typeof NotificationType)[keyof typeof NotificationType];

export class BookingNotificationContentDTO {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  reservationId: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  productId: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Expose()
  @ApiProperty({ type: Date })
  startDate: Date;

  @IsNotEmpty()
  @IsEnum(ReservationStatus)
  @Expose()
  @ApiProperty({ enum: ReservationStatus, enumName: 'ReservationStatus' })
  status: ReservationStatus;
}

export class MessageNotificationContentDTO {
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

  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty()
  messagePreview: string;
}

export class PaymentNotificationContentDTO {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  paymentId: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  amount: number;

  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  @Expose()
  @ApiProperty({ enum: PaymentStatus, enumName: 'PaymentStatus' })
  status: PaymentStatus;
}

export class FeedbackNotificationContentDTO {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  feedbackId: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  productId: number;

  @IsNotEmpty()
  @IsBoolean()
  @Expose()
  @ApiProperty()
  isReply: boolean;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  rating: number;
}

export class SystemNotificationContentDTO {
  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
  @ApiProperty()
  body: string;
}

export type NotificationContent =
  | BookingNotificationContentDTO
  | MessageNotificationContentDTO
  | PaymentNotificationContentDTO
  | FeedbackNotificationContentDTO
  | SystemNotificationContentDTO;

export class NotificationDTO {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  userId: number;

  @IsNotEmpty()
  @IsEnum(NotificationType)
  @Expose()
  @ApiProperty({ enum: NotificationType, enumName: 'NotificationType' })
  type: NotificationType;

  @IsNotEmpty()
  @IsObject()
  @Expose()
  @ApiProperty({ type: Object })
  content: NotificationContent;

  @IsNotEmpty()
  @IsBoolean()
  @Expose()
  @ApiProperty()
  isRead: boolean;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Expose()
  @ApiProperty({ type: Date })
  createdAt: Date;
}

export class NotificationCreateDTO {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  userId: number;

  @IsNotEmpty()
  @IsEnum(NotificationType)
  @Expose()
  @ApiProperty({ enum: NotificationType, enumName: "NotificationType" })
  type: NotificationType;

  @IsNotEmpty()
  @IsObject()
  @Expose()
  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(BookingNotificationContentDTO) },
      { $ref: getSchemaPath(MessageNotificationContentDTO) },
      { $ref: getSchemaPath(PaymentNotificationContentDTO) },
      { $ref: getSchemaPath(FeedbackNotificationContentDTO) },
      { $ref: getSchemaPath(SystemNotificationContentDTO) },
    ],
  })
  content: NotificationContent;
}

export class NotificationMarkAsReadDTO {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  id: number;
}
