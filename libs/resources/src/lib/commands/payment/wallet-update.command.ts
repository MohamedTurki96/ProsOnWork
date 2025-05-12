import { ApiProperty } from '@nestjs/swagger';
import { ICommand, SerializeableCommand } from '@pros-on-work/utils';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class WalletUpdateDTO {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  walletId: number;

  @IsNotEmpty()
  @IsNumber()
  @Expose()
  @ApiProperty()
  amount: number;

  @IsNotEmpty()
  @IsBoolean()
  @Expose()
  @ApiProperty()
  increment: boolean;
}

@SerializeableCommand({ resource: 'wallet', action: 'update' })
export class WalletUpdateCommand implements ICommand<WalletUpdateDTO> {
  constructor(readonly payload: WalletUpdateDTO) {}
}
