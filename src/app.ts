import 'dotenv/config';

import express, { Express } from 'express';
import path from 'path';
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
    this.server.use('/images', express.static(path.resolve(__dirname, 'assets')));
  }

  routes(): void {
    this.server.use(routes);
  }
}

export default new App().server;
