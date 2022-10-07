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
import { NoticeService } from './notice.service';

@Controller('system/notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @HttpCode(200)
  @Post()
  async create(@Req() req: any) {
    const { user, body } = req;
    const data = await this.noticeService.create(user, body);
    if (data == null) {
      return Result.failMsg({}, '创建失败');
    }
    return Result.successMsg({}, '创建成功');
  }

  @HttpCode(200)
  @Post('clear')
  async clear(@Req() req) {
    const { user, body } = req;
    const data = await this.noticeService.clear();
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
      const data = await this.noticeService.delete(ids);
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
    const data = await this.noticeService.update(body);
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
      const data = await this.noticeService.findById(+id);
      if (data == null) {
        return { code: 1000, msg: '暂无数据' };
      }
      return { code: 200, msg: '操作成功', data: data };
    } else if (id == 'list') {
      const data = await this.noticeService.list(query);
      if (data == null) {
        return { code: 1000, msg: '暂无数据' };
      }
      return { code: 200, msg: '操作成功', rows: data[0], total: data[1] };
    } else if (id == 'optionselect') {
      const data = await this.noticeService.optionselect();
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
  //   const data = await this.noticeService.list(query);
  //   if (data == null) {
  //     return Result.failMsg({}, '暂无数据');
  //   }
  //   return Result.success({ rows: data[0], total: data[1] });
  // }
}
