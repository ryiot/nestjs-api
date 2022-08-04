import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ReqLoginDto } from './dto/req-login.dto';
import { ResLoginDto } from './dto/res-login.dto';
import { SkipJwtAuth } from './jwt.constants';
import { LoginService } from './login.service';

@Controller()
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  /* 用户登录 */
  // @Post('login')
  // async login(@Body() reqLoginDto: ReqLoginDto): Promise<any> {
  //   const { loginMethod } = reqLoginDto;
  //   switch (loginMethod) {
  //     case '00':
  //       return await this.loginService.PcLogin(reqLoginDto);
  //     case '01':
  //       return await this.loginService.WxLogin(reqLoginDto);
  //     default:
  //       return null;
  //   }
  // }
  @SkipJwtAuth()
  @Post('login')
  async login(@Body() reqLoginDto: ReqLoginDto): Promise<any> {
    console.log(reqLoginDto);
    const { loginMethod } = reqLoginDto;
    if (loginMethod == 'pc') {
      return await this.loginService.PcLogin(reqLoginDto);
    }
    return { code: -1, message: '账号或密码错误！' };
  }

  /* 获取用户信息 */
  @Get('getUserInfo')
  async getUserInfo() {
    // return await this.loginService.getInfo(userId);
    return {
      code: 0,
      result: {
        userId: '1',
        username: 'vben',
        realName: '设备管理平台',
        avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
        desc: 'manager',
        password: '123456',
        token: 'fakeToken1',
        homePath: '/appointment/account',
        roles: [
          {
            roleName: 'Super Admin',
            value: 'super',
          },
        ],
      },
      message: 'success',
      type: 'success',
    };
  }

  @Get('getPermCode')
  async getPermCode() {
    // return await this.loginService.getInfo(userId);
    return {
      code: 0,
      result: ['1000', '3000', '5000'],
      message: 'success',
      type: 'success',
    };
  }

  @Get('getMenuList')
  async getMenuList() {
    // return await this.loginService.getInfo(userId);
    const dashboardRoute = {
      path: '/dashboard',
      name: 'Dashboard',
      component: 'LAYOUT',
      redirect: '/dashboard/analysis',
      meta: {
        title: 'routes.dashboard.dashboard',
        hideChildrenInMenu: true,
        icon: 'bx:bx-home',
      },
      children: [
        {
          path: 'analysis',
          name: 'Analysis',
          component: '/dashboard/analysis/index',
          meta: {
            hideMenu: true,
            hideBreadcrumb: true,
            title: 'routes.dashboard.analysis',
            currentActiveMenu: '/dashboard',
            icon: 'bx:bx-home',
          },
        },
        // {
        //   path: 'workbench',
        //   name: 'Workbench',
        //   component: '/dashboard/workbench/index',
        //   meta: {
        //     hideMenu: true,
        //     hideBreadcrumb: true,
        //     title: 'routes.dashboard.workbench',
        //     currentActiveMenu: '/dashboard',
        //     icon: 'bx:bx-home',
        //   },
        // },
      ],
    };

    const AccountRoute = {
      path: '/account',
      name: 'Account',
      component: 'LAYOUT',
      redirect: '/account/accountB',
      meta: {
        icon: 'ion:settings-outline',
        title: 'routes.myAccount.moduleName',
      },
      children: [
        {
          path: 'accountB',
          name: 'AccountBManagement',
          meta: {
            title: 'routes.myAccount.accountB',
            ignoreKeepAlive: true,
          },
          component: '/account/accountB/index',
        },
        {
          path: 'accountB_detail/:id',
          name: 'AccountBDetail',
          meta: {
            hideMenu: true,
            title: 'routes.myAccount.accountB_detail',
            ignoreKeepAlive: true,
            showMenu: false,
            currentActiveMenu: '/account/accountB',
          },
          component: '/account/accountB/AccountDetail',
        },
        // {
        //   path: 'accountC',
        //   name: 'AccountCManagement',
        //   meta: {
        //     title: 'routes.myAccount.accountC',
        //     ignoreKeepAlive: true,
        //   },
        //   component: '/system/account/accountC/index',
        // },
        // {
        //   path: 'accountC_detail/:id',
        //   name: 'AccountCDetail',
        //   meta: {
        //     hideMenu: true,
        //     title: 'routes.myAccount.accountC_detail',
        //     ignoreKeepAlive: true,
        //     showMenu: false,
        //     currentActiveMenu: '/system/account/accountC',
        //   },
        //   component: '/system/account/accountC/AccountDetail',
        // },
        // {
        //   path: 'accountD',
        //   name: 'AccountDManagement',
        //   meta: {
        //     title: 'routes.myAccount.accountD',
        //     ignoreKeepAlive: true,
        //   },
        //   component: '/system/account/accountD/index',
        // },
        // {
        //   path: 'accountD_detail/:id',
        //   name: 'AccountDDetail',
        //   meta: {
        //     hideMenu: true,
        //     title: 'routes.myAccount.accountD_detail',
        //     ignoreKeepAlive: true,
        //     showMenu: false,
        //     currentActiveMenu: '/system/account/accountD',
        //   },
        //   component: '/system/account/accountD/AccountDetail',
        // },
      ],
    };

    const ArticleRoute = {
      path: '/appointment',
      name: 'Appointment',
      component: 'LAYOUT',
      redirect: '/appointment/index',
      meta: {
        title: '预约设置',
        hideChildrenInMenu: true,
        icon: 'bx:bx-home',
      },
      children: [
        {
          path: 'index',
          name: 'AppointmentManagement',
          // meta: {
          //   title: 'routes.myAccount.accountB',
          //   ignoreKeepAlive: true,
          // },
          component: '/appointment/index',
          meta: {
            hideMenu: true,
            hideBreadcrumb: true,
            title: '预约设置',
            currentActiveMenu: '/appointment',
            icon: 'bx:bx-home',
          },
        },
      ],
    };

    const sysRoute = {
      path: '/system',
      name: 'System',
      component: 'LAYOUT',
      redirect: '/system/account',
      meta: {
        icon: 'ion:settings-outline',
        title: 'routes.demo.system.moduleName',
      },
      children: [
        {
          path: 'account',
          name: 'AccountManagement',
          meta: {
            title: 'routes.demo.system.account',
            ignoreKeepAlive: true,
          },
          component: '/system/account/index',
        },
        {
          path: 'account_detail/:id',
          name: 'AccountDetail',
          meta: {
            hideMenu: true,
            title: 'routes.demo.system.account_detail',
            ignoreKeepAlive: true,
            showMenu: false,
            currentActiveMenu: '/system/account',
          },
          component: '/system/account/AccountDetail',
        },
        {
          path: 'role',
          name: 'RoleManagement',
          meta: {
            title: 'routes.demo.system.role',
            ignoreKeepAlive: true,
          },
          component: '/system/role/index',
        },

        {
          path: 'menu',
          name: 'MenuManagement',
          meta: {
            title: 'routes.demo.system.menu',
            ignoreKeepAlive: true,
          },
          component: '/system/menu/index',
        },
        {
          path: 'dept',
          name: 'DeptManagement',
          meta: {
            title: 'routes.demo.system.dept',
            ignoreKeepAlive: true,
          },
          component: '/system/dept/index',
        },
        {
          path: 'changePassword',
          name: 'ChangePassword',
          meta: {
            title: 'routes.demo.system.password',
            ignoreKeepAlive: true,
          },
          component: '/system/password/index',
        },
      ],
    };

    const appointment = [
      {
        path: '/appointment/account',
        name: 'Account',
        component: 'LAYOUT',
        redirect: '/appointment/account/index',
        meta: {
          icon: 'ion:settings-outline',
          title: '账号管理',
          hideChildrenInMenu: true,
        },
        children: [
          {
            path: 'index',
            name: 'AccountManagement',
            meta: {
              title: '账号管理',
              ignoreKeepAlive: true,
            },
            component: '/appointment/account/index',
          },
          {
            path: 'account_detail/:id',
            name: 'AccountBDetail',
            meta: {
              hideMenu: true,
              title: 'routes.myAccount.accountB_detail',
              ignoreKeepAlive: true,
              showMenu: false,
              currentActiveMenu: '/appointment/account/index',
            },
            component: '/appointment/account/AccountDetail',
          },
        ],
      },
      {
        path: '/appointment/record',
        name: 'Record',
        component: 'LAYOUT',
        redirect: '/appointment/record/index',
        meta: {
          icon: 'ion:settings-outline',
          title: '预约记录',
          hideChildrenInMenu: true,
        },
        children: [
          {
            path: 'index',
            name: 'RecordManagement',
            meta: {
              title: '预约记录',
              ignoreKeepAlive: true,
            },
            component: '/appointment/record/index',
          },
        ],
      },
      {
        path: '/appointment/config',
        name: 'Config',
        component: 'LAYOUT',
        redirect: '/appointment/config/index',
        meta: {
          icon: 'ion:settings-outline',
          title: '预约设置',
          hideChildrenInMenu: true,
        },
        children: [
          {
            path: 'index',
            name: 'ConfigManagement',
            meta: {
              title: '预约设置',
              ignoreKeepAlive: true,
            },
            component: '/appointment/config/index',
          },
        ],
      },
    ];

    return {
      code: 0,
      // result: [dashboardRoute, 
      //   // sysRoute,
      //   ArticleRoute,
      //   AccountRoute,
      // ],
      result: appointment,
      message: 'success',
      type: 'success',
    };
  }
  // @Post('login')
  // async login(@Body() reqLoginDto: ReqLoginDto): Promise<any> {
  //   const { loginMethod } = reqLoginDto;
  //   if (loginMethod == '00') {
  //     console.log('loginMethod=', loginMethod);
  //     // return this.loginService.PcLogin(reqLoginDto);
  //     const result = await this.loginService.PcLogin(reqLoginDto);
  //     return { code: 0, result, message: 'msg' };
  //   }
  //   // console.log('loginMethod=', loginMethod);
  //   // return await this.loginService.login(req);
  //   return null;
  // }
}
