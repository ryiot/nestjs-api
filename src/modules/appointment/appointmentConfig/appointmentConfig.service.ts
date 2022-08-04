import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { AppointmentConfigEntity } from './entities/appointmentConfig.entity';

@Injectable()
export class AppointmentConfigService {
  constructor(
    @InjectRepository(AppointmentConfigEntity)
    private readonly appointmentConfigRepository: Repository<AppointmentConfigEntity>,
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
    const saveInfo = await this.appointmentConfigRepository.save(data);
    console.log(saveInfo);
    if (saveInfo != null) {
      return null;
    }
    return 'err';
  }

  async delete(ids: number[]) {
    return await this.appointmentConfigRepository.delete(ids);
  }

  async update(dto: any): Promise<string> {
    const { id, imgUrl, content, startTime, endTime } = dto;

    const newData = {
      imgUrl,
      content,
      startTime,
      endTime,
    };
    const saveInfo = await this.appointmentConfigRepository.update(
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
    return await this.appointmentConfigRepository.findOne({
      where: { id: id },
    });
  }
}
