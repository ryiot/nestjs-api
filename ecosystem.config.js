module.exports = {
  apps: [
    {
      name: '7013-iot1.5gnb.cn',
      exec_mode: 'cluster',
      // instances: 'max', // Or a number of instances
      instances: '1', // Or a number of instances
      script: './dist/main.js',
      args: 'start',
    },
  ],
};
