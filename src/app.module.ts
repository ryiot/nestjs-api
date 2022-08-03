import { Logger, Module } from '@nestjs/common';
import * as path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/system/user/user.module';
import { LoginModule } from './modules/system/login/login.module';
import { AccountModule } from './modules/system/account/account.module';
import { DeptModule } from './modules/system/dept/dept.module';
import { AreasModule } from './modules/system/areas/areas.module';
import { UploadModule } from './modules/upload/upload.module';

let configFilePath = path.resolve('.env.production');
if (process.env.NODE_ENV == 'development') {
  configFilePath = path.resolve('.env.development');
  console.log('development');
}

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: configFilePath,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_1_HOST', 'localhost'), // 主机，默认为localhost
        port: configService.get<number>('MYSQL_1_PORT', 3306),
        username: configService.get('MYSQL_1_USERNAME', 'root'),
        password: configService.get('MYSQL_1_PASSWORD', '12345678'),
        database: configService.get('MYSQL_1_DATABASE', ''),
        timezone: '+08:00',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('MYSQL_1_SYNCHRONIZE', true),
      }),
    }),
    UserModule,
    LoginModule,
    AccountModule,
    DeptModule,
    AreasModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [Logger, AppService],
})
export class AppModule {}
