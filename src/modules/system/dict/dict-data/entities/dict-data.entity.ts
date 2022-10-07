import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'dict_data' })
export class DictDataEntity {
  @PrimaryGeneratedColumn({ name: 'dict_code', comment: '字典dict_code' })
  dictCode: number;

  @Column({
    name: 'dict_sort',
    type: 'int',
    default: 0,
    comment: '字典排序',
  })
  dictSort: number;

  @Column({
    name: 'dict_label',
    type: 'varchar',
    length: 100,
    default: '',
    comment: '字典标签',
  })
  dictLabel: string;

  @Column({
    name: 'dict_value',
    type: 'varchar',
    length: 100,
    default: '',
    comment: '字典键值',
  })
  dictValue: string;

  @Column({
    name: 'dict_type',
    type: 'varchar',
    length: 100,
    default: '',
    comment: '字典类型',
  })
  dictType: string;

  @Column({
    name: 'css_class',
    type: 'varchar',
    length: 100,
    default: null,
    comment: '样式属性（其他样式扩展）',
  })
  cssClass: string;

  @Column({
    name: 'list_class',
    type: 'varchar',
    length: 100,
    default: null,
    comment: '表格回显样式',
  })
  listClass: string;

  @Column({
    name: 'is_default',
    type: 'char',
    length: 1,
    default: 'N',
    comment: '是否默认（Y是 N否）',
  })
  isDefault: string;

  @Column({
    name: 'status',
    type: 'char',
    length: 1,
    default: '0',
    comment: '状态（0正常 1停用）',
  })
  status: string;

  @Column({
    name: 'create_by',
    type: 'varchar',
    length: 64,
    default: '',
    comment: '创建者',
  })
  createBy: string;

  @CreateDateColumn({
    name: 'create_time',
    comment: '创建时间',
  })
  createTime: Date;

  @Column({
    name: 'update_by',
    type: 'varchar',
    length: 64,
    default: '',
    comment: '更新者',
  })
  updateBy: string;

  // @ApiProperty({ description: '创建时间' })
  // @UpdateDateColumn({
  //   name: 'update_time',
  //   type: 'datetime',
  //   default: '',
  //   comment: '更新时间',
  // })
  // updateTime: Date;

  @Column({
    name: 'remark',
    type: 'varchar',
    length: 200,
    default: '',
    comment: '备注',
  })
  remark: string;
}
