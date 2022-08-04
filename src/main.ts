import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { WinstonModule } from 'nest-winston';
import * as path from 'path';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
// import * as history from 'connect-history-api-fallback';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { TransformInterceptor } from './common/filters/transform.interceptor';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bodyParser = require('body-parser');
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('body-parser-xml')(bodyParser);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(
          (i) =>
            `{"l": "${i.level}", "t": "${[i.timestamp]}", "c": "${[
              i.context,
            ]}", "m": "${[i.message]}"}`,
        ),
      ),
      transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
          level: 'error', // 要记录的消息级别。0：error 1：warn 2：info 3：verbose 4：debug 5：silly
          dirname: path.resolve('./logs'),
          filename: '%DATE%_error.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '14d',
        }),
        new DailyRotateFile({
          level: 'info',
          dirname: path.resolve('./logs'),
          filename: '%DATE%_info.log',
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '14d',
        }),
      ],
    }),
  });
  const configService = app.get(ConfigService);
  const port = configService.get('APP_PORT');

  /* 启动 vue 的 history模式 */
  // app.use(
  //   history({
  //     // index: '/index.html',
  //     rewrites: [
  //       {
  //         from: /^\/1\/.*$/,
  //         to: function (context: { parsedUrl: { pathname: any } }) {
  //           console.log('1');
  //           return context.parsedUrl.pathname;
  //         },
  //       },
  //       {
  //         from: /^\/www\/.*$/,
  //         to: function (context: { parsedUrl: { pathname: any } }) {
  //           console.log('www=',context.parsedUrl.pathname);
  //           return context.parsedUrl.pathname;
  //         },
  //       },
  //       // {
  //       //   from: /^\/admin\//,
  //       //   to: '/admin/',
  //       // },
  //     ],
  //   }),
  // );

  /* 配置静态资源目录 */
  app.useStaticAssets(path.join(__dirname, '../', 'public'));

  /* 全局异常过滤器 */
  app.useGlobalFilters(new AllExceptionsFilter()); // 全局异常过滤器
  app.useGlobalInterceptors(new TransformInterceptor());

  /* 全局参数校验管道 */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 启用白名单，dto中没有声明的属性自动过滤
      transform: true, // 自动类型转换
    }),
  );

  /* xml */
  app.use(
    bodyParser.xml({
      xmlParseOptions: {
        explicitArray: false, // 始终返回数组。默认情况下只有数组元素数量大于 1 是才返回数组。
      },
    }),
  );

  // app.setGlobalPrefix('api'); // 全局 base url

  await app.listen(port);

  console.log('http://localhost:%s', port);
}
bootstrap();
