import { Body, Controller, Get, Post } from '@nestjs/common';
import { faker } from '@faker-js/faker/locale/zh_CN';
import { AccountService } from './account.service';
import { CreateAccountDto, IsAccountExistDto } from './dto/account.dto';
// faker.locale = 'zh_CN';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('add')
  async create(@Body() dto: CreateAccountDto): Promise<any> {
    const createInfo = await this.accountService.create(dto);
    if (createInfo != null) {
      return { code: -1, message: '失败' };
    }
    return {
      code: 0,
      result: null,
      message: 'success',
      type: 'success',
    };
  }

  @Get('getAccountInfo')
  async getAccountInfo() {
    const list = await this.accountService.list('1');
    // console.log('list=', list);
    return {
      code: 0,
      result: {
        items: list[0],
        total: list[1],
      },
      message: 'success',
      type: 'success',
    };
  }

  @Get('getAccountList')
  async getAccountList() {
    const list = await this.accountService.list('1');
    // console.log('list=', list);
    return {
      code: 0,
      result: {
        items: list[0],
        total: list[1],
      },
      message: 'success',
      type: 'success',
    };
  }

  @Post('accountExist')
  async accountExist(@Body() dto: IsAccountExistDto): Promise<any> {
    console.log(dto);
    const { username } = dto;
    const reg = /^[a-z0-9A-Z@.\u4E00-\u9FA5]+$/;
    console.log(reg.test(username));
    const regOk = reg.test(username);
    // if (!regOk) {
    //   return {
    //     code: -1,
    //     result: null,
    //     message: '用户名只能包含中文、大小写字母、数字和@.',
    //     type: 'success',
    //   };
    // }
    // const createInfo = await this.accountService.create(dto);
    // if (createInfo != null) {
    //   return { code: -1, message: '失败' };
    // }
    return {
      code: 0,
      result: null,
      message: 'success',
      type: 'success',
    };
  }
}
