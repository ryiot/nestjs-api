import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SwiperEntity } from './entities/swiper.entity';
import { SwiperController } from './swiper.controller';
import { SwiperService } from './swiper.service';

@Module({
  imports: [TypeOrmModule.forFeature([SwiperEntity])],
  controllers: [SwiperController],
  providers: [SwiperService],
})
export class SwiperModule {}
