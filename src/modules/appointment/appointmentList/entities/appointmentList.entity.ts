import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('list')
export class AppointmentListEntity {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'id' })
  id: number;

  @Column('varchar', {
    name: 'name',
    default: null,
    comment: '姓名',
    length: 100,
  })
  name: string;
}
