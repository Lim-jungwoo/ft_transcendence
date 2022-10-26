import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { UserProfile } from 'src/user/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(
    user: UserProfile,
  ): Promise<{ accessToken: string; enableTfa: boolean }> {
    const iid = +user.id;

    let usr: User = await this.userService.getUser({ id: iid });
    if (usr)
      return {
        accessToken: 'sss',
        enableTfa: false,
      };

    if (!usr) {
      // console.log('user ???');
      usr = await this.userService.createUser(user);
    }

    const token = this.jwtService.sign({ sub: user.id, otp: false });
    return {
      accessToken: token,
      enableTfa: usr.enableTfa,
    };
  }

  login_OTP(token: string, code: string) {
    return null;
  }

  async set_OTP(token: string) {
    this.userService.generateOTP({ id: 80402 });
  }

  // async set_OTP(token: string, user: UserProfile) {
  //   const userId = user.id;
  //   this.userService.generateOTP({ id: userId });
  // }

  async testCreateUser(user: UserProfile) {
    this.userService.createUser(user);
  }

  // async validateAccount(payload: J)

  // async validateAccessToken(accessToken: string, id: number) {
  //   const user = await this.userService.getUserById(id);
  // }
}
