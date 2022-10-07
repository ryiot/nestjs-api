import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Like, Repository } from 'typeorm';
import { UnitEntity } from './entities/unit.entity';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(UnitEntity)
    private readonly unitRepository: Repository<UnitEntity>,
  ) {}

  async create(dto: any): Promise<string> {
    console.log('add=', dto);
    const { name, index, content, content2, video } = dto;

    const data = {
      name,
      index,
      content,
      content2,
      video,
    };
    const saveInfo = await this.unitRepository.save(data);
    // console.log(saveInfo);
    if (saveInfo != null) {
      return null;
    }
    return 'err';
  }

  async delete(id: number) {
    return await this.unitRepository.delete(id);
  }

  async update(dto: any): Promise<string> {
    const { id, name, index, content, content2, video } = dto;
    console.log('dto=', dto);
    let videoUrl = null;
    if (video != '' && video != null) {
      videoUrl = video;
    }

    const newData = {
      name,
      index,
      content,
      content2,
      video: videoUrl,
    };
    console.log('new=', newData);
    const saveInfo = await this.unitRepository.update({ id: id }, newData);
    console.log('saveInfo=', saveInfo);
    if (saveInfo != null) {
      return null;
    }
    return 'err';
  }

  // async findByUsername(username: string) {
  //   return await this.unitRepository.findOne({
  //     where: { username },
  //   });
  // }

  async findById(id: number) {
    let data = await this.unitRepository.findOne({
      where: { id: id },
    });
    if (data != null) {
      const items = data;
      const videoArr = [];
      const item = items;

      if (item.video != null) {
        videoArr[0] = item.video;
      }
      items['videoArr'] = videoArr;
      data = items;
    }
    console.log('信息=', data);
    return data;
  }

  async list(dto: any) {
    console.log(dto);
    const { page, pageSize, name } = dto;

    // 搜索条件
    const search = {};

    if (name != null && name != '') {
      search['name'] = Like('%' + name + '%');
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
    const data = await this.unitRepository.findAndCount({
      where: search,
      order: { id: 'DESC' },
      skip: pageSizeValue * (pageNumValue - 1),
      take: pageSizeValue,
    });
    console.log(data[0]);

    if (data[0] != null) {
      const items = data[0];
      for (let i = 0; i < items.length; i++) {
        const videoArr = [];
        const item = items[i];

        if (item.video != null) {
          videoArr[0] = item.video;
        }
        items[i]['videoArr'] = videoArr;
      }
      data[0] = items;
    }

    return data;
  }
}
