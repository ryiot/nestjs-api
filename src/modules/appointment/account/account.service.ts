import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
// import { AreasService } from '../areas/areas.service';
import { CreateAccountDto, UpdateAccountDto } from './dto/account.dto';
import { AccountEntity } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    // private readonly areasService: AreasService,
  ) {}

  async create(dto: any): Promise<string> {
    console.log('add=', dto);
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
    } = dto;

    let provinceCode = null;
    let cityCode = null;
    let areaCode = null;

    if (areas) {
      provinceCode = areas[0];
      cityCode = areas[1];
      areaCode = areas[2];
    }
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
    console.log(saveInfo);
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
    // let province = null;
    // let city = null;
    // let area = null;

    // if (areas) {
    //   const provinceInfo = await this.areasService.findValue(areas[0]);
    //   province = provinceInfo['label'];
    //   const cityInfo = await this.areasService.findValue(areas[1]);
    //   city = cityInfo['label'];
    //   const areaInfo = await this.areasService.findValue(areas[2]);
    //   area = areaInfo['label'];
    //   console.log(area);
    // }

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
      // province,
      // city,
      // area,
      provinceCode,
      cityCode,
      areaCode,
    };
    const saveInfo = await this.accountRepository.update({ id: id }, newData);
    console.log(saveInfo);
    if (saveInfo != null) {
      return null;
    }
    return 'err';
  }

  async findByUsername(username: string) {
    return await this.accountRepository.findOne({
      where: { username },
    });
  }

  async findById(id: number) {
    return await this.accountRepository.findOne({
      select: [
        'id',
        'username',
        'password',
        'avatar',
        'roleName',
        'role',
        'bId',
        'cId',
        'trademark',
        'companyName',
        'companyProfile',
        'provinceCode',
        'province',
        'cityCode',
        'city',
        'areaCode',
        'area',
        'address',
        'contact',
        'mobile',
        'email',
        'status',
        'createTime',
        'updateTime',
        'remark',
      ],
      where: { id: id },
    });
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
      select: [
        'id',
        'username',
        'password',
        'avatar',
        'roleName',
        'role',
        'bId',
        'cId',
        'trademark',
        'companyName',
        'companyProfile',
        'provinceCode',
        'province',
        'cityCode',
        'city',
        'areaCode',
        'area',
        'address',
        'contact',
        'mobile',
        'email',
        'status',
        'createTime',
        'updateTime',
        'remark',
      ],
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

  async status(dto: any) {
    const { id, status } = dto;
    await this.accountRepository.update({ id }, { status });
  }

  async resetPassword(dto: any) {
    const { id, newPassword } = dto;
    await this.accountRepository.update({ id }, { password: newPassword });
  }
}
