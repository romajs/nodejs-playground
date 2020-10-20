import { ApolloServer } from 'apollo-server-koa'
import Company from './models/Company';
import Invoice from './models/Invoice';
import { Model } from 'objection';
import Portfolio from "./models/Portfolio";
import { knex } from "./db";
import koa from 'koa';
import koaBody from 'koa-bodyparser';
import koaRouter from 'koa-router';

const graphQlBuilder = require('objection-graphql').builder;

Model.bind(knex) // FIXME:

const graphQlSchema = graphQlBuilder()
  .allModels([Company, Invoice, Portfolio])
  .build();

const app = new koa();
const router = new koaRouter();
const PORT = 3000;

app.use(koaBody());

router.get('/health', (ctx: any) => {
  ctx.status = 200;
  ctx.body = { health: 'ok' };
});

app.use(router.routes());
app.use(router.allowedMethods());

const apollo = new ApolloServer({
  schema: graphQlSchema
})

apollo.applyMiddleware({ app });

app.listen(PORT)
