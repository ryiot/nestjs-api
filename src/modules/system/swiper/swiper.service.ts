import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SwiperEntity } from './entities/swiper.entity';

@Injectable()
export class SwiperService {
  constructor(
    @InjectRepository(SwiperEntity)
    private SwiperRepository: Repository<SwiperEntity>,
  ) {}

  async create(user: any, body: any) {
    const { username } = user;
    // console.log('user=',user);
    const {
      swiperTitle,
      img,
      video,
      swiperContent,
      swiperContent2,
      swiperType,
      status,
      remark,
    } = body;

    const Swiper = new SwiperEntity();
    Swiper.swiperTitle = swiperTitle;
    Swiper.swiperContent = swiperContent;
    Swiper.img = img;
    Swiper.swiperType = swiperType;
    Swiper.status = status;
    Swiper.createBy = username;
    Swiper.remark = remark;

    return await this.SwiperRepository.save(Swiper);
  }

  async delete(ids: number[]) {
    return await this.SwiperRepository.delete(ids);
  }

  // 清空数据
  async clear() {
    await this.SwiperRepository.clear();
  }

  async update(body: any) {
    const {
      swiperId,
      swiperTitle,
      img,
      video,
      swiperContent,
      swiperContent2,
      swiperType,
      status,
      remark,
    } = body;

    const newData = {
      swiperTitle,
      img,
      video,
      swiperContent,
      swiperContent2,
      swiperType,
      status,
      remark,
    };

    return await this.SwiperRepository.update({ swiperId }, newData);
  }

  async findById(id: number) {
    const data = await this.SwiperRepository.findOne({ where: { swiperId: id } });
    // if (data) {

    // }
    return data;
  }

  async list(query: any) {
    console.log(query);
    const {
      pageNum,
      pageSize,
      swiperTitle,
      video,
      swiperContent,
      swiperContent2,
      swiperType,
      status,
      createBy,
      createTime,
      remark,
    } = query;

    // 搜索
    const search = {};

    if (swiperTitle != null && swiperTitle != '') {
      search['swiperTitle'] = swiperTitle;
    }
    if (swiperType != null && swiperType != '') {
      search['swiperType'] = swiperType;
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
    return await this.SwiperRepository.findAndCount({
      where: search,
      order: { swiperId: 'DESC' },
      skip: pageSizeValue * (pageNumValue - 1),
      take: pageSizeValue,
    });
  }
  
  async optionselect() {
    // 获取数据
    return await this.SwiperRepository.find();
  }
}
