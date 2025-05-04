import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { EventHub } from '@pros-on-work/core';
import { CurrentUserDTO, UserGetQuery } from '@pros-on-work/resources';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly eventHub: EventHub) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: CurrentUserDTO): Promise<CurrentUserDTO> {
    const user = this.eventHub.sendQuery(
      new UserGetQuery({
        id: payload.id,
      }),
    );

    if (!user) {
      throw new UnauthorizedException("User Not Found");
    }

    return payload;
  }
}
