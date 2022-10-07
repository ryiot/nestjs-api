import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DictTypeEntity } from './entities/dict-type.entity';

@Injectable()
export class DictTypeService {
  constructor(
    @InjectRepository(DictTypeEntity)
    private DictTypeRepository: Repository<DictTypeEntity>,
  ) {}

  async create(user: any, body: any) {
    const { username } = user;
    const {
      dictName,
      dictType,
      status,
      createBy,
      createTime,
      updateBy,
      remark,
    } = body;

    const DictType = new DictTypeEntity();
    DictType.dictName = dictName;
    DictType.dictType = dictType;
    DictType.status = status;
    DictType.createBy = username;
    // DictType.createTime = createTime;
    // DictType.updateBy = updateBy;
    // DictType.remark = remark;

    return await this.DictTypeRepository.save(DictType);
  }

  async delete(ids: number[]) {
    return await this.DictTypeRepository.delete(ids);
  }

  // 清空数据
  async clear() {
    await this.DictTypeRepository.clear();
  }

  async update(body: any) {
    const {
      dictId,
      dictName,
      dictType,
      status,
      createBy,
      createTime,
      updateBy,
      remark,
    } = body;

    const newData = {
      dictName,
      dictType,
      status,
      createBy,
      createTime,
      updateBy,
      remark,
    };

    return await this.DictTypeRepository.update({ dictId }, newData);
  }

  async findById(id: number) {
    return await this.DictTypeRepository.findOne({ where: { dictId: id } });
  }

  async list(query: any) {
    console.log(query);
    const {
      pageNum,
      pageSize,
      dictName,
      dictType,
      status,
      createBy,
      createTime,
      updateBy,
      remark,
    } = query;

    // 搜索
    const search = {};

    if (dictName != null && dictName != '') {
      search['dictName'] = dictName;
    }
    if (dictType != null && dictType != '') {
      search['dictType'] = dictType;
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
    let pageSizeValue = 3;
    if (pageNum != null) {
      pageNumValue = pageNum;
    }
    if (pageSize != null) {
      pageSizeValue = pageSize;
    }

    // 获取数据
    return await this.DictTypeRepository.findAndCount({
      where: search,
      order: { dictId: 'DESC' },
      skip: pageSizeValue * (pageNumValue - 1),
      take: pageSizeValue,
    });
  }
  
  async optionselect() {
    // 获取数据
    return await this.DictTypeRepository.find();
  }
}
