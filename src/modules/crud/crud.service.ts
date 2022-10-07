import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, DataSource } from 'typeorm';
import { CreateCrudDto } from './dto/create-crud.dto';
import { UpdateCrudDto } from './dto/update-crud.dto';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs-extra');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ejs = require('ejs');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require('mysql2/promise');

@Injectable()
export class CrudService {
  constructor(private readonly configService: ConfigService) {}

  create(createCrudDto: CreateCrudDto) {
    return 'This action adds a new crud';
  }

  findAll() {
    // const data = await Repository.findAndCount();
    return `This action returns all crud`;
  }

  findOne(id: number) {
    return `This action returns a #${id} crud`;
  }

  update(id: number, updateCrudDto: UpdateCrudDto) {
    return `This action updates a #${id} crud`;
  }

  remove(id: number) {
    return `This action removes a #${id} crud`;
  }

  async findTableAll() {
    const connection = await mysql.createConnection({
      host: this.configService.get('MYSQL_1_HOST', 'localhost'), // 主机，默认为localhost
      port: this.configService.get<number>('MYSQL_1_PORT', 3306),
      user: this.configService.get('MYSQL_1_USERNAME', 'root'),
      password: this.configService.get('MYSQL_1_PASSWORD', '12345678'),
      database: this.configService.get('MYSQL_1_DATABASE', ''),
      multipleStatements: true,
    });

    const res = await connection.execute(
      `select table_name from information_schema.tables where table_schema='${this.configService.get(
        'MYSQL_1_DATABASE',
        '',
      )}'`,
    );

    console.log('table_name_list=', res[0]);

    return `This action returns all crud`;
  }

  async findTableInfoAll() {
    const tableName = 'user';

    const connection = await mysql.createConnection({
      host: this.configService.get('MYSQL_1_HOST', 'localhost'), // 主机，默认为localhost
      port: this.configService.get<number>('MYSQL_1_PORT', 3306),
      user: this.configService.get('MYSQL_1_USERNAME', 'root'),
      password: this.configService.get('MYSQL_1_PASSWORD', '12345678'),
      database: this.configService.get('MYSQL_1_DATABASE', ''),
      multipleStatements: true,
    });

    // const res = await connection.execute(
    //   `SELECT
    //   -- TABLE_NAME Tables,
    //   COLUMN_NAME 字段,
    //   COLUMN_TYPE 类型,
    //   CHARACTER_MAXIMUM_LENGTH  长度,
    //   IS_NULLABLE 是否为空,
    //   COLUMN_DEFAULT 默认值,
    //   COLUMN_COMMENT 字段说明
    //   FROM
    //   INFORMATION_SCHEMA.COLUMNS
    //   where
    //   TABLE_SCHEMA='${this.configService.get('MYSQL_1_DATABASE', '')}'
    //   AND
    //   TABLE_NAME = ('user')`,
    // );

    const table = await connection.execute(
      `SELECT
      -- TABLE_NAME Tables,
      COLUMN_NAME,
      COLUMN_TYPE,
      CHARACTER_MAXIMUM_LENGTH,
      IS_NULLABLE,
      COLUMN_DEFAULT,
      COLUMN_COMMENT,
      COLUMN_KEY
      FROM
      INFORMATION_SCHEMA.COLUMNS
      where 
      TABLE_SCHEMA='${this.configService.get('MYSQL_1_DATABASE', '')}'
      AND
      TABLE_NAME = ('${tableName}')`,
    );
    const tableList = table[0];
    const tableNameArr = tableName.split('_');
    for (let i = 0; i < tableNameArr.length; i++) {
      tableNameArr[i] =
        tableNameArr[i].charAt(0).toUpperCase() + tableNameArr[i].slice(1);
    }
    const tableNameStr = tableNameArr.join('');

    const list = [];
    let key = {};
    for (let i = 0; i < tableList.length; i++) {
      const column_name = tableList[i].COLUMN_NAME;
      if (
        column_name != 'create_time' &&
        column_name != 'update_time' &&
        column_name != 'delete_time' &&
        column_name != 'create_by' &&
        column_name != 'update_by' &&
        column_name != 'remark'
      ) {
        const strArr = column_name.split('_');
        for (let j = 0; j < strArr.length; j++) {
          if (j > 0) {
            strArr[j] = strArr[j].charAt(0).toUpperCase() + strArr[j].slice(1);
          }
        }
        const name = strArr.join('');
        if (tableList[i].COLUMN_KEY == 'PRI') {
          key = {
            type: tableList[i].COLUMN_TYPE.replace(/\([0-9]+\)/, ''),
            columnName: column_name,
            length: tableList[i].CHARACTER_MAXIMUM_LENGTH,
            default: tableList[i].COLUMN_DEFAULT,
            comment: tableList[i].COLUMN_COMMENT,
            name: name,
          };
        } else {
          const data = {
            type: tableList[i].COLUMN_TYPE.replace(/\([0-9]+\)/, ''),
            columnName: column_name,
            length: tableList[i].CHARACTER_MAXIMUM_LENGTH,
            default: tableList[i].COLUMN_DEFAULT,
            comment: tableList[i].COLUMN_COMMENT,
            name: name,
          };
          list.push(data);
        }
      }
    }

    // console.log('list[0]=', tableList);
    // console.log('list=', list);

    const fileEntity = fs.readFileSync(
      path.resolve('public/crud/entities/crud.entity.ejs'),
      'utf-8',
    );

    const html = ejs.render(fileEntity, {
      tableName: tableName,
      tableNameStr: tableNameStr,
      key: key,
      list: list,
    });
    // console.log('html=', html);
    const fileName = tableName.replace(/_/, '-');
    const filePath = path.resolve(
      `public/crud-m/${fileName}/entities/${fileName}.entity.ts`,
    );
    fs.outputFileSync(filePath, html);

    return `This action returns all crud`;
  }
}
