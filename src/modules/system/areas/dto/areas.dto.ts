import { OmitType } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AreasEntity } from '../entities/areas.entity';

export class IsAreasExistDto {
  @IsString()
  username: string;
}

export class CreateAreasDto extends OmitType(AreasEntity, ['id'] as const) {
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
