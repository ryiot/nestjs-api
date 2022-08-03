import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    AccountModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: `${jwtConstants.expiresIn}d` }, // token 过期时效
    }),
  ],
  controllers: [LoginController],
  providers: [
    LoginService,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  exports: [LoginService],
})
export class LoginModule {}
