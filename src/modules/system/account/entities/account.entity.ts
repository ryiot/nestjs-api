import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('account')
export class AccountEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'id' })
  id: number;

  @Column('varchar', { name: 'username', comment: '用户名', length: 100 })
  username: string;

  @Column('varchar', {
    name: 'password',
    default: '123456',
    comment: '密码',
    length: 100,
  })
  password: string;

  @Column('varchar', {
    name: 'role_name',
    comment: '角色名称',
    length: 2,
    default: 'B',
  })
  roleName: string;

  @Column({ type: 'int', name: 'b_id', default: null, comment: '厂家id' })
  bId: string;

  @Column({ type: 'int', name: 'c_id', default: null, comment: '代理id' })
  cId: string;

  @Column('varchar', {
    name: 't',
    comment: '类别',
    length: 2,
    default: 'B',
  })
  t: string;

  @Column('varchar', {
    name: 'nickname',
    comment: '昵称',
    length: 30,
    default: '新用户',
  })
  nickname: string;

  @Column('varchar', {
    name: 'company_name',
    default: null,
    comment: '公司名称',
    length: 255,
  })
  companyName: string;

  @Column('varchar', {
    name: 'company_profile',
    default: null,
    comment: '公司简介',
    length: 500,
  })
  companyProfile: string;

  @Column('varchar', {
    name: 'name',
    default: null,
    comment: '联系人',
    length: 100,
  })
  contact: string;

  @Column('varchar', {
    name: 'mobile',
    default: null,
    comment: '手机号',
    length: 11,
  })
  mobile: string;

  @Column('varchar', {
    name: 'email',
    default: null,
    comment: '电子邮箱',
    length: 255,
  })
  email: string;

  @Column('char', {
    name: 'sex',
    comment: '用户性别（0男 1女 2未知）',
    length: 1,
    default: '0',
  })
  sex: string;

  @Column('varchar', {
    name: 'avatar',
    default: null,
    comment: '头像路径',
    length: 255,
  })
  avatar: string;

  @Column('varchar', {
    name: 'province_code',
    comment: '省',
    length: 10,
    default: '430000',
  })
  provinceCode: string;

  @Column('char', {
    name: 'status',
    comment: '帐号状态（0正常 1停用）',
    length: 1,
    default: '0',
  })
  status: string;

  @Column('varchar', {
    name: 'login_ip',
    comment: '最后登录IP',
    length: 128,
    default: '0.0.0.0',
  })
  loginIp: string;

  @Column('datetime', {
    name: 'login_at',
    default: null,
    comment: '最后登录时间',
  })
  loginAt: Date;

  @Column('datetime', {
    name: 'pwd_updated_at',
    default: null,
    comment: '密码最后更新时间',
  })
  pwdUpdatedAt: Date;

  @Column('varchar', { name: 'created_by', default: null, comment: '创建者', length: 30 })
  createdBy: string;

  @Column('varchar', { name: 'updated_by', default: null, comment: '更新者', length: 30 })
  updatedBy: string;

  @CreateDateColumn({
    type: 'datetime',
    default: null,
    name: 'created_at',
    comment: '创建时间',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: null,
    name: 'updated_at',
    comment: '更新时间',
  })
  updateAt: Date;

  @Column('varchar', { name: 'remark', default: null, comment: '备注', length: 255 })
  remark: string;
}
