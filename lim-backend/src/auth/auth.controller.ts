import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/decorator/user.decorator';
import { AuthService } from './auth.service';
import { FortyTwoAuthGuard } from './guards/ft.guard';
import { JwtAuthGuard } from './jwt.guard';
import { ConfigService } from '@nestjs/config';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth API')
export class AuthController {
  constructor(
    private authService: AuthService,
    private config: ConfigService,
  ) {}

  @ApiOperation({
    summary: 'login entrypoint',
    description: 'redirects user to 42api OAuth',
  })
  @Get('ft_login')
  @UseGuards(FortyTwoAuthGuard)
  // @UseGuards(JwtAuthGuard)
  async ft_login(@Req() req): Promise<void> {
    // console.log(req);
    // console.log("\n");
    // console.log(res);
    // console.log('whwhwhhw?');
  }

  @Get('test')
  async test() {
    return 'shshshs';
  }

  @Get('test-login')
  @UseGuards(FortyTwoAuthGuard)
  async test_login() {}

  @ApiOperation({
    summary: '42 OAuth callback url',
    description: '42 OAuth will be redirected here.',
  })
  @ApiResponse({
    status: 302,
    description:
      'will redirect to front-end page login or tfa with token in uri',
  })
  @Get('ft_callback')
  @UseGuards(FortyTwoAuthGuard)
  // @UseGuards(JwtAuthGuard)
  async ft_callback(@Req() req, @User() user, @Res() res) {
    const data = await this.authService.login(user);
    console.log(data);
    if (data.accessToken === 'sss') {
      res.status(302).redirect('http://localhost:4000');
      return;
    }
    if (!data.accessToken) return;

    const url = new URL(this.config.get<string>('HOSTNAME'));
    url.port = this.config.get<string>('FRONT_PORT');
    url.searchParams.set('token', data.accessToken);
    url.pathname = this.config.get<string>('FRONT_LOGIN_URL');

    if (data.enableTfa) url.pathname = this.config.get<string>('FRONT_TFA_URL');
    // else {
    //   return user;
    // }

    console.log(url.href);

    // res.status(302).redirect(url.href);

    // console.log(user);
    // this.authService.testCreateUser(user);
    // return user;
  }

  @Post('tfa_login')
  tfa_login(
    @Body('token') token: string,
    @Body('code') code: string,
  ): Promise<string | null> {
    return this.authService.login_OTP(token, code);
  }

  @Post('tfa_gen')
  async tfa_generate(@Body('token') token: string): Promise<void> {
    return await this.authService.set_OTP(token);
  }
}
