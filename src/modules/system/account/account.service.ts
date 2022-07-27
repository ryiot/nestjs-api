import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/account.dto';
import { AccountEntity } from './entities/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async create(dto: CreateAccountDto): Promise<string> {
    console.log(dto);
    const saveInfo = await this.accountRepository.save(dto);
    if (saveInfo != null) {
      return null;
    }
    return 'err';
  }

  async list(dto: any): Promise<object> {
    console.log(dto);
    const listInfo = await this.accountRepository.findAndCount();
    if (listInfo == null) {
      return null;
    }
    return listInfo;
  }
}
