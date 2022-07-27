/*
 * @Author: jack
 * @Date: 2022-07-08 16:54:20
 * @LastEditTime: 2022-07-08 16:54:20
 * @LastEditors: jack
 * @Description: 数据库基类
 * @FilePath: \meimei\src\common\entities\base.entity.ts
 * You can you up，no can no bb！！
 */
import { IsOptional, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  /* 创建时间 */
  @CreateDateColumn({ name: 'create_time', comment: '创建时间' })
  createTime: Date;

  /* 更新时间 */
  @UpdateDateColumn({ name: 'update_time', comment: '更新时间' })
  updateTime: Date;

  /* 删除时间 */
  @DeleteDateColumn({ name: 'delete_time', comment: '删除时间' })
  deleteTime: Date;

  /* 创建人 */
  @Column({ name: 'create_by', comment: '创建人', length: '50', default: '' })
  createBy: string;

  /* 更新人 */
  @Column({ name: 'update_by', comment: '更新人', length: '50', default: '' })
  updateBy: string;

  /* 备注 */
  @Column({ name: 'remark', comment: '备注', default: '' })
  @IsOptional()
  @IsString()
  remark?: string;
}
