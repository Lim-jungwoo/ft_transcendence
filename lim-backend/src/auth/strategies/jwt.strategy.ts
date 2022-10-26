import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // jwt로 생성해서 클라리언트 측으로 보냈던 Token 값을 헤더에 Bearer Token 값으로 포함하여 호출해야
      // 서버에서 토큰을 받아 검사할 수 있다.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration은 토큰이 만료되었는지 검사를 하고 만료되더라도 에러로 리턴할 지 정한다.
      ignoreExpiration: false,
      // jwt 토큰을 생성할 때 사용되는 키로써 외부에 노출되면 안된다.
      secretOrKey: 'tmpsecret',
    });
  }

  validate(payload: any): any {
    return { userId: payload.sub };
  }
}
