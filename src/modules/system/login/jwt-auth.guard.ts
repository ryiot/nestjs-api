import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './jwt.constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 自定义用户身份验证逻辑
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // console.log('isPublic=', isPublic);
    // console.log('context=', context);
    // return false;
    // skip
    if (isPublic) return true;

    return super.canActivate(context);
  }

  handleRequest(err, user) {
    // console.log('err=', err);
    // console.log('user=', user);
    // 处理 info
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
