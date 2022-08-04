import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('appointment_record')
export class AppointmentRecordEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'id' })
  id: number;
  // @PrimaryGeneratedColumn({
  //   type: 'varchar',
  //   name: 'id',
  //   comment: 'id',
  // })
  // id: string;

  @Column('varchar', {
    name: 'name',
    default: null,
    comment: '姓名',
    length: 100,
  })
  name: string;

  @Column('varchar', {
    name: 'sex',
    default: null,
    comment: '性别',
    length: 100,
  })
  sex: string;

  @Column('varchar', {
    name: 'age',
    default: null,
    comment: '年龄',
    length: 100,
  })
  age: string;

  @Column('varchar', {
    name: 'phone',
    default: null,
    comment: '联系电话',
    length: 100,
  })
  phone: string;

  @Column('varchar', {
    name: 'union',
    default: null,
    comment: '工会',
    length: 100,
  })
  union: string;

  @Column('varchar', {
    name: 'IDcard',
    default: null,
    comment: '身份证号',
    length: 100,
  })
  IDcard: string;

  @Column('varchar', {
    name: 'img_url1',
    default: null,
    comment: '劳模证书1',
    length: 500,
  })
  imgUrl1: string;

  @Column('varchar', {
    name: 'img_url2',
    default: null,
    comment: '劳模证书2',
    length: 500,
  })
  imgUrl2: string;

  @Column({
    type: 'timestamp',
    name: 'start_time',
    default: null,
    comment: '预约时间',
  })
  startTime: string;

  @Column({
    type: 'timestamp',
    name: 'end_time',
    default: null,
    comment: '签到时间',
  })
  endTime: string;
}
