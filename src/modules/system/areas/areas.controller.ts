import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { faker } from '@faker-js/faker/locale/zh_CN';
import { AreasService } from './areas.service';
import { CreateAreasDto, IsAreasExistDto } from './dto/areas.dto';
// faker.locale = 'zh_CN';

@Controller('system')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Get('areaRecord')
  async areaRecord(@Query() query: any) {
    const res = await this.areasService.areaRecord(query);
    return {
      code: 0,
      result: res,
      message: 'success',
      type: 'success',
    };
  }
}
