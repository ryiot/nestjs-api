import { type } from 'os';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('unit')
export class UnitEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'id' })
  id: number;

  @Column('varchar', { name: 'name', comment: '名称', length: 100 })
  name: string;

  @Column('varchar', { name: 'index', comment: '索引', length: 100 })
  index: string;

  @Column('varchar', {
    name: 'content',
    comment: '内容',
    length: 500,
    default: null,
  })
  content: string;

  @Column('varchar', {
    name: 'content2',
    comment: '内容2',
    length: 500,
    default: null,
  })
  content2: string;

  @Column('varchar', {
    name: 'video',
    comment: '视频',
    length: 500,
    default: null,
  })
  video: string;

  @CreateDateColumn({
    type: 'datetime',
    default: null,
    name: 'created_at',
    comment: '创建时间',
  })
  createTime: Date;
}
