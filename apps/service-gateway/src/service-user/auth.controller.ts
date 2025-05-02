import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventHub } from '@pros-on-work/core';
import {
  ChangePasswordDTO,
  CurrentUserDTO,
  RequestPasswordResetDTO,
  ResetPasswordDTO,
  UserChangePasswordCommand,
  UserDTO,
  UserLoginCommand,
  UserLoginDTO,
  UserLoginResultDTO,
  UserRequestPasswordResetCommand,
  UserResetPasswordCommand,
  UserVerifyEmailCommand,
  VerifyEmailDTO,
} from '@pros-on-work/resources';

import { ApiNeedsAuthentication } from '../decorators/api.decorator';
import { CurrentUser } from '../decorators/current-user.decorator';
import { Public } from '../decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly eventHub: EventHub,
    private readonly jwtService: JwtService,
  ) {}

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: UserLoginResultDTO })
  async login(@Body() dto: UserLoginDTO): Promise<UserLoginResultDTO> {
    const user = await this.eventHub.sendCommand<UserDTO>(
      new UserLoginCommand(dto),
    );

    const token = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user,
    };
  }

  @Post('change-password')
  @ApiNeedsAuthentication()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: Object })
  async changePassword(
    @CurrentUser() user: CurrentUserDTO,
    @Body() dto: ChangePasswordDTO,
  ) {
    return this.eventHub.sendCommand(
      new UserChangePasswordCommand({
        id: user.id,
        ...dto,
      }),
    );
  }

  @Post('request-password-reset')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: Object })
  async requestReset(@Body() dto: RequestPasswordResetDTO) {
    return this.eventHub.sendCommand(new UserRequestPasswordResetCommand(dto));
  }

  @Post('reset-password')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: Object })
  async resetPassword(@Body() dto: ResetPasswordDTO) {
    return this.eventHub.sendCommand(new UserResetPasswordCommand(dto));
  }

  @Post('verify-email')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: Object })
  async verifyEmail(@Body() dto: VerifyEmailDTO) {
    return this.eventHub.sendCommand(new UserVerifyEmailCommand(dto));
  }
}
