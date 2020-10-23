import { ApolloServer } from 'apollo-server-koa';
import { Model } from 'objection';
import { buildSchema } from './schema';
import { knex } from './db';
import koa from 'koa';
import koaBody from 'koa-bodyparser';
import koaRouter from 'koa-router';

Model.bind(knex); // FIXME:

const app = new koa();
const router = new koaRouter();

app.use(koaBody());

router.get('/health', (ctx: any) => {
  ctx.status = 200;
  ctx.body = { health: 'ok' };
});

app.use(router.routes());
app.use(router.allowedMethods());

const apollo = new ApolloServer({ schema: buildSchema() });

apollo.applyMiddleware({ app });

app.listen(process.env.HTTP_PORT || 3000);
