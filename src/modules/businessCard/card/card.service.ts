import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Like, Repository } from 'typeorm';
import { CardEntity } from './entities/card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly cardRepository: Repository<CardEntity>,
  ) {}

  async create(dto: any): Promise<string> {
    console.log('add=', dto);
    const { name, phone, wx, companyName, type, imgArr } = dto;
    const username = dayjs().format('YYMMDDHHmmssSSS');
    // const imgUrl0 = imgArr[0];
    // const imgUrl1 = imgArr[1];
    // const imgUrl2 = imgArr[2];
    // const imgUrl3 = imgArr[3];
    // const imgUrl4 = imgArr[4];
    // const imgUrl5 = imgArr[5];

    const data = {
      username,
      name,
      phone,
      wx,
      companyName,
      type,
      // imgUrl0,
      // imgUrl1,
      // imgUrl2,
      // imgUrl3,
      // imgUrl4,
      // imgUrl5,
    };
    const saveInfo = await this.cardRepository.save(data);
    // console.log(saveInfo);
    if (saveInfo != null) {
      return null;
    }
    return 'err';
  }

  async delete(id: number) {
    return await this.cardRepository.delete(id);
  }

  async update(dto: any): Promise<string> {
    const {
      id,
      username,
      name,
      phone,
      wx,
      companyName,
      imgArr0,
      imgArr1,
      imgArr2,
      imgUrl0,
      imgUrl1,
      imgUrl2,
      imgUrl3,
      imgUrl4,
      imgUrl5,
      content,
      content2,
      video,
      site,
      address,
      lng,
      lat,
    } = dto;
    console.log('dto=', dto);
    let videoUrl = null;
    if (video != '' && video != null) {
      videoUrl = video;
    }
    // let imgUrl0 = null;
    // let imgUrl1 = null;
    // let imgUrl2 = null;
    // let imgUrl3 = null;
    // let imgUrl4 = null;
    // let imgUrl5 = null;
    // if (imgArr0 != null && imgArr0 != '') {
    //   imgUrl0 = imgArr0[0];
    // }
    // if (imgArr1 != null && imgArr1 != '') {
    //   imgUrl1 = imgArr1[0];
    // }
    // if (imgArr2 != null && imgArr2 != '') {
    //   // for (let i=0;i<imgArr2.length;i++;) {

    //   // }
    //   imgUrl2 = imgArr2[0];
    //   imgUrl3 = imgArr2[1];
    //   imgUrl4 = imgArr2[2];
    //   imgUrl5 = imgArr2[3];
    // }

    const newData = {
      name,
      username,
      phone,
      wx,
      companyName,
      content,
      content2,
      video: videoUrl,
      imgUrl0,
      imgUrl1,
      imgUrl2,
      imgUrl3,
      imgUrl4,
      imgUrl5,
      site,
      address,
      lng,
      lat,
    };
    console.log('new=', newData);
    const saveInfo = await this.cardRepository.update({ id: id }, newData);
    console.log('saveInfo=', saveInfo);
    if (saveInfo != null) {
      return null;
    }
    return 'err';
  }

  async findByUsername(username: string) {
    return await this.cardRepository.findOne({
      where: { username },
    });
  }

  async findById(id: number) {
    // return await this.cardRepository.findOne({
    //   where: { id: id },
    // });
    let data = await this.cardRepository.findOne({
      where: { id: id },
    });
    if (data != null) {
      const items = data;
      const imgArr0 = [];
      const imgArr1 = [];
      const imgArr2 = [];
      const videoArr = [];
      const item = items;
      if (item.imgUrl0 != null) {
        imgArr0[0] = item.imgUrl0;
      }
      if (item.imgUrl1 != null) {
        imgArr1[0] = item.imgUrl1;
      }
      if (item.imgUrl2 != null) {
        imgArr2.push(item.imgUrl2);
      }
      if (item.imgUrl3 != null) {
        imgArr2.push(item.imgUrl3);
      }
      if (item.imgUrl4 != null) {
        imgArr2.push(item.imgUrl4);
      }
      if (item.imgUrl5 != null) {
        imgArr2.push(item.imgUrl5);
      }

      if (item.video != null) {
        videoArr[0] = item.video;
      }

      items['imgArr0'] = imgArr0;
      items['imgArr1'] = imgArr1;
      items['imgArr2'] = imgArr2;
      items['videoArr'] = videoArr;
      data = items;
    }
    console.log('信息=', data);
    return data;
  }

  async list(dto: any) {
    console.log(dto);
    const { page, pageSize, name, username, phone, wx, companyName, type } =
      dto;

    // 搜索条件
    const search = {};

    if (username != null && username != '') {
      search['username'] = username;
    }
    if (name != null && name != '') {
      search['name'] = Like('%' + name + '%');
    }
    if (phone != null && phone != '') {
      search['phone'] = Like('%' + phone + '%');
    }
    if (wx != null && wx != '') {
      search['wx'] = Like('%' + wx + '%');
    }
    if (companyName != null && companyName != '') {
      search['companyName'] = Like('%' + companyName + '%');
    }
    if (type != null && type != '') {
      search['type'] = type;
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
    const data = await this.cardRepository.findAndCount({
      where: search,
      order: { id: 'DESC' },
      skip: pageSizeValue * (pageNumValue - 1),
      take: pageSizeValue,
    });
    console.log(data[0]);

    if (data[0] != null) {
      const items = data[0];
      for (let i = 0; i < items.length; i++) {
        // const items = data;
        const imgArr0 = [];
        const imgArr1 = [];
        const imgArr2 = [];
        const videoArr = [];
        const item = items[i];
        // if (item.imgUrl0 != null) {
        //   imgArr[0] = item.imgUrl0;
        // }
        // if (item.imgUrl1 != null) {
        //   imgArr[1] = item.imgUrl1;
        // }
        // if (item.imgUrl2 != null) {
        //   imgArr[2] = item.imgUrl2;
        // }
        // if (item.imgUrl3 != null) {
        //   imgArr[3] = item.imgUrl3;
        // }
        // if (item.imgUrl4 != null) {
        //   imgArr[4] = item.imgUrl4;
        // }

        // if (item.video != null) {
        //   videoArr[0] = item.video;
        // }

        if (item.imgUrl0 != null) {
          imgArr0[0] = item.imgUrl0;
        }
        if (item.imgUrl1 != null) {
          imgArr1[0] = item.imgUrl1;
        }
        if (item.imgUrl2 != null) {
          imgArr2.push(item.imgUrl2);
        }
        if (item.imgUrl3 != null) {
          imgArr2.push(item.imgUrl3);
        }
        if (item.imgUrl4 != null) {
          imgArr2.push(item.imgUrl4);
        }
        if (item.imgUrl5 != null) {
          imgArr2.push(item.imgUrl5);
        }

        if (item.video != null) {
          videoArr[0] = item.video;
        }

        items[i]['imgArr0'] = imgArr0;
        items[i]['imgArr1'] = imgArr1;
        items[i]['imgArr2'] = imgArr2;

        // items[i]['imgArr'] = imgArr;
        items[i]['videoArr'] = videoArr;
      }
      data[0] = items;
    }

    return data;
  }

  // async status(dto: any) {
  //   const { id, status } = dto;
  //   await this.cardRepository.update({ id }, { status });
  // }

  // async resetPassword(dto: any) {
  //   const { id, newPassword } = dto;
  //   await this.cardRepository.update({ id }, { password: newPassword });
  // }
}
