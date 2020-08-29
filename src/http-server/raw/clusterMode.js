const { argv } = require('yargs');
const blocked = require('blocked');
const cluster = require('cluster');
const { memoized: fibonacci } = require('../../algo/fibonacci');
const http = require('http');
const url = require('url');

const numCPUs = argv.cpus || require('os').cpus().length;
const port = argv.port || 8000;

if (cluster.isMaster) {
  console.log(`[pid=${process.pid}] Master is running.`, { numCPUs });

  blocked(ms => {
    console.log(`[pid=${process.pid}] Master in blocked for ${ms}ms.`);
  });

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`[pid=${process.pid}] Worker died, code=${code} signal=${signal}.`);
  });
} else {
  blocked(ms => {
    console.log(`[pid=${process.pid}] Worker blocked for ${ms}ms.`);
  });
  http.createServer((req, res) => {
    console.log(`[pid=${process.pid}] Request url=${req.url}.`);
    // eslint-disable-next-line node/no-deprecated-api
    const { query } = url.parse(req.url, true);
    const result = fibonacci(parseInt(query.n, 10));
    res.writeHead(200);
    res.end(`[pid=${process.pid}] Responded with result = ${result}.`);
    console.log(`[pid=${process.pid}] Response url=${req.url}, result=${result}.`);
  }).listen(port);

  console.log(`[pid=${process.pid}] Server started at ${port}.`);
}
