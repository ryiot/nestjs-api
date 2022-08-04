import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentRecordController } from './appointmentRecord.controller';
import { AppointmentRecordService } from './appointmentRecord.service';
import { AppointmentRecordEntity } from './entities/appointmentRecord.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentRecordEntity])],
  controllers: [AppointmentRecordController],
  providers: [AppointmentRecordService],
  exports: [AppointmentRecordService],
})
export class AppointmentRecordModule {}
