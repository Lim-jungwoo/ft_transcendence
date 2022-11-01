import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
    constructor(private config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true, // for dev env only
            secretOrKey: config.get<string>("JWT_SECRET"),
            passReqToCallback:  true
        });
    }

  validate(req: Request, payload: any): any {
    const url = req.url;
    console.log(payload);
    if (!payload.tfa_done && !(url === "/auth/tfa_email" ||
                             url === "/auth/tfa_login" ||
                            url === "/auth/tfa_gen" || 
                            url === "/auth/refresh"))
    {
        throw new UnauthorizedException(null, "TFA needed"); // tfa_done === false and not tfa related routes
    }
    return { id: payload.sub };
  }
}
