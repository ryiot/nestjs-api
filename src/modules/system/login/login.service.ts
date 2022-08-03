import { Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { ReqPcLoginDto } from './dto/req-login.dto';
import { JwtService } from '@nestjs/jwt';
import * as dayjs from 'dayjs';

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly accountService: AccountService,
  ) {}

  async PcLogin(param: ReqPcLoginDto) {
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
    // 签发密码
    const result = {
      userId: user.id,
      username: user.roleName,
      realName: user.roleName,
      avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
      desc: 'manager',
      token: token.accessToken,
      homePath: '/dashboard/analysis',
      roles: [
        {
          roleName: user.roleName,
          value: user.role,
        },
      ],
    };

    return { code: 0, result, message: '登陆成功' };
  }

  async WxLogin(param: ReqPcLoginDto) {
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
      id: user.id,
      username: user.username,
      roleName: user.roleName,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(payload);
    // accessToken, expires, name
    const expires = dayjs().add(30, 'd');
    return { accessToken: accessToken, name: user.username, expires: expires };
  }
}
