import { Model } from 'objection';
import Portfolio from "./models/Portfolio";
import graphqlHTTP from 'koa-graphql';
import { knex } from "./db";
import koa from 'koa';
import koaBody from 'koa-bodyparser';
import koaRouter from 'koa-router';

const graphQlBuilder = require('objection-graphql').builder;

Model.bind(knex) // FIXME:

const graphQlSchema = graphQlBuilder()
  .allModels([Portfolio])
  .build();

const app = new koa();
const router = new koaRouter();
const PORT = 3000;

app.use(koaBody());

router.post('/graphql', graphqlHTTP({ schema: graphQlSchema, graphiql: true }));
router.get('/graphql', graphqlHTTP({ schema: graphQlSchema, graphiql: true }));

router.get('/health', (ctx: any) => {
  ctx.status = 200;
  ctx.body = { health: 'ok' };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT)
