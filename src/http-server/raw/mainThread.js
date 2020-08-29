const { argv } = require('yargs');
const blocked = require('blocked');
const { memoized: fibonacci } = require('../../algo/fibonacci');
const http = require('http');
const url = require('url');

const port = argv.port || 8000;

console.log(`[pid=${process.pid}] Server is running at ${port}.`);

blocked(ms => {
  console.log(`[pid=${process.pid}] blocked for ${ms}ms.`);
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
