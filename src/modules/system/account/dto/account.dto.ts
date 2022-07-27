import { OmitType } from '@nestjs/swagger';
import {
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
  @MaxLength(30)
  username: string;

  @IsString()
  @Matches(/^[a-z0-9A-Z@.]+$/)
  @MinLength(6)
  @MaxLength(30)
  password: string;
}
