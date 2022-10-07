import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsiteConfigController } from './websiteConfig.controller';
import { WebsiteConfigService } from './websiteConfig.service';
import { WebsiteConfigEntity } from './entities/websiteConfig.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WebsiteConfigEntity])],
  controllers: [WebsiteConfigController],
  providers: [WebsiteConfigService],
  exports: [WebsiteConfigService],
})
export class WebsiteConfigModule {}
