import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SkipJwtAuth } from '../system/login/jwt.constants';
import { CrudService } from './crud.service';
import { CreateCrudDto } from './dto/create-crud.dto';
import { UpdateCrudDto } from './dto/update-crud.dto';

@SkipJwtAuth()
@Controller('crud')
export class CrudController {
  constructor(private readonly crudService: CrudService) {}

  @Post()
  create(@Body() createCrudDto: CreateCrudDto) {
    return this.crudService.create(createCrudDto);
  }

  @Get()
  findAll() {
    return this.crudService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const isNumber = /^\d+$/.test(id);
    if (isNumber) {
      // const data = await this.dictDataService.findById(+id);
      // if (data == null) {
      //   return { code: 1000, msg: '暂无数据' };
      // }
      return { code: 200, msg: '操作成功', data: 'data' };
    } else if (id == 'tableInfo') {
      await this.crudService.findTableInfoAll();
    } else if (id == 'table') {
      console.log('table');
      await this.crudService.findTableAll();
      return { code: 404, table: 'table' };
      // const data = await this.dictDataService.list(query);
      // if (data == null) {
      //   return { code: 1000, msg: '暂无数据' };
      // }
      // return { code: 200, msg: '操作成功', rows: data[0], total: data[1] };
    }
    return { code: 404 };
    // return this.crudService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCrudDto: UpdateCrudDto) {
    return this.crudService.update(+id, updateCrudDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crudService.remove(+id);
  }
}
