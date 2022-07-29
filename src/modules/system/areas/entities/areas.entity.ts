import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('areas')
export class AreasEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'id' })
  id: number;

  @Column('varchar', { name: 'code', comment: 'code', length: 10 })
  value: string;

  @Column('varchar', {
    name: 'name',
    default: null,
    comment: '',
    length: 100,
  })
  label: string;

  @Column('varchar', {
    name: 'city_code',
    default: null,
    comment: '市',
    length: 10,
  })
  cityCode: string;

  @Column('varchar', {
    name: 'province_code',
    default: null,
    comment: '省',
    length: 10,
  })
  provinceCode: string;
}
