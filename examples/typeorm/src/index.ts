import 'reflect-metadata';

import * as bodyParser from 'body-parser';

import { Connection, createConnection, getConnectionOptions } from 'typeorm';
import { Request, Response } from 'express';

import { Routes } from './routes';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from './entity/User';
import express from 'express';

const startServer = () => {
  // create express app
  const app = express();
  app.use(bodyParser.json());

  // register express routes from defined application routes
  Routes.forEach((route) => {
    (app as any)[route.method](
      route.route,
      (req: Request, res: Response, next: Function) => {
        const result = new (route.controller as any)()[route.action](
          req,
          res,
          next
        );
        if (result instanceof Promise) {
          result.then((result) =>
            result !== null && result !== undefined
              ? res.send(result)
              : undefined
          );
        } else if (result !== null && result !== undefined) {
          res.json(result);
        }
      }
    );
  });

  // setup express app here
  // ...

  // start express server
  app.listen(3000);

  console.log(
    'Express server has started on port 3000. Open http://localhost:3000/users to see results'
  );
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

const main = async (): Promise<Connection> => {
  const connectionOptions = Object.assign(await getConnectionOptions(), {
    namingStrategy: new SnakeNamingStrategy(),
  });
  const connection: Connection = await createConnection(connectionOptions);
  await startServer();
  await seed(connection);
  return connection;
};

main().catch((error) => console.log(error));
