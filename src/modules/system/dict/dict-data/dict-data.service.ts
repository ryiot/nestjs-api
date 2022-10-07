import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DictDataEntity } from './entities/dict-data.entity';

@Injectable()
export class DictDataService {
  constructor(
    @InjectRepository(DictDataEntity)
    private DictDataRepository: Repository<DictDataEntity>,
  ) {}

  async create(body: any) {
    const {
      dictSort,
      dictLabel,
      dictValue,
      dictType,
      cssClass,
      listClass,
      isDefault,
      status,
      createBy,
      //   createTime,
      remark,
    } = body;

    const DictData = new DictDataEntity();
    DictData.dictSort = dictSort;
    DictData.dictLabel = dictLabel;
    DictData.dictValue = dictValue;
    DictData.dictType = dictType;
    DictData.cssClass = cssClass;
    DictData.listClass = listClass;
    DictData.isDefault = isDefault;
    DictData.status = status;
    DictData.createBy = createBy;
    // DictData.createTime = createTime;
    DictData.remark = remark;

    return await this.DictDataRepository.save(DictData);
  }

  async delete(ids: number[]) {
    return await this.DictDataRepository.delete(ids);
  }

  // 清空数据
  async clear() {
    await this.DictDataRepository.clear();
  }

  async update(body: any) {
    const {
      dictCode,
      dictSort,
      dictLabel,
      dictValue,
      dictType,
      cssClass,
      listClass,
      isDefault,
      status,
      createBy,
      remark,
    } = body;

    const newData = {
      dictSort,
      dictLabel,
      dictValue,
      dictType,
      cssClass,
      listClass,
      isDefault,
      status,
      createBy,
      remark,
    };

    return await this.DictDataRepository.update({ dictCode }, newData);
  }

  async findByDictType(dictType: string) {
    return await this.DictDataRepository.find({
      where: { dictType: dictType },
    });
  }

  async findById(id: number) {
    return await this.DictDataRepository.findOne({
      where: { dictCode: id },
    });
  }

  async list(query: any) {
    console.log(query);
    const {
      pageNum,
      pageSize,
      dictSort,
      dictLabel,
      dictValue,
      dictType,
      cssClass,
      listClass,
      isDefault,
      status,
      createBy,
      remark,
    } = query;

    // 搜索
    const search = {};

    if (dictType != null && dictType != '') {
      search['dictType'] = dictType;
    }
    if (status != null && status != '') {
      search['status'] = status;
    }
    if (createBy != null && createBy != '') {
      search['createBy'] = createBy;
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
    return await this.DictDataRepository.findAndCount({
      where: search,
      order: { dictCode: 'DESC' },
      skip: pageSizeValue * (pageNumValue - 1),
      take: pageSizeValue,
    });
  }
}
