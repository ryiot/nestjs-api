import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './jwt.constants';
import { AccountService } from '../account/account.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly accountService: AccountService,) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // jwtFromRequest: ExtractJwt.fromHeader('token'), //使用ExtractJwt.fromHeader从header获取token
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // JWT验证
  async validate(payload: any) {
    console.log(payload);
    const user = await this.accountService.findById(payload.userId);
    console.log('uer=', user);
    if (user == null) {
      throw new ForbiddenException('账号不存在');
    }
    if (user.status == '1') {
      // return 401;
      // new ExtractJwt(401);
      // throw new UnauthorizedException('您的账号在其他地方登录，请重新登录');
      throw new ForbiddenException('对不起，您的账号已被禁用');
    }
    return {
      userId: payload.userId,
      username: payload.username,
      roles: payload.roles,
      type: payload.type,
    };
  }
}
