import { Logger, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('1');
    Logger.log('info1');
    Logger.error('err');
    Logger.debug('12info');
    return this.appService.getHello();
  }
}
