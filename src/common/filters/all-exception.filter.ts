/*
 * @Author: jack
 * @Date: 2022-07-13 01:20:00
 * @LastEditTime: 2022-07-13 01:20:00
 * @LastEditors: jack
 * @Description: 全局错误拦截器
 * @FilePath: \meimei\src\common\filters\all-exception.filter.ts
 */

import {
  Logger,
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiException } from '../exceptions/api.exception';
import * as path from 'path';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const url = request.originalUrl;
    const method = request.method;
    let username = '游客';
    if (request.user) {
      username = request.user.username;
    }

    const { status, result } = this.errorResult(
      exception,
      url,
      method,
      username,
    );
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.status(status).json(result);
    // if (status == 404) {
    //   response.header('Content-Type', 'text/html');
    //   let isAdmin = false;
    //   if (url) {
    //     const re = /^\/admin\//;
    //     const result = url.match(re);
    //     if (result != null) {
    //       isAdmin = true;
    //     }
    //   }
    //   if (isAdmin) {
    //     response.status(200).sendFile(path.resolve('public/admin/index.html'));
    //   } else {
    //     response.status(200).sendFile(path.resolve('public/www/index.html'));
    //   }
    // } else {
    //   response.header('Content-Type', 'application/json; charset=utf-8');
    //   response.status(status).json(result);
    // }
  }

  /* 解析错误类型，获取状态码和返回值 */
  errorResult(
    exception: unknown,
    url: string,
    method: string,
    username: string,
  ) {
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const code =
      exception instanceof ApiException
        ? (exception as ApiException).getErrCode()
        : status;
    let message: string;
    if (exception instanceof HttpException) {
      const response = exception.getResponse();
      message = (response as any).message ?? response;
    } else {
      message = `${exception}`;
    }
    // 自定义异常格式体
    const format = {
      code: code,
      url: url,
      method: method,
      status: code,
      username: username,
      message: message,
    };
    const logFormat = JSON.stringify(format);
    Logger.error(logFormat);
    return {
      status: 200,
      result: format,
    };
  }
}
