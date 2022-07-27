import { IsOptional, IsString } from 'class-validator';

export class ReqLoginDto {
  @IsString()
  loginMethod: string;
  /* uuid码 */
  @IsOptional()
  @IsString()
  uuid: string;

  /* 验证码code */
  @IsOptional()
  @IsString()
  code: string;

  /* 用户名 */
  @IsString()
  username: string;

  /* 密码 */
  @IsString()
  password: string;
}

export class ReqPcLoginDto {
  @IsString()
  loginMethod: string;
  /* uuid码 */
  @IsOptional()
  @IsString()
  uuid: string;

  /* 验证码code */
  @IsOptional()
  @IsString()
  code: string;

  /* 用户名 */
  @IsString()
  username: string;

  /* 密码 */
  @IsString()
  password: string;
}
