import { Body, Controller, Get, Post, HttpCode, Req } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { ReqLoginDto } from './dto/login.dto';
import { SkipJwtAuth } from './jwt.constants';
import { LoginService } from './login.service';
import { DictRouter, unitRouter, Config1Router, swiperRouter, NoticeRouter, userRouter, datarouter } from './routers';

@Controller()
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly accountService: AccountService,
  ) {}

  /* 用户登录 */
  @SkipJwtAuth()
  @HttpCode(200)
  @Post('login')
  async login(@Body() reqLoginDto: ReqLoginDto): Promise<any> {
    console.log(reqLoginDto);
    const { loginMethod } = reqLoginDto;
    if (loginMethod == 'pc') {
      return await this.loginService.PcLogin(reqLoginDto);
    }
    return { code: 403, message: '账号或密码错误！' };
  }

  @SkipJwtAuth()
  @HttpCode(200)
  @Post('logout')
  async logout(): Promise<string> {
    return '';
  }

  /* 获取用户信息 */
  @Get('getInfo')
  async getInfo(@Req() req: any) {
    const { user } = req;
    const { userId } = user;
    console.log('user=', user);
    const userInfo = await this.accountService.findById(userId);

    return {
      code: 200,
      msg: '操作成功',
      permissions: ['*:*:*'],
      roles: ['admin'],
      user: userInfo,
    };
  }

  @Get('getPermCode')
  async getPermCode() {
    // return await this.loginService.getInfo(userId);
    return {
      code: 0,
      result: ['1000', '3000', '5000'],
      message: 'success',
      type: 'success',
    };
  }

  @Get('getRouters')
  async getRouters(@Req() req: any) {
    const { user } = req;
    const { userId, roles } = user;
    // console.log('user=', user);
    const data = [];

    if (roles[0] == 'A') {
      data.push(unitRouter);
      data.push(Config1Router);
      data.push(swiperRouter);
      // data.push(DictRouter);
      // data.push(userRouter);
    }

    return {
      msg: '操作成功',
      code: 200,
      data: data,
    };
  }
}
