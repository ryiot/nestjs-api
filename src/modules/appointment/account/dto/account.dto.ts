import { OmitType } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AccountEntity } from '../entities/account.entity';

export class IsAccountExistDto {
  @IsString()
  username: string;
}

export class CreateAccountDto extends OmitType(AccountEntity, ['id'] as const) {
  @IsString()
  @Matches(/^[a-z0-9A-Z@.\u4E00-\u9FA5]+$/)
  @MinLength(6)
  @MaxLength(60)
  username: string;

  @IsString()
  @Matches(/^[a-z0-9A-Z@.]+$/)
  @MinLength(6)
  @MaxLength(60)
  password: string;

  @IsString()
  @IsOptional()
  roleName: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsString()
  @IsOptional()
  bId: string;

  @IsString()
  @IsOptional()
  cId: string;

  @IsString()
  @IsOptional()
  trademark: string;

  @IsString()
  @IsOptional()
  companyName: string;

  @IsString()
  @IsOptional()
  companyProfile: string;

  @IsArray()
  @IsOptional()
  areas: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  contact: string;

  @IsString()
  @IsOptional()
  mobile: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  remark: string;
}

export class UpdateAccountDto extends OmitType(AccountEntity, ['id'] as const) {
  @IsNumber()
  id: number;

  @IsString()
  @Matches(/^[a-z0-9A-Z@.\u4E00-\u9FA5]+$/)
  @MinLength(6)
  @MaxLength(60)
  username: string;

  @IsString()
  @IsOptional()
  roleName: string;

  @IsString()
  @IsOptional()
  role: string;

  @IsString()
  @IsOptional()
  bId: string;

  @IsString()
  @IsOptional()
  cId: string;

  @IsString()
  trademark: string;

  @IsString()
  companyName: string;

  @IsString()
  companyProfile: string;

  @IsArray()
  @IsOptional()
  areas: string;

  @IsString()
  address: string;

  @IsString()
  contact: string;

  @IsString()
  mobile: string;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  remark: string;
}
