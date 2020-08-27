#!/usr/bin/env nodemon

const blocked = require('blocked')
const fibonacci = require('../src/algo/fibonacci')
const http = require('http')
const url = require('url')

console.log(`Master ${process.pid} is running`)

blocked(ms => {
  console.log(`Master ${process.pid} blocked for ${ms}ms`)
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
