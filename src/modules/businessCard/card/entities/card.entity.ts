import { type } from 'os';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('card')
export class CardEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'id' })
  id: number;

  @Column('varchar', { name: 'username', comment: '用户名', length: 100 })
  username: string;

  @Column('varchar', { name: 'name', comment: '姓名', length: 100 })
  name: string;

  @Column('varchar', { name: 'phone', comment: '电话', length: 100 })
  phone: string;

  @Column('varchar', { name: 'wx', comment: '微信', length: 100 })
  wx: string;

  @Column('varchar', {
    name: 'type',
    comment: '分类',
    length: 30,
    default: null,
  })
  type: string;

  @Column('varchar', {
    name: 'company_name',
    comment: '公司名称',
    length: 200,
    default: null,
  })
  companyName: string;

  @Column('varchar', {
    name: 'img_url0',
    comment: '分享图',
    length: 200,
    default: null,
  })
  imgUrl0: string;

  @Column('varchar', {
    name: 'img_url1',
    comment: '主图',
    length: 200,
    default: null,
  })
  imgUrl1: string;

  @Column('varchar', {
    name: 'img_url2',
    comment: '图标1',
    length: 200,
    default: null,
  })
  imgUrl2: string;

  @Column('varchar', {
    name: 'img_url3',
    comment: '图标2',
    length: 200,
    default: null,
  })
  imgUrl3: string;

  @Column('varchar', {
    name: 'img_url4',
    comment: '图标3',
    length: 200,
    default: null,
  })
  imgUrl4: string;

  @Column('varchar', {
    name: 'img_url5',
    comment: '图标4',
    length: 200,
    default: null,
  })
  imgUrl5: string;

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

  @Column('varchar', {
    name: 'site',
    comment: '地点',
    length: 500,
    default: null,
  })
  site: string;

  @Column('varchar', {
    name: 'address',
    comment: '地址',
    length: 500,
    default: null,
  })
  address: string;

  @Column({
    type: 'double',
    name: 'lng',
    comment: '经度',
    default: null,
  })
  lng: number;

  @Column({
    type: 'double',
    name: 'lat',
    comment: '维度',
    default: null,
  })
  lat: number;

  @CreateDateColumn({
    type: 'datetime',
    default: null,
    name: 'created_at',
    comment: '创建时间',
  })
  createTime: Date;
}
