import { Controller, Get } from '@nestjs/common';

@Controller('system')
export class DeptController {
  @Get('getDeptList')
  async getDeptList() {
    const deptList = (() => {
      const result: any[] = [];
      for (let index = 0; index < 3; index++) {
        result.push({
          id: `${index}`,
          deptName: ['华东分部', '华南分部', '西北分部'][index],
          orderNo: index + 1,
          createTime: '@datetime',
          remark: '@cword(10,20)',
          'status|1': ['0', '0', '1'],
          children: (() => {
            const children: any[] = [];
            for (let j = 0; j < 4; j++) {
              children.push({
                id: `${index}-${j}`,
                deptName: ['研发部', '市场部', '商务部', '财务部'][j],
                orderNo: j + 1,
                createTime: '@datetime',
                remark: '@cword(10,20)',
                'status|1': ['0', '1'],
                parentDept: `${index}`,
                children: [
                  {
                    id: '0-0',
                    deptName: '研发部',
                    orderNo: 1,
                    createTime: '@datetime',
                    remark: '@cword(10,20)',
                    'status|1': ['0', '1'],
                    parentDept: '0',
                  },
                ],
              });
            }
            return children;
          })(),
        });
      }
      return result;
    })();
    console.log(deptList);
    return {
      code: 0,
      result: deptList,
      message: 'success',
      type: 'success',
    };
  }
}
