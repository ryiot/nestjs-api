import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as dayjs from 'dayjs';
import * as randomstring from 'randomstring';
import * as fs from 'fs-extra';
import { SkipJwtAuth } from '../system/login/jwt.constants';
import { ConfigService } from '@nestjs/config';

@Controller('upload')
export class UploadController {
  constructor(private readonly configService: ConfigService) {}

  @SkipJwtAuth()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const uploadUrl = this.configService.get('UPLOAD_URL');
    const numStr = randomstring.generate({
      length: 10,
      charset: 'numeric',
    });
    const name =
      '/upload/' +
      dayjs().format('YYYYMMDDHHmmss') +
      numStr +
      '.' +
      file.originalname.split('.').pop();
    console.log('file=', uploadUrl + name);
    try {
      fs.outputFileSync('public' + name, file.buffer);
    } catch (err) {
      console.error(err);
      return {
        code: -1,
        errno: 1, // 只要不等于 0 就行
        message: '上传失败',
      };
    }
    // console.log('name=', name);
    console.log('file=', uploadUrl + name);
    return {
      code: 200,
      name: name,
      url: uploadUrl + name,
      errno: 0, // 注意：值是数字，不能是字符串
      data: {
        url: uploadUrl + name, // 图片 src ，必须
        // url: 'http://localhost:3000' + name, // 图片 src ，必须
        alt: 'yyy', // 图片描述文字，非必须
        href: 'zzz', // 图片的链接，非必须
      },
    };
    // return Result.success({ url: name });
  }
}
