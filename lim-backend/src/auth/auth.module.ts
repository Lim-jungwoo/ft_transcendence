import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { FortyTwoStrategy } from './strategies/ft.strategy';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({
      secret: 'tmpsecret',
      signOptions: { expiresIn: '7d' },
    }),
    PassportModule,
    UserModule,
    ConfigModule,
  ],
  providers: [AuthService, FortyTwoStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
