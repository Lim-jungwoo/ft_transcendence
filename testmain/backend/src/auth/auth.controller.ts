import {
  Body,
  Controller,
  Get,
  HttpException,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { FortyTwoAuthGuard } from "./guards/ft.guard";
import { JwtAuthGuard } from "./guards/jwt.guard";
import { JwtRefGuard } from "./guards/jwtref.guard";

@Controller("auth")
@ApiTags("Auth API")
@ApiForbiddenResponse({ description: "Unauthorized" })
export class AuthController {
  constructor(
    private authService: AuthService,
    private config: ConfigService
  ) {}

  @ApiOperation({
    summary: "logout",
    description: "this will invalidate refresh token",
  })
  @ApiResponse({
    status: 200,
    description: "Goodbye",
  })
  @ApiBearerAuth("token")
  @Get("logout")
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req): Promise<void> {
    console.log(req.user);
    this.authService.logout(req.user.id);
  }

  @ApiOperation({
    summary: "refresh access token",
    description: "new access token will be issued if refresh token is valid",
  })
  @ApiResponse({
    status: 200,
    description: "new access token issued",
    schema: {
      type: "object",
      properties: {
        accessToken: {
          type: "string",
          description: "the new access token",
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "refresh token compare failed",
  })
  @ApiBearerAuth("rtoken")
  @Get("refresh")
  @UseGuards(JwtRefGuard)
  async refresh(@Req() req): Promise<{ accessToken: string }> {
    return this.authService.refreshAuthToken(
      req.user.id,
      req.user.tfa_done,
      req.user.refreshToken
    );
  }

  @ApiOperation({
    summary: "login entrypoint",
    description: "redirects user to 42api OAuth page",
  })
  @ApiResponse({
    status: 302,
    description: "will always redirect to 42api OAuth page",
  })
  @Get("ft_login")
  @UseGuards(FortyTwoAuthGuard)
  ft_login(@Req() req, @Res() res): void {}

  @ApiOperation({
    summary: "42 OAuth callback url",
    description: "42 OAuth will be redirected here.",
  })
  @ApiResponse({
    status: 302,
    description:
      "will redirect to front-end page login or tfa with token and rtoken in uri",
  })
  @Get("ft_callback")
  @UseGuards(FortyTwoAuthGuard)
  async ft_callback(@Req() req, @Res() res) {
    const data = await this.authService.login(req.user);
    if (!data.accessToken) return;

    // console.log(data.accessToken);

    const url = new URL(this.config.get<string>("HOST_URL"));
    url.port = this.config.get<string>("FRONT_PORT");
    url.searchParams.set("token", data.accessToken);
    url.searchParams.append("rtoken", data.refreshToken);
    url.pathname = this.config.get<string>("FRONT_LOGIN_URL");

    if (data.tfa)
    {
      url.pathname = this.config.get<string>("FRONT_TFA_URL");
      this.authService.setOTP(req.user.id);
    }
    
    res.status(302).redirect(url.href);
  }

  @ApiOperation({
    summary: "OTP email",
    description: "get email where OTP is sent to",
  })
  @ApiResponse({
    status: 200,
    description: "return user's email",
    schema: {
      type: "object",
      properties: {
        email: {
          type: "string",
          description: "the user email",
        },
      },
    },
  })
  @ApiBearerAuth("token")
  @Get("tfa_email")
  @UseGuards(JwtAuthGuard)
  async tfa_email(@Req() req): Promise<{ email: string }> {
    return this.authService.getEmail(req.user.id);
  }

  @ApiOperation({
    summary: "post OTP password for authorization",
    description: "server will compare provided OTP with DB's data",
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        otp: {
          type: "string",
          description: "otp to try",
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: "OTP match, new token generated",
    schema: {
      type: "object",
      properties: {
        accessToken: {
          type: "string",
          description: "the new token",
        },
      },
    },
  })
  @ApiResponse({
      status: 302,
      description: "OTP match, token and rtoken given as query",
  })
  @ApiResponse({
    status: 401,
    description: "OTP mismatch",
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: "failed to retrieve OTP hash from DB",
  })
  @ApiBearerAuth("token")
  @Patch("tfa_login")
  @UseGuards(JwtAuthGuard)
  async tfa_login(@Req() req, @Body("otp") otp: string, @Res() res
    ): Promise<void> {
    const match = await this.authService.loginOTP(req.user.id, otp);
    if (match)
    {
        const aT = await this.authService.genAuthToken(req.user.id, true);
        const rT = await this.authService.genRefreshToken(req.user.id, true);
        const url = new URL(this.config.get<string>("HOST_URL"));
        url.port = this.config.get<string>("FRONT_PORT");
        url.searchParams.set("token", aT);
        url.searchParams.set("rToken", rT);
        url.pathname = "main" // hardcoded main
        res.status(302).redirect(url.href);
        // return {
        //     accessToken: await this.authService.getAuthToken(req.user.id, true),
        //     refreshToken: await this.authService.getRefreshToken(req.user.id, true),
        // };
    }
    else
    {
        throw new HttpException("Unauthorized", 401);
    }
  }

  @ApiOperation({
    summary: "generate OTP password",
    description: "save the generated OTP password into user's DB",
  })
  @ApiCreatedResponse({
    description: "OTP created and saved in DB",
  })
  @ApiBearerAuth("token")
  @Post("tfa_gen")
  @UseGuards(JwtAuthGuard)
  async tfa_generate(@Req() req): Promise<void> {
    return this.authService.setOTP(req.user.id);
  }

  @ApiOperation({
    summary: "get token for testing",
    description: "will create user with id 0 and return it's token",
  })
  @ApiResponse({
    status: 200,
    schema: {
      type: "object",
      description: "the created access token for testing",
      properties: {
        accessToken: {
          type: "string",
          description: "the created access token for testing",
        },
        refreshToken: {
          type: "string",
          description: "the created refresh token for testing",
        },
      },
    },
  })
  @Get("token")
  async token(): Promise<{ accessToken: string; refreshToken: string }> {
    const data = await this.authService.login({
      id: 0,
      username: "test",
      nickname: "testaccount",
      email: "test@example.com",
    });
    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
  }
  @Get("test")
  @UseGuards(JwtAuthGuard)
  async test(@Req() req, @Res() res): Promise<boolean> {
    // const token = {accessToken: "test"};
    // const url = new URL("http://dbuntu.lan");
    // url.port = "3000";
    // url.pathname = "login";
    // url.searchParams.set("token", token.accessToken);

    // res.status(302).redirect(url.href);
    // return token;
    // res.status(200).json(['a','ok']);
    // res.send();
    // res.send({a: "TEST"});
    // console.log(req);
    // console.log("\n");
    // console.log(res);
    // res.status(302).redirect("/");

    return res.send(true);
    // console.log(res.send("test"));
    // return true;
    // return (true);
    // return true;
  }
}
