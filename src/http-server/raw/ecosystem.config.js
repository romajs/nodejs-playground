module.exports = {
  apps: [{
    script: 'mainThread.js',
    instances: 'max',
    exec_mode: 'cluster',
  }],
};
