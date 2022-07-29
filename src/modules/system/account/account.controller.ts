import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { faker } from '@faker-js/faker/locale/zh_CN';
import { AccountService } from './account.service';
import {
  CreateAccountDto,
  IsAccountExistDto,
  UpdateAccountDto,
} from './dto/account.dto';
// faker.locale = 'zh_CN';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @HttpCode(200)
  @Post('add')
  // async create(@Body() dto: CreateAccountDto): Promise<any> {
  async create(@Body() dto: any): Promise<any> {
    console.log(dto);
    dto.provinceCode = dto.areas[0];
    dto.cityCode = dto.areas[1];
    dto.areaCode = dto.areas[2];
    const createInfo = await this.accountService.create(dto);
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
    const data = await this.accountService.delete(ids);
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
    dto.provinceCode = dto.areas[0];
    dto.cityCode = dto.areas[1];
    dto.areaCode = dto.areas[2];
    const createInfo = await this.accountService.update(dto);
    if (createInfo != null) {
      return { code: -1, message: '失败' };
    }
    return {
      code: 0,
      result: null,
      message: 'success',
    };
  }

  @Get('getAccountInfo')
  async getAccountInfo(@Query() dto: any) {
    const { id } = dto;
    const info = await this.accountService.findById(id);
    // console.log('list=', list);
    return {
      code: 0,
      result: info,
      message: 'success',
      type: 'success',
    };
  }

  @Get('getAccountList')
  async getAccountList(@Query() query: any) {
    const list = await this.accountService.list(query);
    // console.log('list=', list);
    return {
      code: 0,
      result: {
        items: list[0],
        total: list[1],
      },
      // result: {
      //   items: [
      //     {
      //       id: 13,
      //       province: '福建',
      //       username: 'qereaffda',
      //       password: '321esadd',
      //       roleName: 'B',
      //       bId: null,
      //       cId: null,
      //       t: 'B',
      //       nickname: '新用户',
      //       companyName: null,
      //       companyProfile: null,
      //       contact: null,
      //       mobile: null,
      //       email: null,
      //       sex: '0',
      //       avatar: null,
      //       provinceCode: '430000',
      //       status: '0',
      //       loginIp: '0.0.0.0',
      //       loginAt: null,
      //       pwdUpdatedAt: null,
      //       createdBy: null,
      //       updatedBy: null,
      //       createdAt: '2022-07-28T00:36:49.361Z',
      //       updateAt: '2022-07-28T00:36:49.361Z',
      //       remark: null,
      //     },
      //   ],
      //   total: list[1],
      // },
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
