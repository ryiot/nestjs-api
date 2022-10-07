import { Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { JwtService } from '@nestjs/jwt';
import * as dayjs from 'dayjs';
import { ReqLoginDto } from './dto/login.dto';

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly accountService: AccountService,
  ) {}

  async PcLogin(param: ReqLoginDto) {
    const { username, password } = param;
    // 查找用户名
    const user = await this.accountService.findByUsername(username);
    if (!user) {
      return { code: -1, message: '用户名或密码错误' };
    }

    // 明文密码
    if (!(password === user.password)) {
      return { code: -1, message: '用户名或密码错误' };
    }

    // 签发 token
    const token = await this.createToken(user);

    return { code: 200, token: token, msg: '操作成功' };
  }

  async WxLogin(param: ReqLoginDto) {
    const { username, password } = param;
    // 查找用户名

    // 签发密码
    const data = {
      userId: '1',
      username: 'admin',
      realName: 'Admin',
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
      desc: 'manager',
      password: '123456',
      token: 'fakeToken1',
      homePath: '/dashboard/analysis',
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super',
        },
      ],
    };
    return { code: 0, result: '', message: 'msg' };
  }

  async createToken(user: any) {
    const payload = {
      userId: user.id,
      username: user.username,
      roles: [user.role],
      type: 'pc',
    };
    const token = this.jwtService.sign(payload);
    return token;
    // accessToken, expires, name
    // const expires = dayjs().add(30, 'd');
    // return { accessToken: accessToken, name: user.username, expires: expires };
  }
}
