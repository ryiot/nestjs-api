/*
 * @Author: Sheng.Jiang
 * @Date: 2021-12-09 14:49:35
 * @LastEditTime: 2022-07-04 20:03:58
 * @LastEditors: Please set LastEditors
 * @Description: 用户管理 service
 * @FilePath: \meimei-admin\src\modules\system\user\user.service.ts
 * You can you up，no can no bb！！
 */

// import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
// import { USER_VERSION_KEY } from 'src/common/contants/redis.contant';
import { PaginatedDto } from '@/common/dto/paginated.dto';
// import { ApiException } from 'src/common/exceptions/api.exception';
// import { SharedService } from 'src/shared/shared.service';
import { Between, In, Like, Repository } from 'typeorm';
// import { DeptService } from '../dept/dept.service';
// import { PostService } from '../post/post.service';
// import { ReqRoleListDto } from '../role/dto/req-role.dto';
// import { RoleService } from '../role/role.service';
import { ReqCreateUserDto } from './dto/req-user.dto';
// import { ResAuthRoleDto, ResHasRoleDto } from './dto/res-user.dto';
import { UserEntity } from './entities/user.entity';
import { ResCreateUserDto } from './dto/res-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /**
   * 增加系统用户，如果返回false则表示已存在该用户
   * @param param Object 对应SysUser实体类
   */
  // async add(param: ReqCreateUserDto): Promise<void> {
  //   // const insertData: any = { ...CreateUserDto };
  //   const exists = await this.userRepository.findOne({
  //     username: param.username,
  //   });
  //   if (!isEmpty(exists)) {
  //     throw new ApiException(10001);
  //   }
  //   // 所有用户初始密码为123456
  //   await this.entityManager.transaction(async (manager) => {
  //     const salt = this.util.generateRandomValue(32);

  //     // 查找配置的初始密码
  //     const initPassword = await this.paramConfigService.findValueByKey(
  //       SYS_USER_INITPASSWORD,
  //     );

  //     const password = this.util.md5(`${initPassword ?? '123456'}${salt}`);
  //     const u = manager.create(SysUser, {
  //       departmentId: param.departmentId,
  //       username: param.username,
  //       password,
  //       name: param.name,
  //       nickName: param.nickName,
  //       email: param.email,
  //       phone: param.phone,
  //       remark: param.remark,
  //       status: param.status,
  //       psalt: salt,
  //     });
  //     const result = await manager.save(u);
  //     const { roles } = param;
  //     const insertRoles = roles.map((e) => {
  //       return {
  //         roleId: e,
  //         userId: result.id,
  //       };
  //     });
  //     // 分配角色
  //     await manager.insert(SysUserRole, insertRoles);
  //   });
  // }

  // async create(param: ReqCreateUserDto): Promise<ResCreateUserDto> {
  //   console.log(param);
  //   const data = await this.userRepository.save(param);
  //   return data;
  //   // const { username, email, password, mobile, nickname, remark } = body;
  //   // console.log('body=', body);
  //   // const zuUser = new ZuUserEntity();
  //   // zuUser.username = username;
  //   // zuUser.email = email;
  //   // zuUser.password = password;
  //   // zuUser.mobile = mobile;
  //   // zuUser.nickname = nickname;
  //   // zuUser.remark = remark;

  //   // return await this.repository.save(zuUser);
  // }
  async create(param: ReqCreateUserDto): Promise<string> {
    console.log(param);
    param.password = param.password + 'pwd';
    const saveInfo = await this.userRepository.save(param);
    if (saveInfo != null) {
      return null;
    }
    return 'err';
  }

  /* 软删除 */
  async softDelete(userIdArr: string[], username: string) {
    // return await this.userRepository.softDelete(userIdArr);
    const softDeleteInfo = await this.userRepository
      .createQueryBuilder()
      .update()
      .set({
        updateBy: username,
        deleteTime: new Date(),
      })
      .where({
        userId: In(userIdArr),
      })
      .execute();
    const { affected } = softDeleteInfo;
    const len = userIdArr.length;
    if (affected == len) {
      return null;
    }
    return 'err';
  }

  /* 删除 */
  async delete(userIdArr: string[]) {
    const deleteInfo = await this.userRepository.delete(userIdArr);
    const { affected } = deleteInfo;
    const len = userIdArr.length;
    if (affected == len) {
      return null;
    }
    return 'err';
  }

  // 清空数据
  async clear() {
    await this.userRepository.clear();
  }
}
