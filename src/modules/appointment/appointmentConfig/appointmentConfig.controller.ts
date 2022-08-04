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
import { AppointmentConfigService } from './appointmentConfig.service';

@Controller('appointment/config')
export class AppointmentConfigController {
  constructor(
    private readonly appointmentConfigService: AppointmentConfigService,
  ) {}

  @SkipJwtAuth()
  @HttpCode(200)
  @Post('add')
  async create(@Body() dto: any): Promise<any> {
    const createInfo = await this.appointmentConfigService.create(dto);
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
    const data = await this.appointmentConfigService.delete(ids);
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
    const createInfo = await this.appointmentConfigService.update(dto);
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
  async getAppointmentConfigInfo(@Query() dto: any) {
    const { id } = dto;
    const info = await this.appointmentConfigService.findById(id);
    // console.log('list=', list);
    return {
      code: 0,
      result: info,
      message: 'success',
      type: 'success',
    };
  }
}
