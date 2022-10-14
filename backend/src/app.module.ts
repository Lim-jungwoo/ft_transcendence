import { Module } from '@nestjs/common';
// if @nestjs/config is installed, you can use ConfigModule to refer env file
// env file's environment variable is set up in process.env
import { ConfigModule } from '@nestjs/config';
// if @nestjs/serve-static is installed, you can use ServeStaticModule to provide static content(like Single Page Application)
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { testConfigService } from './test-config.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import testConfig from './test.config';

@Module({
  imports: [
    // ConfigModule's forRoot() method register ConfigService provider
    ConfigModule.forRoot({
      // when isGlobal is true, if root module import this module, other module doesn't need to import this module
      isGlobal: true,

      // envFilePath set up env file path
      // default is root
      // using array to include various path
      // if env files have same variable, first env file's variable is used
      envFilePath: ['.env'],

      // load custom configuration file
      load: [testConfig],
    }),
    PrismaModule,
    UserModule,
    AuthModule,

    // provide static content in frontend
    // ServeStaticModule.forRoot({
    //   rootPath: join('static content'),
    // }),
  ],
  controllers: [AppController, UserController],
  providers: [AppService, testConfigService],
})
export class AppModule {}
