import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnitEntity } from './entities/unit.entity';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(UnitEntity)
    private UnitRepository: Repository<UnitEntity>,
  ) {}

  async create(user: any, body: any) {
    const { username } = user;
    // console.log('user=',user);
    const {
      unitTitle,
      unitIndex,
      video,
      unitContent,
      unitContent2,
      unitType,
      status,
      remark,
    } = body;

    const Unit = new UnitEntity();
    Unit.unitTitle = unitTitle;
    Unit.unitIndex = unitIndex;
    Unit.unitContent = unitContent;
    Unit.unitType = unitType;
    Unit.status = status;
    Unit.createBy = username;
    Unit.remark = remark;

    return await this.UnitRepository.save(Unit);
  }

  async delete(ids: number[]) {
    return await this.UnitRepository.delete(ids);
  }

  // 清空数据
  async clear() {
    await this.UnitRepository.clear();
  }

  async update(body: any) {
    const {
      unitId,
      unitTitle,
      unitIndex,
      video,
      unitContent,
      unitContent2,
      unitType,
      status,
      remark,
    } = body;

    const newData = {
      unitTitle,
      unitIndex,
      video,
      unitContent,
      unitContent2,
      unitType,
      status,
      remark,
    };

    return await this.UnitRepository.update({ unitId }, newData);
  }

  async findById(id: number) {
    const data = await this.UnitRepository.findOne({ where: { unitId: id } });
    // if (data) {

    // }
    return data;
  }

  async list(query: any) {
    console.log(query);
    const {
      pageNum,
      pageSize,
      unitTitle,
      video,
      unitContent,
      unitContent2,
      unitType,
      status,
      createBy,
      createTime,
      remark,
    } = query;

    // 搜索
    const search = {};

    if (unitTitle != null && unitTitle != '') {
      search['unitTitle'] = unitTitle;
    }
    if (unitType != null && unitType != '') {
      search['unitType'] = unitType;
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
    return await this.UnitRepository.findAndCount({
      where: search,
      order: { unitId: 'DESC' },
      skip: pageSizeValue * (pageNumValue - 1),
      take: pageSizeValue,
    });
  }

  async optionselect() {
    // 获取数据
    return await this.UnitRepository.find();
  }

  async listIndex(query: any) {
    console.log(query);
    const {
      pageNum,
      pageSize,
      unitTitle,
      video,
      unitContent,
      unitContent2,
      unitType,
      status,
      createBy,
      createTime,
      remark,
    } = query;

    // 搜索
    const search = {};

    if (unitTitle != null && unitTitle != '') {
      search['unitTitle'] = unitTitle;
    }
    if (unitType != null && unitType != '') {
      search['unitType'] = unitType;
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
    const res = await this.UnitRepository.findAndCount({
      where: search,
      order: { unitIndex: 'ASC' },
      skip: pageSizeValue * (pageNumValue - 1),
      take: pageSizeValue,
    });

    const data = res[0];
    const dataLen = data.length;
    const index = this.uniqueFunc(data, 'unitIndex');
    const indexList = [];
    const itemArr = [];
    for (let i = 0; i < index.length; i++) {
      const item = [];
      indexList.push(index[i].unitIndex);
      for (let j = 0; j < dataLen; j++) {
        if (data[j].unitIndex == indexList[i]) {
          item.push(data[j]);
        }
      }
      itemArr.push(item);
    }

    // console.log(indexList);

    return { indexList: indexList, itemArr: itemArr };
  }

  uniqueFunc(arr, uniId) {
    const res = new Map();
    return arr.filter(
      (item) => !res.has(item[uniId]) && res.set(item[uniId], 1),
    );
  }
}
