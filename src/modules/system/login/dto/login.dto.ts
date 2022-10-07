import {
  IsAlphanumeric,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

// 用户登陆
export class ReqLoginDto {
  // 登陆模式
  @IsNotEmpty({ message: 'loginMethod 不能为空' })
  @IsString({ message: 'loginMethod 必须为字符串' })
  loginMethod: string;

  /* 用户名 */
  @IsNotEmpty({ message: 'username 不能为空' })
  @IsString({ message: 'username 必须为字符串' })
  username: string;

  /* 密码 */
  @IsNotEmpty({ message: 'password 不能为空' })
  @IsString({ message: 'password 必须为字符串' })
  password: string;

  /* uuid码 */
  @IsOptional()
  @IsString({ message: 'uuid 必须为字符串' })
  uuid: string;

  /* 验证码code */
  @IsOptional()
  @IsString({ message: 'code 必须为字符串' })
  code: string;
}
