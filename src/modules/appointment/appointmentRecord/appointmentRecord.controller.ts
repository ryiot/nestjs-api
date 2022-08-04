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
import { AppointmentRecordService } from './appointmentRecord.service';

@Controller('appointment/record')
export class AppointmentRecordController {
  constructor(
    private readonly appointmentRecordService: AppointmentRecordService,
  ) {}

  @SkipJwtAuth()
  @HttpCode(200)
  @Post('add')
  async create(@Body() dto: any): Promise<any> {
    const createInfo = await this.appointmentRecordService.create(dto);

    return {
      code: 0,
      result: createInfo.id,
      message: 'success',
    };
  }

  @HttpCode(200)
  @Post('del')
  async del(@Body() dto: any) {
    const { ids } = dto;
    const idsLen = ids.length;
    const data = await this.appointmentRecordService.delete(ids);
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
    const createInfo = await this.appointmentRecordService.update(dto);
    if (createInfo != null) {
      return { code: -1, message: '失败' };
    }
    return {
      code: 0,
      result: null,
      message: 'success',
    };
  }

  @Get('info')
  async getAppointmentRecordInfo(@Query() dto: any) {
    const { id } = dto;
    const info = await this.appointmentRecordService.findById(id);
    // console.log('list=', list);
    return {
      code: 0,
      result: info,
      message: 'success',
      type: 'success',
    };
  }

  @Get('list')
  async list(@Query() dto: any) {
    const { id } = dto;
    const list = await this.appointmentRecordService.list(dto);
    // console.log('list=', list);
    return {
      code: 0,
      // result: list,
      result: {
        items: list[0],
        total: list[1],
      },
      message: 'success',
      type: 'success',
    };
  }

  @HttpCode(200)
  @Post('download')
  async download(@Body() dto: any): Promise<any> {
    console.log(dto);
    const excel = await this.appointmentRecordService.excel();
    console.log('excel=', excel);
    return {
      code: 0,
      result: { url: excel },
      message: 'success',
    };
  }

  @HttpCode(200)
  @Get('count')
  async count(@Body() dto: any): Promise<any> {
    console.log(dto);
    const count = await this.appointmentRecordService.count();
    console.log('count=', count);
    return {
      code: 0,
      result: count,
      message: 'success',
    };
  }

  @HttpCode(200)
  @Post('qian')
  async qian(@Body() dto: any): Promise<any> {
    console.log(dto);
    const createInfo = await this.appointmentRecordService.qian(dto);
    if (createInfo != null) {
      return { code: -1, message: '失败' };
    }
    return {
      code: 0,
      result: null,
      message: 'success',
    };
  }
}
