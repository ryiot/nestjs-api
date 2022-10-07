import { Result } from '@/utils/result';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { SkipJwtAuth } from '../login/jwt.constants';
import { Config1Service } from './config1.service';

@Controller('system/config1')
export class Config1Controller {
  constructor(private readonly config1Service: Config1Service) {}

  @HttpCode(200)
  @Post()
  async create(@Req() req: any) {
    const { user, body } = req;
    const data = await this.config1Service.create(user, body);
    if (data == null) {
      return Result.failMsg({}, '创建失败');
    }
    return Result.successMsg({}, '创建成功');
  }

  @HttpCode(200)
  @Post('clear')
  async clear(@Req() req) {
    const { user, body } = req;
    const data = await this.config1Service.clear();
    console.log('data=', data);
    // if (data.affected != idsLen) {
    //   return Result.failMsg({}, '删除全部数据失败');
    // }
    // return Result.successMsg({}, '删除全部数据成功');
  }

  // 根据 id 删除
  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const isNumber = /^\d+$/.test(id);
    if (isNumber) {
      // 字符串数组转数字数组
      const turnNum = function (nums: string[]) {
        return nums.map(Number);
      };
      const idsStr = id.match(/[0-9]+/g);
      const ids = turnNum(idsStr);
      const idsLen = ids.length;
      const data = await this.config1Service.delete(ids);
      if (data.affected != idsLen) {
        return Result.failMsg({}, '删除失败');
      }
      return Result.successMsg({}, '删除成功');
    }
    return '';
  }

  @HttpCode(200)
  @Put()
  async update(@Req() req: any) {
    const { user, body } = req;
    const data = await this.config1Service.update(body);
    if (data == null) {
      return Result.failMsg({}, '修改失败');
    }
    return Result.successMsg({}, '修改成功');
  }

  // 查询
  @SkipJwtAuth()
  @HttpCode(200)
  @Get(':id')
  async findById(@Param('id') id: string, @Query() query: any) {
    const isNumber = /^\d+$/.test(id);
    if (isNumber) {
      const data = await this.config1Service.findById(+id);
      if (data == null) {
        return { code: 1000, msg: '暂无数据' };
      }
      return { code: 200, msg: '操作成功', data: data };
    } else if (id == 'list') {
      const data = await this.config1Service.list(query);
      if (data == null) {
        return { code: 1000, msg: '暂无数据' };
      }
      return { code: 200, msg: '操作成功', rows: data[0], total: data[1] };
    } else if (id == 'optionselect') {
      const data = await this.config1Service.optionselect();
      if (data == null) {
        return { code: 1000, msg: '暂无数据' };
      }
      return { code: 200, msg: '操作成功', data: data };
    }
  }

  // @HttpCode(200)
  // @Get()
  // async list(@Query() query: any) {
  //   console.log(query);
  //   const data = await this.config1Service.list(query);
  //   if (data == null) {
  //     return Result.failMsg({}, '暂无数据');
  //   }
  //   return Result.success({ rows: data[0], total: data[1] });
  // }
}
