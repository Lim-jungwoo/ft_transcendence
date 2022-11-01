import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { HistoryService } from "src/history/history.service";

@Module({
  providers: [UserService, HistoryService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
