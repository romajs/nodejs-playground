#!/usr/bin/env nodemon

const cluster = require('cluster')
const http = require('http')
const blocked = require('blocked')
const url = require('url')
const fibonacci = require('../src/algo/fibonacci')
const { argv } = require('yargs')

const cpus = require('os').cpus().length
const numCPUs = argv.cpus || cpus

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`, { numCPUs })

  blocked(ms => {
    console.log(`Master ${process.pid} blocked for ${ms}ms`)
  })

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died.`)
  })
} else {
  blocked(ms => {
    console.log(`Worker ${process.pid} blocked for ${ms}ms`)
  })
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    console.log(`Responding from ${process.pid} at ${req.url}`)
    // eslint-disable-next-line node/no-deprecated-api
    const { query } = url.parse(req.url, true)
    const result = fibonacci(parseInt(query.n, 10))
    res.writeHead(200)
    res.end(`Hello World from ${process.pid} with result = ${result}.`)
  }).listen(8000)

  console.log(`Worker ${process.pid} started.`)
}
