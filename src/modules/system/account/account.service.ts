import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/account.dto';
import { AccountEntity } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async create(dto: CreateAccountDto): Promise<string> {
    console.log(dto);
    const saveInfo = await this.accountRepository.save(dto);
    if (saveInfo != null) {
      return null;
    }
    return 'err';
  }

  // async list(dto: any): Promise<object> {
  //   console.log(dto);
  //   const listInfo = await this.accountRepository.findAndCount({
  //     order: {
  //       // name: 'id',
  //       id: 'DESC',
  //     },
  //   });
  //   if (listInfo == null) {
  //     return null;
  //   }
  //   return listInfo;
  // }

  async list(dto: any) {
    console.log(dto);
    const { page, pageSize, username, nickname, email, mobile } = dto;

    // 搜索条件
    const search = {};

    if (username != null && username != '') {
      search['username'] = username;
    }
    if (email != null && email != '') {
      search['email'] = email;
    }
    if (nickname != null && nickname != '') {
      search['nickname'] = nickname;
    }
    if (mobile != null && mobile != '') {
      search['mobile'] = mobile;
    }

    // 页码
    let pageNumValue = 1;
    let pageSizeValue = 3;
    if (page != null && page != '') {
      pageNumValue = page;
    }
    if (pageSize != null && pageSize != '') {
      pageSizeValue = pageSize;
    }

    // 获取数据
    return await this.accountRepository.findAndCount({
      where: search,
      order: { id: 'DESC' },
      skip: pageSizeValue * (pageNumValue - 1),
      take: pageSizeValue,
    });
  }
}
