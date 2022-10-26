import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostService } from './post/post.service';

@Module({
  imports: [
    AuthModule,
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5434,
    //   username: 'postgres',
    //   password: '123',
    //   // entities: [join(__dirname, '/entity/*.entity.ts')],
    //   database: 'nest',
    //   entities: ['dist/entity/*.entity.js'],
    //   // If synchronize is true, sync entity and database
    //   // When synchronize is false, "yarn typeorm schema:sync" can sync entity and database
    //   synchronize: true,
    // }),
    UserModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService, PostService],
})
export class AppModule {}
