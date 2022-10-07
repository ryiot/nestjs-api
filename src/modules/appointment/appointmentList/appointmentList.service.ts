import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { IsNull, Like, Not, Repository } from 'typeorm';
import { AppointmentListEntity } from './entities/appointmentList.entity';

@Injectable()
export class AppointmentListService {
  constructor(
    @InjectRepository(AppointmentListEntity)
    private readonly appointmentListRepository: Repository<AppointmentListEntity>,
  ) {}

  // async create(dto: any): Promise<any> {
  //   // console.log('add=', dto);
  //   const { name, sex, age, phone, union, IDcard, imgUrl, endTime } = dto;
  //   const myDate = new Date();
  //   const imgUrl1 = imgUrl[0];
  //   const imgUrl2 = imgUrl[1];
  //   const data = {
  //     name,
  //     sex,
  //     age,
  //     phone,
  //     union,
  //     IDcard,
  //     imgUrl1,
  //     imgUrl2,
  //     startTime: dayjs(myDate).format(),
  //     endTime,
  //   };
  //   const saveInfo = await this.appointmentListRepository.save(data);
  //   console.log(saveInfo);
  //   return saveInfo;
  // }

  // async delete(ids: number[]) {
  //   return await this.appointmentListRepository.delete(ids);
  // }

  // async update(dto: any): Promise<string> {
  //   const {
  //     id,
  //     name,
  //     sex,
  //     age,
  //     phone,
  //     union,
  //     IDcard,
  //     imgUrl,
  //     startTime,
  //     endTime,
  //   } = dto;

  //   const newData = {
  //     name,
  //     sex,
  //     age,
  //     phone,
  //     union,
  //     IDcard,
  //     imgUrl,
  //     startTime,
  //     endTime: dayjs(new Date()).format(),
  //   };
  //   const saveInfo = await this.appointmentListRepository.update(
  //     { id: id },
  //     newData,
  //   );
  //   console.log(saveInfo);
  //   if (saveInfo != null) {
  //     return null;
  //   }
  //   return 'err';
  // }

  async findById(id: number) {
    return await this.appointmentListRepository.findOne({
      where: { id: id },
    });
  }

  async findByName(name: string) {
    console.log("name=", name);
    return await this.appointmentListRepository.findOne({
      where: { name: name },
    });
  }

  async findAll() {
    // console.log("name=", name);
    return await this.appointmentListRepository.find();
  }

  // async list(dto: any) {
  //   console.log(dto);
  //   const {
  //     page,
  //     pageSize,
  //     name,
  //     sex,
  //     age,
  //     phone,
  //     union,
  //     IDcard,
  //     imgUrl,
  //     startTime,
  //     endTime,
  //   } = dto;

  //   // 搜索条件
  //   const search = {};

  //   if (name != null && name != '') {
  //     search['name'] = Like('%' + name + '%');
  //   }
  //   if (IDcard != null && IDcard != '') {
  //     search['IDcard'] = IDcard;
  //   }

  //   // 页码
  //   let pageNumValue = 1;
  //   let pageSizeValue = 3;
  //   if (page != null && page != '') {
  //     pageNumValue = page;
  //   }
  //   if (pageSize != null && pageSize != '') {
  //     pageSizeValue = pageSize;
  //   }

  //   // 获取数据
  //   const data = await this.appointmentListRepository.findAndCount({
  //     where: search,
  //     order: { id: 'DESC' },
  //     skip: pageSizeValue * (pageNumValue - 1),
  //     take: pageSizeValue,
  //   });

  //   const list = data[0];
  //   for (let i = 0; i < list.length; i++) {
  //     const item = list[i];
  //     console.log('item=', item);
  //     const imgArr = [];
  //     if (item.imgUrl1 != null) {
  //       imgArr.push(item.imgUrl1);
  //     }
  //     if (item.imgUrl2 != null) {
  //       imgArr.push(item.imgUrl2);
  //     }
  //     list[i]['imgArr'] = imgArr;
  //   }
  //   data[0] = list;
  //   return data;
  // }

  // async excel() {
  //   const tableData = await this.appointmentListRepository.find({
  //     select: [
  //       'name',
  //       'sex',
  //       'age',
  //       'phone',
  //       'union',
  //       'IDcard',
  //       'imgUrl1',
  //       'imgUrl2',
  //       'startTime',
  //       'endTime',
  //     ],
  //   });
  //   // 添加
  //   tableData.unshift({
  //     id: null,
  //     startTime: '预约时间',
  //     endTime: '签到时间',
  //     name: '姓名',
  //     sex: '性别',
  //     age: '年龄',
  //     phone: '电话',
  //     union: '工会',
  //     IDcard: '身份证',
  //     imgUrl1: '证书照片1',
  //     imgUrl2: '证书照片2',
  //   });
  //   const fileName = await this.exportExcelFromData(tableData);
  //   // console.log('table=', table);
  //   // return table;
  //   return fileName;
  //   // return '';
  // }
  // /**
  //  * 将数据转成 excel
  //  * @param array
  //  * @param sheetName
  //  * @returns {any}
  //  */
  // async exportExcelFromData(array, sheetName = '预约记录'): Promise<string> {
  //   // eslint-disable-next-line @typescript-eslint/no-var-requires
  //   // const dayjs = require('dayjs');
  //   const fileName =
  //     '/upload/预约记录-' +
  //     dayjs().format('YYYY年MM月DD日HH时mm分ss秒') +
  //     '.xlsx';
  //   // eslint-disable-next-line @typescript-eslint/no-var-requires
  //   const xlsx = require('xlsx');
  //   const jsonWorkSheet = xlsx.utils.json_to_sheet(array, {
  //     // header: ['id', 'type'], // 自定义表头顺序
  //     skipHeader: true, // 隐藏键值，可自行改成false下载后对比差异
  //   });
  //   const workBook = {
  //     SheetNames: [sheetName],
  //     Sheets: {
  //       [sheetName]: jsonWorkSheet,
  //     },
  //   };
  //   xlsx.writeFile(workBook, 'public/' + fileName);
  //   // return xlsx.write(workBook, { type: 'binary' });
  //   return fileName;
  // }

  // async count() {
  //   const data0 = await this.appointmentListRepository.count({
  //     where: {},
  //   });
  //   const data1 = await this.appointmentListRepository.count({
  //     where: {
  //       endTime: Not(IsNull()),
  //     },
  //   });
  //   return { data0, data1 };
  // }

  // async qian(dto: any): Promise<string> {
  //   const { id } = dto;

  //   const newData = {
  //     endTime: dayjs(new Date()).format(),
  //   };
  //   const saveInfo = await this.appointmentListRepository.update(
  //     { id: id },
  //     newData,
  //   );
  //   console.log(saveInfo);
  //   if (saveInfo != null) {
  //     return null;
  //   }
  //   return 'err';
  // }
}
