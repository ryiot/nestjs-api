import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateAreasDto } from './dto/areas.dto';
import { AreasEntity } from './entities/areas.entity';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(AreasEntity)
    private readonly areasRepository: Repository<AreasEntity>,
  ) {}

  async create(dto: CreateAreasDto): Promise<string> {
    console.log(dto);
    const saveInfo = await this.areasRepository.save(dto);
    if (saveInfo != null) {
      return null;
    }
    return 'err';
  }

  async areaRecord(dto: any): Promise<object> {
    const { sort, provinceCode, cityCode, parentCode } = dto;
    console.log(dto);
    let search = null;
    if (sort == 'province') {
      search = { provinceCode: IsNull() };
    }
    if (sort == 'city') {
      search = { provinceCode: provinceCode, cityCode: IsNull() };
    }
    if (sort == 'area') {
      search = { cityCode: cityCode };
    }
    if (parentCode) {
      if (parentCode == '') {
        search = { provinceCode: IsNull() };
      } else {
        search = { code: parentCode };
      }
    }

    const res = await this.areasRepository.find({ where: search });
    return res;
  }
}
