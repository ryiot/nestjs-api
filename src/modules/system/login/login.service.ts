import { Injectable } from '@nestjs/common';
import { ReqPcLoginDto } from './dto/req-login.dto';

@Injectable()
export class LoginService {
  async PcLogin(param: ReqPcLoginDto) {
    const { username, password } = param;
    // 查找用户名

    // 签发密码
    const result = {
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
}
