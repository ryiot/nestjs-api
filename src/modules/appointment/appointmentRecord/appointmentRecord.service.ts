import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { IsNull, Like, Not, Repository } from 'typeorm';
import { AppointmentRecordEntity } from './entities/appointmentRecord.entity';

@Injectable()
export class AppointmentRecordService {
  constructor(
    @InjectRepository(AppointmentRecordEntity)
    private readonly appointmentRecordRepository: Repository<AppointmentRecordEntity>,
  ) {}

  async create(dto: any): Promise<any> {
    // console.log('add=', dto);
    const { name, sex, age, phone, union, IDcard, imgUrl, endTime } = dto;
    const myDate = new Date();
    const imgUrl1 = imgUrl[0];
    const imgUrl2 = imgUrl[1];
    const data = {
      name,
      sex,
      age,
      phone,
      union,
      IDcard,
      imgUrl1,
      imgUrl2,
      startTime: dayjs(myDate).format(),
      endTime,
    };
    const saveInfo = await this.appointmentRecordRepository.save(data);
    console.log(saveInfo);
    return saveInfo;
  }

  async delete(ids: number[]) {
    return await this.appointmentRecordRepository.delete(ids);
  }

  async update(dto: any): Promise<string> {
    const {
      id,
      name,
      sex,
      age,
      phone,
      union,
      IDcard,
      imgUrl,
      startTime,
      endTime,
    } = dto;

    const newData = {
      name,
      sex,
      age,
      phone,
      union,
      IDcard,
      imgUrl,
      startTime,
      endTime: dayjs(new Date()).format(),
    };
    const saveInfo = await this.appointmentRecordRepository.update(
      { id: id },
      newData,
    );
    console.log(saveInfo);
    if (saveInfo != null) {
      return null;
    }
    return 'err';
  }

  async updateIDcard(dto: any): Promise<string> {
    const {
      // id,
      name,
      sex,
      age,
      phone,
      union,
      IDcard,
      imgUrl,
      startTime,
      endTime,
    } = dto;

    const newData = {
      name,
      sex,
      age,
      phone,
      union,
      // IDcard,
      imgUrl,
      startTime,
      endTime: dayjs(new Date()).format(),
    };
    const saveInfo = await this.appointmentRecordRepository.update(
      { IDcard: IDcard },
      newData,
    );
    console.log(saveInfo);
    if (saveInfo != null) {
      return null;
    }
    return 'err';
  }

  async findById(id: number) {
    return await this.appointmentRecordRepository.findOne({
      where: { id: id },
    });
  }

  async findByName(name: string) {
    return await this.appointmentRecordRepository.findOne({
      where: { name: name },
    });
  }

  async findByIDcard(IDcard: string) {
    return await this.appointmentRecordRepository.findOne({
      where: { IDcard: IDcard },
    });
  }

  async list(dto: any) {
    console.log(dto);
    const {
      page,
      pageSize,
      name,
      sex,
      age,
      phone,
      union,
      IDcard,
      imgUrl,
      startTime,
      endTime,
    } = dto;

    // ????????????
    const search = {};

    if (name != null && name != '') {
      search['name'] = Like('%' + name + '%');
    }
    if (IDcard != null && IDcard != '') {
      search['IDcard'] = IDcard;
    }

    // ??????
    let pageNumValue = 1;
    let pageSizeValue = 3;
    if (page != null && page != '') {
      pageNumValue = page;
    }
    if (pageSize != null && pageSize != '') {
      pageSizeValue = pageSize;
    }

    // ????????????
    const data = await this.appointmentRecordRepository.findAndCount({
      where: search,
      order: { id: 'DESC' },
      skip: pageSizeValue * (pageNumValue - 1),
      take: pageSizeValue,
    });

    const list = data[0];
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      console.log('item=', item);
      const imgArr = [];
      if (item.imgUrl1 != null) {
        imgArr.push(item.imgUrl1);
      }
      if (item.imgUrl2 != null) {
        imgArr.push(item.imgUrl2);
      }
      list[i]['imgArr'] = imgArr;
    }
    data[0] = list;
    return data;
  }

  async excel() {
    const tableData = await this.appointmentRecordRepository.find({
      select: [
        'name',
        'sex',
        'age',
        'phone',
        'union',
        'IDcard',
        'imgUrl1',
        'imgUrl2',
        'startTime',
        'endTime',
      ],
    });
    // ??????
    tableData.unshift({
      id: null,
      startTime: '????????????',
      endTime: '????????????',
      name: '??????',
      sex: '??????',
      age: '??????',
      phone: '??????',
      union: '??????',
      IDcard: '?????????',
      imgUrl1: '????????????1',
      imgUrl2: '????????????2',
    });
    const fileName = await this.exportExcelFromData(tableData);
    // console.log('table=', table);
    // return table;
    return fileName;
    // return '';
  }
  /**
   * ??????????????? excel
   * @param array
   * @param sheetName
   * @returns {any}
   */
  async exportExcelFromData(array, sheetName = '????????????'): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // const dayjs = require('dayjs');
    const fileName =
      '/upload/????????????-' +
      dayjs().format('YYYY???MM???DD???HH???mm???ss???') +
      '.xlsx';
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const xlsx = require('xlsx');
    const jsonWorkSheet = xlsx.utils.json_to_sheet(array, {
      // header: ['id', 'type'], // ?????????????????????
      skipHeader: true, // ??????????????????????????????false?????????????????????
    });
    const workBook = {
      SheetNames: [sheetName],
      Sheets: {
        [sheetName]: jsonWorkSheet,
      },
    };
    xlsx.writeFile(workBook, 'public/' + fileName);
    // return xlsx.write(workBook, { type: 'binary' });
    return fileName;
  }

  async count() {
    const data0 = await this.appointmentRecordRepository.count({
      where: {},
    });
    const data1 = await this.appointmentRecordRepository.count({
      where: {
        endTime: Not(IsNull()),
      },
    });
    return { data0, data1 };
  }

  async qian(dto: any): Promise<string> {
    const { id } = dto;

    const newData = {
      endTime: dayjs(new Date()).format(),
    };
    const saveInfo = await this.appointmentRecordRepository.update(
      { id: id },
      newData,
    );
    console.log(saveInfo);
    if (saveInfo != null) {
      return null;
    }
    return 'err';
  }
}
