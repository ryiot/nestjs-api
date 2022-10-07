module.exports = {
  apps: [
    {
      name: '7016-xaghyy.top',
      exec_mode: 'cluster',
      // instances: 'max', // Or a number of instances
      instances: '1', // Or a number of instances
      script: './dist/main.js',
      args: 'start',
    },
  ],
};
