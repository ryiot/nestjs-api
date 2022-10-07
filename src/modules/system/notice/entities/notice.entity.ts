import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('notice')
export class NoticeEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'notice_id', comment: '通知ID' })
  noticeId: number;

  @Column('varchar', { name: 'notice_title', comment: '标题', length: 200 })
  noticeTitle: string;

  @Column('varchar', {
    name: 'video',
    default: '',
    comment: '视频',
    length: 200,
  })
  video: string;

  @Column('varchar', {
    name: 'notice_content',
    default: '',
    comment: '内容',
    length: 1000,
  })
  noticeContent: string;

  @Column('varchar', {
    name: 'notice_content2',
    default: '',
    comment: '内容2',
    length: 1000,
  })
  noticeContent2: string;

  @Column('char', {
    name: 'notice_type',
    comment: '类型',
    length: 2,
    default: () => '1',
  })
  noticeType: string;

  @Column('char', {
    name: 'status',
    comment: '状态（0正常 1停用）',
    length: 2,
    default: () => '0',
  })
  status: string;

  @Column('varchar', {
    name: 'create_by',
    comment: '创建者',
    length: 64,
    default: null,
  })
  createBy: string;

  @CreateDateColumn({
    name: 'create_time',
    comment: '创建时间',
  })
  createTime: Date;

  @Column('varchar', {
    name: 'update_by',
    comment: '更新者',
    length: 64,
    default: null,
  })
  updateBy: string;

  @UpdateDateColumn({
    name: 'update_time',
    comment: '更新时间',
  })
  updateTime: Date;

  @Column('varchar', {
    name: 'remark',
    comment: '备注',
    length: 200,
    default: null,
  })
  remark: string;
}
