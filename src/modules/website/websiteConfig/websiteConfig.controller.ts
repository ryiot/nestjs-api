import { SkipJwtAuth } from '@/modules/system/login/jwt.constants';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { WebsiteConfigService } from './websiteConfig.service';

@Controller('website/config')
export class WebsiteConfigController {
  constructor(
    private readonly websiteConfigService: WebsiteConfigService,
  ) {}

  @SkipJwtAuth()
  @HttpCode(200)
  @Post('add')
  async create(@Body() dto: any): Promise<any> {
    const createInfo = await this.websiteConfigService.create(dto);
    if (createInfo != null) {
      return { code: -1, message: '失败' };
    }
    return {
      code: 0,
      result: null,
      message: 'success',
    };
  }

  @HttpCode(200)
  @Post('del')
  async del(@Body() dto: any) {
    const { ids } = dto;
    const idsLen = ids.length;
    const data = await this.websiteConfigService.delete(ids);
    if (data.affected != idsLen) {
      return {
        code: -1,
        result: null,
        message: '',
      };
    }
    return {
      code: 0,
      result: null,
      message: 'success',
    };
  }

  @HttpCode(200)
  @Post('update')
  async update(@Body() dto: any): Promise<any> {
    console.log(dto);
    dto.id = 1;
    const createInfo = await this.websiteConfigService.update(dto);
    if (createInfo != null) {
      return { code: -1, message: '失败' };
    }
    return {
      code: 0,
      result: null,
      message: 'success',
    };
  }

  @SkipJwtAuth()
  @Get('info')
  async getWebsiteConfigInfo(@Query() dto: any) {
    const { id } = dto;
    const info = await this.websiteConfigService.findById(id);
    // console.log('list=', list);
    return {
      code: 0,
      result: info,
      message: 'success',
      type: 'success',
    };
  }
}
