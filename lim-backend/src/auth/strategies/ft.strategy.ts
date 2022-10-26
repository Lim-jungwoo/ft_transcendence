import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-42';
import { config } from 'process';
import { AuthService } from 'src/auth/auth.service';
import { UserProfile } from 'src/user/user.interface';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor(
    private readonly authService: AuthService,
    private config: ConfigService,
  ) {
    super({
      clientID: config.get<string>('FT_API_CID'),
      clientSecret: config.get<string>('FT_API_SEC'),
      callbackURL: config.get<string>('FT_API_CALLBACK'),
      // scope: 'public',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    // console.log(accessToken);
    // console.log(refreshToken);
    /* profile information
      id: '80381',
      username: 'jlim',
      displayName: 'Jungwoo Lim',
      name: { familyName: 'Lim', givenName: 'Jungwoo' },
      profileUrl: 'https://api.intra.42.fr/v2/users/jlim',
      emails: [ { value: 'jlim@student.42seoul.kr' } ],
      phoneNumbers: [ { value: 'hidden' } ],
      photos: [ { value: 'https://cdn.intra.42.fr/users/jlim.jpg' } ],
      provider: '42',
    */
    const { id, username, emails } = profile;
    const valueemail = Object.values(emails)[0];
    const email = String(valueemail['value']);
    const idNumber = +id;
    let userProfile: UserProfile = { id: idNumber, username, email };
    if (!userProfile)
      throw new HttpException('Invalid 42api Token', HttpStatus.UNAUTHORIZED);

    // const user = await this.authService.testRedirect(username, photos);
    return userProfile;
  }
}
