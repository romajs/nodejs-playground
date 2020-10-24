const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const { compileQuery, isCompiledQuery } = require('graphql-jit');
const { parse } = require('graphql');
const bodyParser = require('body-parser');

var app = express();

const cache = {};

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.use(bodyParser.json());
app.use('/graphql-jit', async (req, res) => {
  try {
    const { query } = req.body;

    const document = parse(query);

    cache[query] = cache[query] || compileQuery(schema, document);

    if (!isCompiledQuery(cache[query])) {
      throw new Error('Error compiling query:', cache[query]);
    }

    const result = await cache[query].query();

    res.end(JSON.stringify(result));
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.listen(4000, () =>
  console.log('Now browse to http://localhost:4000/graphql')
);
