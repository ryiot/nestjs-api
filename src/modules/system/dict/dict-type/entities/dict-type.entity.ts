import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('dict_type')
export class DictTypeEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'dict_id', comment: '字典ID' })
  dictId: number;

  @Column('varchar', { name: 'dict_name', comment: '字典名称', length: 100 })
  dictName: string;

  @Column('varchar', { name: 'dict_type', comment: '字典类型', length: 100 })
  dictType: string;

  @Column('char', {
    name: 'status',
    comment: '状态（0正常 1停用）',
    length: 1,
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

  @Column('varchar', {
    name: 'remark',
    comment: '备注',
    length: 200,
    default: null,
  })
  remark: string;
}
