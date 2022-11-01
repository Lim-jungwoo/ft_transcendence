import { Injectable } from "@nestjs/common";
import { History, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class HistoryService {
  constructor(private prisma: PrismaService) {}

  async createHistory(data: Prisma.HistoryCreateInput): Promise<History> {
    return this.prisma.history.create({
      data,
    });
  }
}
