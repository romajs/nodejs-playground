/*
Create an express api that:

Has one express route GET /latest-news

It should retrieve latest news from https://newsapi.org/docs/endpoints/top-headlines endpoint

Retrieved data should be stored in local cache for 20 seconds. If /latest-news api endpoint is called in the span of 20 seconds,
cached data should be returned to prevent hitting Newsapi constantly. Every time cache is hit we should log "cache hit"
Every time cache is missed we should log "cache miss"

/latest-news endpoint should have middle-ware that only allows requests that have "api-key" header set, with value “123”. If
header is not present, we should return 400 response with message “Not permitted to access this data"

Timeframe expected for this task is 30mins
*/

const { argv } = require('yargs');
const axios = require('axios');
const express = require('express');
const querystring = require('querystring');

const config = Object.freeze({
  auth: Object.freeze({
    apiKey: argv.authApiKey || '123',
    headerName: argv.authHeaderName || 'api-key',
  }),
  cache: Object.freeze({
    timeout: argv.cacheTimeout || 2000,
  }),
  newsApi: Object.freeze({
    apiKey: argv.newsApiKey || '594260c419da46e1b07decf54890e883',
    url: argv.newsApiUrl || 'https://newsapi.org',
  }),
  port: argv.port || 8000,
});

const app = express();

const buildService = ({ apiKey, url }) => {
  const instance = axios.create({
    baseURL: url,
  });

  instance.interceptors.response.use((response) => {
    return response.status === 200 && response.headers['content-type'].match(/application\/json/) ? response.data : response;
  });

  return Object.freeze({
    getTopHeadlines (country) {
      const url = `/v2/top-headlines?${querystring.stringify({ country, apiKey })}`;
      return instance.get(url);
    },
  });
};

const buildCache = ({ timeout }) => {
  const cache = {
    interval: undefined,
    data: undefined,
  };
  return (handler) => async (req, res, next) => {
    if (cache.data) {
      console.log('cache hit.');
      return res.json(cache.data);
    }
    console.log('cache miss');
    cache.interval = setTimeout(() => {
      clearInterval(cache.interval);
      cache.data = undefined;
    }, timeout);
    cache.data = await handler(req, res, next);
  };
};

const cache = buildCache(config.cache);
const service = buildService(config.newsApi);

const authMiddleware = ({ apiKey, headerName }) => (req, res, next) => {
  if (req.headers[headerName] !== apiKey) {
    return res.status(400).send('Not permitted to access this data');
  }
  return next();
};

app.use(authMiddleware(config.auth));

app.get('/', cache(async (_, res) => {
  const data = await service.getTopHeadlines('US');
  res.json(data);
  return data;
}));

app.listen(config.port, () => {
  console.log(`App listening on ${config.port}.`);
});
