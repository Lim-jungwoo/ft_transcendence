import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    // console.log(request);

    if (authorization === undefined) {
      throw new HttpException('token transmit fail', HttpStatus.UNAUTHORIZED);
    }

    const token = authorization.replace('Bearer ', '');
    request.user = this.validateToken(token);
    return true;
  }

  validateToken(token: string) {
    const secretKey = process.env.JWT_SECRET_KEY;
    console.log(secretKey);
    try {
      const verify = this.jwtService.verify(token, { secret: secretKey });
      return verify;
    } catch (e) {
      switch (e.message) {
        case 'INVALID_TOKEN':
        case 'TOKEN_IS_ARRAY':
        case 'NO_USER':
          throw new HttpException('Invalid Token', 401);
        case 'EXPIRED_TOKEN':
          throw new HttpException('Expired Token', 410);
        default:
          throw new HttpException('Internal Server Error Occured', 500);
      }
    }
  }
}
