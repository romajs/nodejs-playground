module.exports = {
  apps: [{
    script: `${__dirname}/mainThread.js`,
    instances: 'max',
    exec_mode: 'cluster',
  }],
};
