import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { WebsiteConfigEntity } from './entities/websiteConfig.entity';

@Injectable()
export class WebsiteConfigService {
  constructor(
    @InjectRepository(WebsiteConfigEntity)
    private readonly websiteConfigRepository: Repository<WebsiteConfigEntity>,
  ) {}

  async create(dto: any): Promise<string> {
    // console.log('add=', dto);
    const { imgUrl, content, startTime, endTime } = dto;

    const data = {
      imgUrl,
      content,
      startTime,
      endTime,
    };
    const saveInfo = await this.websiteConfigRepository.save(data);
    console.log(saveInfo);
    if (saveInfo != null) {
      return null;
    }
    return 'err';
  }

  async delete(ids: number[]) {
    return await this.websiteConfigRepository.delete(ids);
  }

  async update(dto: any): Promise<string> {
    const { id, imgUrl, content, startTime, endTime } = dto;

    const newData = {
      imgUrl,
      content,
      startTime,
      endTime,
    };
    const saveInfo = await this.websiteConfigRepository.update(
      { id: id },
      newData,
    );
    console.log(saveInfo);
    if (saveInfo != null) {
      return null;
    }
    return 'err';
  }

  async findById(id: number) {
    return await this.websiteConfigRepository.findOne({
      where: { id: id },
    });
  }
}
