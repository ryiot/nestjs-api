import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config1Entity } from './entities/config1.entity';
import { Config1Controller } from './config1.controller';
import { Config1Service } from './config1.service';

@Module({
  imports: [TypeOrmModule.forFeature([Config1Entity])],
  controllers: [Config1Controller],
  providers: [Config1Service],
})
export class Config1Module {}
