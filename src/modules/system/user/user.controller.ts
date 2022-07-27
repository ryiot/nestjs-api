import { Body, Controller, Post } from '@nestjs/common';
import {
  ReqAddUserDto,
  ReqCreateUserDto,
  ReqDelUserDto,
} from './dto/req-user.dto';
import { ResCreateUserDto } from './dto/res-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  /* 新增用户 */
  // @Post()
  // async add1(@Body() reqAddUserDto: ReqAddUserDto): Promise<ReqAddUserDto> {
  //   // const user = await this.userService.findOneByUserNameState(
  //   //   reqAddUserDto.userName,
  //   // );
  //   // if (user) throw new ApiException('该用户名已存在，请更换');
  //   // reqAddUserDto.createBy = reqAddUserDto.updateBy = userName;
  //   console.log(reqAddUserDto);
  //   await this.userService.create(reqAddUserDto);
  //   return '12';
  // }

  // 添加
  // @Post('add')
  // async add(@Body() dto: ReqCreateUserDto): Promise<void> {
  //   await this.userService.add(dto);
  // }

  @Post('create')
  async create(@Body() dto: ReqCreateUserDto): Promise<any> {
    const createInfo = await this.userService.create(dto);
    if (createInfo != null) {
      return { code: -1, message: '失败' };
    }
    return { code: 0, message: '成功' };
  }

  @Post('softDelete')
  async softDelete(@Body() dto: ReqDelUserDto): Promise<any> {
    const { userIdArr } = dto;
    const softDelete = await this.userService.softDelete(userIdArr, 'jack');
    if (softDelete != null) {
      return { code: -1, message: '失败' };
    }
    return { code: 0, message: '成功' };
  }

  @Post('delete')
  async delete(@Body() dto: ReqDelUserDto): Promise<any> {
    const { userIdArr } = dto;
    const deleteInfo = await this.userService.delete(userIdArr);
    if (deleteInfo != null) {
      return { code: -1, message: '失败' };
    }
    return { code: 0, message: '成功' };
  }
}
