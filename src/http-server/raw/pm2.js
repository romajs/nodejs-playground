const config = require('./ecosystem.config');
const pm2 = require('pm2');

console.log('Connecting to pm2.');

pm2.connect(function (err) {
  if (err) {
    console.error(err);
    process.exit(2);
  }

  console.log(`Starting app with config: ${JSON.stringify(config)}`);

  pm2.start(config, function (err, apps) {
    pm2.disconnect();
    if (err) throw err;
  });
});
