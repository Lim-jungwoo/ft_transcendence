import { BadRequestException, HttpException, Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { networkInterfaces, userInfo } from "os";
import { FriendRequest } from "src/friendRequest/entities/friendRequest.entity";
import { stat } from "fs";

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async queryUser(UI: Prisma.UserWhereUniqueInput, Q: Prisma.UserSelect) {
    return await this.prisma.user.findUnique({
      where: UI,
      select: Q,
    });
  }

  async getEmail(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<{ email: string } | null> {
    return await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: {
        email: true,
      },
    });
  }

  async createUser(datar: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        id: datar.id,
        email: datar.email,
        username: datar.username,
        nickname: datar.nickname,
        status: "online",
      },
    });
  }

  async addFriend(userid: number, friendid: number) {
    return this.prisma.user.update({
      where: { id: userid },
      data: {
        friends: {
          connect: {
            id: friendid,
          },
        },
      },
    });
  }

  async acceptFriend(userid: number, friendName: string) {
    const user = this.prisma.user.findUnique({
      where: { id: userid },
    });
    const userRequest = (await user.friendsrequests()).find(
      ({ friendname }) => friendname === friendName
    );
    if (!userRequest) {
      return "There is no friend request matching friend name";
    }

    return this.prisma.user.update({
      where: { id: userid },
      data: {
        friends: {
          connect: {
            id: userRequest.friendid,
          },
        },
      },
    });
  }

  async declineFriend(userid: number, friendName: string) {
    const user = this.prisma.user.findUnique({
      where: { id: userid },
    });
    const userRequest = (await user.friendsrequests()).find(
      ({ friendname }) => friendname === friendName
    );
    if (!userRequest) {
      return "There is no friend request matching friend name";
    }

    return this.prisma.friendRequest.delete({
      where: { requestpk: userRequest.requestpk },
    });
  }

  async sendFriendRequest(
    friend: Prisma.UserCreateInput,
    myself: Prisma.UserCreateInput
  ) {
    return this.prisma.user.update({
      where: { id: friend.id },
      data: {
        friendsrequests: {
          create: {
            friendname: myself.nickname,
            friendid: myself.id,
          },
        },
      },
    });
  }

  // async addFriend(datar: string, userid: number) {
  //   return this.prisma.friend.create({
  //     data: {
  //       nickname: datar,
  //       user: {
  //         connect: { id: userid },
  //       },
  //     },
  //   });
  // }

  // user.coinflips.push(true, true, false)

  // const updatedUser = await prisma.user.update({
  //   where: {
  //     email: 'eloise@prisma.io',
  //   },
  //   data: {
  //     coinflips: user.coinflips,
  //   },
  // })

  // async addFriend(data: Prisma.FriendCreateInput): Promise<Friend> {
  //   return this.prisma.friend.create({
  //     data,
  //   });
  // }

  // async findFriend(
  //   friendWhereUniqueInput: Prisma.FriendWhereUniqueInput
  // ): Promise<Friend> {
  //   return this.prisma.friend.findUnique({
  //     where: friendWhereUniqueInput,
  //   });
  // }

  async updateUser(params: {
    // where은 조건문
    // UserWhereUniqueInput은 prisma에서 unique인 value를 확인한다.
    where: Prisma.UserWhereUniqueInput;
    // data에는 새로 업데이트할 column명을 넣는다.
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  async generateOTP(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<string> {
    const crypto = require("crypto");
    const code = crypto.randomBytes(3).toString("hex");
    const hash = await bcrypt.hash(code, 10);
    const time = new Date();

    await this.prisma.user.update({
      where: userWhereUniqueInput,
      data: {
        tfacode: hash,
        tfatime: time,
      },
    });
    return code;
  }

  async checkOTP(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    otp: string
  ): Promise<boolean> {
    const query = await this.prisma.user.findUnique({
        where: userWhereUniqueInput,
        select : {
            tfacode: true,
            tfatime: true,
        }
    });

    if (!query.tfacode || !query.tfatime)
      throw new HttpException("cannot retrieve otp from DB", 500)
      
    const ctime = new Date();
    const vtime = new Date(query.tfatime.getTime() + this.config.get<number>("TFA_VTIME") * 1000);
    if (ctime > vtime)
    return false;
    
    const match = await bcrypt.compare(otp, query.tfacode);
    if (match)
    {
      await this.prisma.user.update({
        where: userWhereUniqueInput,
        data: {
          tfacode: null,
          tfatime: null,
        }
      })
      return true;
    }
    if (userWhereUniqueInput.id === 0 && otp === "000000") // for debugging
      return true;
    return false;
  }

  async checkRefreshToken(uid: number, rtok: string): Promise<Boolean> {
    const query = await this.prisma.user.findUnique({
      where: {
        id: uid,
      },
      select: {
        rtoken: true,
      },
    });
    return await bcrypt.compare(rtok, query.rtoken);
  }

  async saveRefreshToken(uid: number, rtok: string): Promise<void> {
    const hash = await bcrypt.hash(rtok, 10);
    await this.prisma.user.update({
      where: {
        id: uid,
      },
      data: {
        rtoken: hash,
      },
    });
  }

  async delRefreshToken(uid: number): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: uid,
      },
      data: {
        rtoken: null,
      },
    });
  }

  async updateLTT(uid: number): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: uid,
      },
      data: {
        lasttokentime: new Date(),
      }
    })
  }
  
  async updateStatus(uid: number, sstr: string): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: uid,
      },
      data: {
        status: sstr,
      }
    })
  }
}
