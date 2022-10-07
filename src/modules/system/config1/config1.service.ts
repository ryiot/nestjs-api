import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Config1Entity } from './entities/config1.entity';

@Injectable()
export class Config1Service {
  constructor(
    @InjectRepository(Config1Entity)
    private Config1Repository: Repository<Config1Entity>,
  ) {}

  async create(user: any, body: any) {
    const { username } = user;
    console.log('user=',user);
    const {
      config1Title,
      video,
      config1Content,
      config1Content2,
      config1Type,
      status,
      remark,
    } = body;

    const Config1 = new Config1Entity();
    Config1.config1Title = config1Title;
    Config1.config1Content = config1Content;
    Config1.config1Type = config1Type;
    Config1.status = status;
    Config1.createBy = username;
    Config1.remark = remark;

    return await this.Config1Repository.save(Config1);
  }

  async delete(ids: number[]) {
    return await this.Config1Repository.delete(ids);
  }

  // 清空数据
  async clear() {
    await this.Config1Repository.clear();
  }

  async update(body: any) {
    const {
      config1Id,
      config1Title,
      video,
      config1Content,
      config1Content2,
      config1Type,
      status,
      remark,
    } = body;

    const newData = {
      config1Title,
      video,
      config1Content,
      config1Content2,
      config1Type,
      status,
      remark,
    };

    return await this.Config1Repository.update({ config1Id }, newData);
  }

  async findById(id: number) {
    const data = await this.Config1Repository.findOne({ where: { config1Id: id } });
    // if (data) {

    // }
    return data;
  }

  async list(query: any) {
    console.log(query);
    const {
      pageNum,
      pageSize,
      config1Title,
      video,
      config1Content,
      config1Content2,
      config1Type,
      status,
      createBy,
      createTime,
      remark,
    } = query;

    // 搜索
    const search = {};

    if (config1Title != null && config1Title != '') {
      search['config1Title'] = config1Title;
    }
    if (config1Type != null && config1Type != '') {
      search['config1Type'] = config1Type;
    }
    if (status != null && status != '') {
      search['status'] = status;
    }
    if (createBy != null && createBy != '') {
      search['createBy'] = createBy;
    }
    if (createTime != null && createTime != '') {
      search['createTime'] = createTime;
    }

    // 页码
    let pageNumValue = 1;
    let pageSizeValue = 30;
    if (pageNum != null) {
      pageNumValue = pageNum;
    }
    if (pageSize != null) {
      pageSizeValue = pageSize;
    }

    // 获取数据
    return await this.Config1Repository.findAndCount({
      where: search,
      order: { config1Id: 'DESC' },
      skip: pageSizeValue * (pageNumValue - 1),
      take: pageSizeValue,
    });
  }
  
  async optionselect() {
    // 获取数据
    return await this.Config1Repository.find();
  }
}
