import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
// PrismaClient has function to connect database
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    // derived class constructor must contain super
    super({
      datasources: {
        db: {
          url: config.get('DB_URL'),
        },
      },
    });
  }
}
