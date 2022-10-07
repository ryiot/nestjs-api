import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentListController } from './appointmentList.controller';
import { AppointmentListService } from './appointmentList.service';
import { AppointmentListEntity } from './entities/appointmentList.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentListEntity])],
  controllers: [AppointmentListController],
  providers: [AppointmentListService],
  exports: [AppointmentListService],
})
export class AppointmentListModule {}
