import 'reflect-metadata';

import { Connection, createConnection, getConnectionOptions } from 'typeorm';

import { ApolloServer } from 'apollo-server-koa';
import GraphQLDatabaseLoader from '@mando75/typeorm-graphql-loader';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from './entity/User';
import koa from 'koa';
import koaBody from 'koa-bodyparser';
import koaRouter from 'koa-router';

const startServer = (connection: Connection) => {
  const app = new koa();
  const router = new koaRouter();

  app.use(koaBody());

  router.get('/health', (ctx: any) => {
    ctx.status = 200;
    ctx.body = { health: 'ok' };
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  const apollo = new ApolloServer({
    schema: '', // TODO:
    context: {
      loader: new GraphQLDatabaseLoader(connection, {}),
    },
  });

  apollo.applyMiddleware({ app });

  app.listen(process.env.HTTP_PORT || 3000);
};

const seed = async (connection) => {
  await connection.manager.save(
    connection.manager.create(User, {
      name: 'Timber',
      age: 27,
    })
  );
  await connection.manager.save(
    connection.manager.create(User, {
      name: 'Phantom',
      age: 24,
    })
  );
};

const apolloServer = new ApolloServer({
  schema,
  context: {
    loader: new GraphQLDatabaseLoader(connection, {
      /** additional options if needed**/
    }),
  },
});

const main = async (): Promise<Connection> => {
  const connectionOptions = Object.assign(await getConnectionOptions(), {
    namingStrategy: new SnakeNamingStrategy(),
  });
  const connection: Connection = await createConnection(connectionOptions);
  await startServer(connection);
  await seed(connection);
  return connection;
};

main().catch((error) => console.log(error));
