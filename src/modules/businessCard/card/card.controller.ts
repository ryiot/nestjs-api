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
import { CardService } from './card.service';

@Controller('businessCard/card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @HttpCode(200)
  @Post('add')
  async create(@Body() dto: any): Promise<any> {
    const createInfo = await this.cardService.create(dto);
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
    const { id } = dto;

    const data = await this.cardService.delete(id);
    return {
      code: 0,
      result: null,
      message: 'success',
    };
  }

  @HttpCode(200)
  @Post('update')
  async update(@Body() dto: any): Promise<any> {
    console.log("更新=", dto);
    const createInfo = await this.cardService.update(dto);
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
  async getCardInfo(@Query() dto: any) {
    const { id, username } = dto;
    if (id == null) {
      const list = await this.cardService.list({ username });
      return {
        code: 0,
        result: list[0][0],
        message: 'success',
      };
    }
    if (id == 0) {
      const list = await this.cardService.list({ });
      return {
        code: 0,
        result: list[0][0],
        message: 'success',
      };
    }
    const info = await this.cardService.findById(id);
    // console.log('list=', list);
    return {
      code: 0,
      result: info,
      message: 'success',
    };
  }

  @Get('list')
  async getCardList(@Query() query: any) {
    const list = await this.cardService.list(query);
    console.log('list=', list);
    return {
      code: 0,
      result: {
        items: list[0],
        total: list[1],
      },
      message: 'success',
    };
  }
}
