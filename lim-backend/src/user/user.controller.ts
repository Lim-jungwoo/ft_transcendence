import { Controller, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

// @UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  public async auth(@Req() req, @Res() res) {
    // const { authorization } = req.headers;
    // this.authSer
  }
}
