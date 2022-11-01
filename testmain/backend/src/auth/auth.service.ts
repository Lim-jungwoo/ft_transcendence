import { MailerService } from "@nestjs-modules/mailer";
import { ForbiddenException, HttpException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { UserProfile } from "src/user/user.interface";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private config: ConfigService,
    private mailerService: MailerService,
  ) {}

  async logout(uid: number): Promise<void> {
    this.userService.delRefreshToken(uid);
    this.userService.updateStatus(uid, "offline");
  }

  async genAuthToken(uid:number, tfa:boolean): Promise<string> {
    this.userService.updateLTT(uid);
    return this.jwtService.signAsync({
      sub: uid,
      tfa_done: tfa
    },{
      secret: this.config.get<string>("JWT_SECRET"),
      expiresIn: this.config.get<string>("JWT_VTIME"),
    })
  }

  async genRefreshToken(uid:number, tfa:boolean): Promise<string> {
    const token = this.jwtService.sign({
      sub: uid,
      tfa_done: tfa,
    },{
      secret: this.config.get<string>("JWTREF_SECRET"),
      expiresIn: this.config.get<string>("JWTREF_VTIME"),
    });

    await this.userService.saveRefreshToken(uid, token);
    return token;
  }

  async refreshAuthToken(uid:number, tfa_done: boolean, rtok:string): Promise<{accessToken:string}> {
    // const token = this.jwtService.sign({ sub: uid.toString(), tfa_done:true})
    const token = await this.genAuthToken(uid, tfa_done);
    return {
      accessToken: token
    };
  }

  async login(
    user: UserProfile
  ): Promise<{ accessToken: string, refreshToken: string, tfa: boolean}> {
    const iid = +user.id;

    let udb: User = await this.userService.getUser({ id: iid });

    if (!udb)
      udb = await this.userService.createUser(user);
    else
      this.userService.updateStatus(iid, "online");

    // const token = this.jwtService.sign({ sub: user.id, tfa_done: false });
    const token = await this.genAuthToken(user.id, !udb.tfa);
    const rtoken = await this.genRefreshToken(user.id, !udb.tfa);

    return {
      accessToken: token,
      refreshToken: rtoken,
      tfa: udb.tfa,
    }
  }

  signTFA(uid: number): string {
    return this.jwtService.sign({ sub: uid, tfa_done: true });
  }

  async loginOTP(uid: number, otp: string): Promise<boolean> {
    return this.userService.checkOTP({ id: uid }, otp);
  }

  async setOTP(uid: number): Promise<void> {
    const code = await this.userService.generateOTP({ id: uid });
    const mail = await this.getEmail(uid);
    this.sendMail(mail.email, code);
  }

  async getEmail(ids: number): Promise<{email: string}> {
    return this.userService.getEmail({id: ids});
    // return query.email;
  }

  async sendMail(email: string, code: string) {
    // console.log(email, code);
    try {
      this.mailerService.sendMail({
        to: email,
        from: "ts_42@naver.com", // hardcoded, can't modify anyway
        subject: "TS 이메일 인증 코드",
        html: "code: [" + code + "]\n",
      });
    }
    catch(err) {
      console.log(err);
    }
  }
}
