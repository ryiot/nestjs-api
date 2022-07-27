import { ApiHideProperty, OmitType, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  isEmpty,
  IsIn,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { ParamsDto } from 'src/common/dto/params.dto';
import { UserEntity } from '../entities/user.entity';

export class ReqCreateUserDto extends OmitType(UserEntity, [
  'userId',
] as const) {
  @ApiProperty({
    description: '登录账号',
  })
  @IsString()
  @Matches(/^[a-z0-9A-Z@.\u4E00-\u9FA5]+$/)
  @MinLength(6)
  @MaxLength(30)
  username: string;

  @ApiProperty({
    description: '登录账号密码',
  })
  @IsString()
  @Matches(/^[a-z0-9A-Z@.]+$/)
  @MinLength(6)
  @MaxLength(30)
  password: string;
}

export class ReqDelUserDto {
  @IsArray()
  userIdArr: string[];
}

/* 分页查询用户 */
export class ReqUserListDto {
  @IsOptional()
  @IsString()
  userName?: string;

  @IsOptional()
  @IsString()
  phonenumber?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @Type()
  @IsNumber()
  deptId?: number;

  @IsOptional()
  @IsObject()
  params: ParamsDto;
}

/* 新增用户 */
export class ReqAddUserDto extends OmitType(UserEntity, ['userId'] as const) {
  /* 用户名 */
  @IsString()
  userName: string;

  /* 部门Id */
  @IsOptional()
  @Type()
  @IsNumber()
  deptId?: number;

  /* 岗位id数组 */
  @IsArray()
  postIds: number[];

  /* 角色Id数组 */
  @IsArray()
  roleIds: number[];
}

/* 更改密码 */
export class ReqResetPwdDto {
  /* 用户ID */
  @IsNumber()
  userId: number;

  /* 新密码 */
  @IsString()
  password: string;
}

/* 给用户分配角色 */
export class ReqUpdateAuthRoleDto {
  /* 用户id */
  @Type()
  @IsNumber()
  userId: number;

  /* 角色Id数组 */
  @IsString()
  roleIds: string;
}

/* 更改用户状态 */
export class ReqChangeStatusDto {
  /* 用户id */
  @Type()
  @IsNumber()
  userId: number;

  /* 状态 */
  @Type()
  @IsString()
  status: string;
}

/* 更改自己的用户信息 */
export class ReqUpdataSelfDto {
  /* 昵称 */
  @IsString()
  nickName?: string;

  /* 手机号码 */
  @IsString()
  phonenumber?: string;

  /* 邮箱 */
  @IsString()
  email?: string;

  /* 用户性别（0男 1女 2未知） */
  @IsOptional()
  @IsString()
  sex?: string;

  @ApiHideProperty()
  avatar: string;
}

/* 更改自己的用户信息 */
export class ReqUpdateSelfPwd {
  /* 旧密码 */
  @IsString()
  oldPassword: string;

  /* 旧密码 */
  @IsString()
  newPassword: string;
}
