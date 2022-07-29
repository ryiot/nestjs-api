import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateAccountDto, UpdateAccountDto } from './dto/account.dto';
import { AccountEntity } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async create(dto: any): Promise<string> {
    console.log(dto);
    const {
      username,
      password,
      trademark,
      companyName,
      companyProfile,
      areas,
      address,
      contact,
      mobile,
      email,
      remark,
      provinceCode,
      cityCode,
      areaCode,
    } = dto;
    const data = {
      username,
      password,
      trademark,
      companyName,
      companyProfile,
      address,
      contact,
      mobile,
      email,
      remark,
      provinceCode,
      cityCode,
      areaCode,
    };
    const saveInfo = await this.accountRepository.save(data);
    if (saveInfo != null) {
      return null;
    }
    return 'err';
  }

  async delete(ids: number[]) {
    return await this.accountRepository.delete(ids);
  }

  async update(dto: any): Promise<string> {
    const {
      id,
      username,
      password,
      trademark,
      companyName,
      companyProfile,
      areas,
      address,
      contact,
      mobile,
      email,
      remark,
      provinceCode,
      cityCode,
      areaCode,
    } = dto;
    const newData = {
      username,
      trademark,
      companyName,
      companyProfile,
      address,
      contact,
      mobile,
      email,
      remark,
      provinceCode,
      cityCode,
      areaCode,
    };
    const saveInfo = await this.accountRepository.update({ id }, newData);
    if (saveInfo != null) {
      return null;
    }
    return 'err';
  }

  async findById(id: number) {
    return await this.accountRepository.findOne({ where: { id: id } });
  }

  async list(dto: any) {
    console.log(dto);
    const { page, pageSize, username, companyName, email, mobile } = dto;

    // 搜索条件
    const search = {};

    if (username != null && username != '') {
      search['username'] = Like('%' + username + '%');
    }
    if (email != null && email != '') {
      search['email'] = email;
    }
    if (companyName != null && companyName != '') {
      search['companyName'] = Like('%' + companyName + '%');
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
    const data = await this.accountRepository.findAndCount({
      where: search,
      order: { id: 'DESC' },
      skip: pageSizeValue * (pageNumValue - 1),
      take: pageSizeValue,
    });
    const list = data[0];
    for (let i = 0; i < data[1]; i++) {
      const item = list[i];
      list[i]['areas'] = [item.provinceCode, item.cityCode, item.areaCode];
    }
    data[0] = list;
    return data;
  }
}
