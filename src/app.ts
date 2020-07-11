import 'dotenv/config';

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';

class App {
  server: Express;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares(): void {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes(): void {
    this.server.use(routes);
  }
}

export default new App().server;
