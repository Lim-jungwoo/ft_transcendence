import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  Headers,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiQuery,
} from "@nestjs/swagger";
import { User as UserModel } from "@prisma/client";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";
import { HistoryService } from "src/history/history.service";
import { isNativeError } from "util/types";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserProfile } from "./user.interface";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(
    private userService: UserService,
    private historyService: HistoryService
  ) {}

  @ApiOperation({
    summary: "using userid to update nickname, avatar, tfa by test",
  })
  @ApiBody({
    description:
      'Body example => { "userId": 444, "nickname": "changename", "avatar": "picturefile", "tfa": false }',
  })
  @Patch("update_user_by_id")
  async updateUserById(
    // @Param("userid") userId: number,
    @Body()
    userData: {
      userId: number;
      nickname?: string;
      avatar?: string;
      tfa?: boolean;
    }
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: userData.userId },
      data: {
        nickname: userData.nickname,
        avatar: userData.avatar,
        tfa: userData.tfa,
      },
    });
  }

  @ApiOperation({
    summary: "using token to update nickname, avatar, tfa",
  })
  @ApiBody({
    description:
      'Body example => { "nickname": "changename", "avatar": "picturefile", "tfa": false }',
  })
  @ApiBearerAuth("token")
  @UseGuards(JwtAuthGuard)
  @Post("update_user")
  async updateUser(
    @Body()
    userData: {
      nickname?: string;
      avatar?: string;
      tfa?: boolean;
    },
    @Req() req
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: req.user.id },
      data: {
        nickname: userData.nickname,
        avatar: userData.avatar,
        tfa: userData.tfa,
      },
    });
  }

  @ApiOperation({
    summary: "get user profile",
    description: "get user profile by user's nickname",
  })
  @ApiBody({
    description: 'input user\'s nickname ex) { "nickname": "jlim" }',
  })
  @ApiBearerAuth("token")
  @UseGuards(JwtAuthGuard)
  @Post("get_user")
  async getUser(@Body("nickname") name: string): Promise<UserModel> {
    // async getUser(): Promise<UserModel> {
    const user = this.userService.getUser({
      nickname: name,
    });
    // const user = this.userService.getUser({
    //   id:
    // })
    // if (!user) return "sss";
    return user;
    //return;
  }

  @ApiOperation({
    summary: "test create user",
    description:
      'create custom user(not 42user) for test\n\
    =======body example======\n\
    {\
      "id": 4444,\
      "email": "jlim@student.42.kr",\
      "nickname": "jlim",\
      "username": "jlim"\
    }',
  })
  @ApiBody({
    description: "Body must includes user profile",
    type: CreateUserDto,
  })
  @Post("create_user")
  async createUser(
    @Body()
    user: UserModel
  ) {
    if (!user) {
      return "Body has invalid value in User";
    }
    return this.userService.createUser(user);
  }

  @ApiOperation({
    summary: "test accpet token",
  })
  @ApiBearerAuth("token")
  @UseGuards(JwtAuthGuard)
  @Get("testToken")
  async testToken() {
    console.log("authorization complete");
  }

  @ApiOperation({
    summary: "test friend request accept",
  })
  @ApiBody({
    description: 'ex => { "username": "request\'s friend name" }',
  })
  @ApiBearerAuth("token")
  @UseGuards(JwtAuthGuard)
  @Post("acceptFriend")
  async acceptFriend(@Body("username") userName, @Req() req) {
    const friend = this.userService.getUser({ username: userName });
    if (!friend) {
      // throw new BadRequestException("there is no user matching username");
      return "There is no user matching friend request username";
    }
    this.userService.acceptFriend(req.user.id, (await friend).username);
    return this.userService.declineFriend(req.user.id, (await friend).username);
  }

  @ApiOperation({
    summary: "test friend request decline",
  })
  @ApiBody({
    description: 'ex => { "username": "request\'s friend name" }',
  })
  @ApiBearerAuth("token")
  @UseGuards(JwtAuthGuard)
  @Post("declineFriend")
  async declineFriend(@Body("username") userName, @Req() req) {
    const friend = this.userService.getUser({ username: userName });
    console.log("friend name: ", (await friend).username);
    if (!friend) {
      // throw new BadRequestException("there is no user matching username");
      return "There is no user matching friend request username";
    }
    return this.userService.declineFriend(req.user.id, (await friend).username);
  }

  @ApiOperation({
    summary: "test send friend request",
  })
  @ApiBearerAuth("token")
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    description: 'ex => { "username": "find friend name" }',
  })
  @Post("send_friend_request")
  async sendFriendRequest(@Body("username") userName, @Req() req) {
    const friend = this.userService.getUser({ username: userName });
    if (!friend) {
      // throw new BadRequestException("there is no user matching username");
      console.log("There is no user matching friend name");
      return;
    }
    const myself = this.userService.getUser({ id: req.user.id });
    if ((await friend).username === (await myself).username) {
      console.log("User cannot add yourself as friend");
      return;
    }

    return this.userService.sendFriendRequest(await friend, await myself);
  }

  // @ApiOperation({
  //   summary: "test add history",
  // })
  // @ApiBearerAuth("token")
  // @UseGuards(JwtAuthGuard)
  // @ApiBody({
  //   description:
  //     'ex => { "nickname": "input counterpart nickname", "result": "input {"win" or "lose"}", "myscore": "input myself score number", "yourscore": "input counterpart score number", "type": "input string" }',
  // })
  // @Post("add_history")
  // async addHistory(
  //   @Body()
  //   historyInfo: {
  //     nickname: string;
  //     result: string;
  //     myscore: number;
  //     yourscore: number;
  //     type: string;
  //   },
  //   @Req() req
  // ) {
  //   const counterpart = this.userService.getUser({
  //     nickname: historyInfo.nickname,
  //   });
  //   if (!counterpart) throw new BadRequestException("there is no user");

  //   const myself = this.userService.getUser({ id: req.user.id });

  //   const myscoreresult = +historyInfo.myscore + " VS " + historyInfo.yourscore;
  //   const yourscoreresult =
  //     +historyInfo.yourscore + " VS " + historyInfo.myscore;
  //   const myresult = historyInfo.result;
  //   let yourresult = "win";
  //   if (myresult === "win") yourresult = "lose";

  //   this.historyService.createHistory({
  //     yourid: (await counterpart).id,
  //     result: myresult,
  //     myscore: historyInfo.myscore,
  //     yourscore: historyInfo.yourscore,
  //     scoreresult: myscoreresult,
  //     type: historyInfo.type,
  //     user: {
  //       connect: { id: (await myself).id },
  //     },
  //   });
  //   this.historyService.createHistory({
  //     yourid: (await myself).id,
  //     result: yourresult,
  //     myscore: historyInfo.myscore,
  //     yourscore: historyInfo.yourscore,
  //     scoreresult: yourscoreresult,
  //     type: historyInfo.type,
  //     user: {
  //       connect: { id: (await counterpart).id },
  //     },
  //   });
  // }
}
// async createDraft(
//   @Body() postData: { title: string; content?: string; authorEmail: string },
// ): Promise<PostModel> {
//   const { title, content, authorEmail } = postData;
//   return this.postService.createPost({
//     title,
//     content,
//     author: {
//       connect: { email: authorEmail },
//     },
//   });
// }
