import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsEmail,
  IsPhoneNumber,
  Allow,
} from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  /* 用户Id */
  @PrimaryGeneratedColumn({
    name: 'user_id',
    comment: '用户ID',
  })
  @Type()
  @IsNumber()
  userId: number;

  /* 用户账号 */
  @Column({
    name: 'username',
    comment: '用户账号',
    length: 30,
  })
  @IsString()
  username: string;

  @Column({
    name: 'password',
    comment: '用户账号密码',
    length: 30,
  })
  @IsString()
  password: string;

  /* 用户昵称 */

  //   @ApiHideProperty()
  //   @ManyToOne(() => Dept, (dept) => dept.users)
  //   dept: Dept;

  //   @ApiHideProperty()
  //   @ManyToMany(() => Post, (post) => post.users)
  //   @JoinTable()
  //   posts: Post[];

  //   @ApiHideProperty()
  //   @ManyToMany(() => Role, (role) => role.users)
  //   @JoinTable()
  //   roles: Role[];
}
