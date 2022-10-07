import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoticeEntity } from './entities/notice.entity';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(NoticeEntity)
    private NoticeRepository: Repository<NoticeEntity>,
  ) {}

  async create(user: any, body: any) {
    const { username } = user;
    console.log('user=',user);
    const {
      noticeTitle,
      video,
      noticeContent,
      noticeContent2,
      noticeType,
      status,
      remark,
    } = body;

    const Notice = new NoticeEntity();
    Notice.noticeTitle = noticeTitle;
    Notice.noticeContent = noticeContent;
    Notice.noticeType = noticeType;
    Notice.status = status;
    Notice.createBy = username;
    Notice.remark = remark;

    return await this.NoticeRepository.save(Notice);
  }

  async delete(ids: number[]) {
    return await this.NoticeRepository.delete(ids);
  }

  // 清空数据
  async clear() {
    await this.NoticeRepository.clear();
  }

  async update(body: any) {
    const {
      noticeId,
      noticeTitle,
      video,
      noticeContent,
      noticeContent2,
      noticeType,
      status,
      remark,
    } = body;

    const newData = {
      noticeTitle,
      video,
      noticeContent,
      noticeContent2,
      noticeType,
      status,
      remark,
    };

    return await this.NoticeRepository.update({ noticeId }, newData);
  }

  async findById(id: number) {
    const data = await this.NoticeRepository.findOne({ where: { noticeId: id } });
    // if (data) {

    // }
    return data;
  }

  async list(query: any) {
    console.log(query);
    const {
      pageNum,
      pageSize,
      noticeTitle,
      video,
      noticeContent,
      noticeContent2,
      noticeType,
      status,
      createBy,
      createTime,
      remark,
    } = query;

    // 搜索
    const search = {};

    if (noticeTitle != null && noticeTitle != '') {
      search['noticeTitle'] = noticeTitle;
    }
    if (noticeType != null && noticeType != '') {
      search['noticeType'] = noticeType;
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
    return await this.NoticeRepository.findAndCount({
      where: search,
      order: { noticeId: 'DESC' },
      skip: pageSizeValue * (pageNumValue - 1),
      take: pageSizeValue,
    });
  }
  
  async optionselect() {
    // 获取数据
    return await this.NoticeRepository.find();
  }
}
