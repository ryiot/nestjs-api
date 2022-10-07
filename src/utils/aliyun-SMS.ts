// // This file is auto-generated, don't edit it
// import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525';
// // 依赖的模块可通过下载工程中的模块依赖文件或右上角的获取 SDK 依赖信息查看
// import OpenApi, * as $OpenApi from '@alicloud/openapi-client';
// import * as $tea from '@alicloud/tea-typescript';

// export default class Client {
//   /**
//    * 使用AK&SK初始化账号Client
//    * @param accessKeyId
//    * @param accessKeySecret
//    * @return Client
//    * @throws Exception
//    */
//   static createClient(
//     accessKeyId: string,
//     accessKeySecret: string,
//   ): Dysmsapi20170525 {
//     const config = new $OpenApi.Config({
//       // 您的AccessKey ID
//       accessKeyId: accessKeyId,
//       // 您的AccessKey Secret
//       accessKeySecret: accessKeySecret,
//     });
//     // 访问的域名
//     config.endpoint = `dysmsapi.aliyuncs.com`;
//     return new Dysmsapi20170525(config);
//   }

//   static async main(args: string[]): Promise<void> {
//     const client = Client.createClient('accessKeyId', 'accessKeySecret');
//     const sendSmsRequest = new $Dysmsapi20170525.SendSmsRequest({
//       phoneNumbers: '17793640315',
//       signName: '奈飞火猫',
//       templateParam: '{"code":"123456"}',
//       templateCode: 'SMS_238157137',
//     });
//     // 复制代码运行请自行打印 API 的返回值
//     await client.sendSms(sendSmsRequest);
//   }

//   // 发送短信验证码
//   static async sendCode(args: any): Promise<any> {
//     const { mobile, code } = args;
//     const accessKeyId = 'LTAI5tCHruHp58YNJ7mvSCqT';
//     const accessKeySecret = 'PlsZUKAa8l43lUjBuuChqCU8XlumgO';
//     const client = Client.createClient(accessKeyId, accessKeySecret);
//     const sendSmsRequest = new $Dysmsapi20170525.SendSmsRequest({
//       phoneNumbers: mobile,
//       signName: '奈飞火猫',
//       templateParam: `{"code":"${code}"}`,
//       templateCode: 'SMS_238157137',
//     });
//     // 复制代码运行请自行打印 API 的返回值
//     return await client.sendSms(sendSmsRequest);
//   }
// }

// // Client.main(process.argv.slice(2));
