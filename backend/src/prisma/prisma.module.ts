import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// if you use Global decorator(when root module imports this module)
// you can use this module in other moduls
@Global()
@Module({
  providers: [PrismaService],
  // If you want to use PrismaService, don't for get to export PrismaService
  exports: [PrismaService],
})
export class PrismaModule {}
