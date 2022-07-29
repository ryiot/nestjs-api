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
    length: 20,
    default: '厂家',
  })
  roleName: string;

  @Column('varchar', {
    name: 'role',
    comment: '角色名称',
    length: 2,
    default: 'B',
  })
  role: string;

  @Column({ type: 'int', name: 'b_id', default: null, comment: '厂家id' })
  bId: string;

  @Column({ type: 'int', name: 'c_id', default: null, comment: '代理id' })
  cId: string;

  @Column('varchar', {
    name: 'trademark',
    comment: '品牌',
    length: 200,
    default: null,
  })
  trademark: string;

  @Column('varchar', {
    name: 'company_name',
    comment: '公司名称',
    length: 200,
    default: null,
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
    name: 'province_code',
    default: null,
    comment: '省code',
    length: 20,
  })
  provinceCode: string;

  @Column('varchar', {
    name: 'province',
    default: null,
    comment: '省',
    length: 50,
  })
  province: string;

  @Column('varchar', {
    name: 'city_code',
    default: null,
    comment: '市code',
    length: 20,
  })
  cityCode: string;

  @Column('varchar', {
    name: 'city',
    default: null,
    comment: '市',
    length: 50,
  })
  city: string;

  @Column('varchar', {
    name: 'area_code',
    default: null,
    comment: '区code',
    length: 20,
  })
  areaCode: string;

  @Column('varchar', {
    name: 'area',
    default: null,
    comment: '区',
    length: 50,
  })
  area: string;

  @Column('varchar', {
    name: 'address',
    default: null,
    comment: '地址',
    length: 500,
  })
  address: string;

  @Column('varchar', {
    name: 'contact',
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

  @Column('varchar', {
    name: 'avatar',
    default: null,
    comment: '头像路径',
    length: 255,
  })
  avatar: string;

  @Column('char', {
    name: 'status',
    comment: '帐号状态（0正常 1停用）',
    length: 1,
    default: '0',
  })
  status: string;

  @CreateDateColumn({
    type: 'datetime',
    default: null,
    name: 'created_at',
    comment: '创建时间',
  })
  createTime: Date;

  @UpdateDateColumn({
    type: 'datetime',
    default: null,
    name: 'updated_at',
    comment: '更新时间',
  })
  updateTime: Date;

  @Column('varchar', {
    name: 'remark',
    default: null,
    comment: '备注',
    length: 255,
  })
  remark: string;
}
