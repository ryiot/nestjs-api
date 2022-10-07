import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('website_config')
export class WebsiteConfigEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'id' })
  id: number;

  @Column('varchar', {
    name: 'img_url',
    default: null,
    comment: '主图',
    length: 500,
  })
  imgUrl: string;

  @Column('text', { name: 'content', default: null, comment: '内容' })
  content: string;

  @Column({
    type: 'timestamp',
    name: 'start_time',
    default: null,
    comment: '开始时间',
  })
  startTime: Date;

  @Column({
    type: 'timestamp',
    name: 'end_time',
    default: null,
    comment: '结束时间',
  })
  endTime: Date;
}
