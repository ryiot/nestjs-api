import {
  Logger,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs'; // 处理时间的工具
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const requestIp = require('request-ip');
// import axios from 'axios';

// 参考 https://tuture.co/2020/05/12/@uXOOfFmhS/
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const req = context.getArgByIndex(1).req;
    // const clientIp = requestIp.getClientIp(req);

    // const url =
    //   'https://apis.map.qq.com/ws/location/v1/ip?key=6NABZ-IGQE2-WPTUC-CFO4A-PRVFJ-UEFOA&ip=' +
    //   `${clientIp}`;
    // const response = await axios.get(url);
    // const res = response.data;
    // console.log(res);
    // let ad_info: any;
    // if (res.status == 0) {
    //   ad_info = res.result.ad_info;
    // } else {
    //   ad_info = res.message;
    // }

    // const time = Moment().format('YYYY-MM-DD hh:mm:ss');
    const logFormat = JSON.stringify({
      // IP: clientIp,
      // ad_info: ad_info,
      req_url: req.originalUrl,
      req_method: req.method,
      parmas: req.params,
      query: req.query,
      body: req.body,
    });
    Logger.log(logFormat);
    return next.handle().pipe(
      map((data) => {
        let username = '游客';
        if (req.user) {
          username = req.user.username;
        }
        const logFormat = JSON.stringify({
          // IP: clientIp,
          // user: `${req.user}`,
          // userId: `${req.user.userId}`,
          // username: `${req.user.username}`,
          // res_time: `${time}`,
          res_url: req.originalUrl,
          res_method: req.method,
          res_username: username,
          // res_method: req.method,
          res_data: data,
        });
        Logger.log(logFormat);
        return data;
      }),
    );
  }
}
