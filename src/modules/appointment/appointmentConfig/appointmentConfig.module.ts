import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentConfigController } from './appointmentConfig.controller';
import { AppointmentConfigService } from './appointmentConfig.service';
import { AppointmentConfigEntity } from './entities/appointmentConfig.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentConfigEntity])],
  controllers: [AppointmentConfigController],
  providers: [AppointmentConfigService],
  exports: [AppointmentConfigService],
})
export class AppointmentConfigModule {}
