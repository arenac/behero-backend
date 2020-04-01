import './bootstrap';

import express from 'express';
import cors from 'cors';
import Youch from 'youch';
import { Server } from 'http';
import 'express-async-errors';
import { errors } from 'celebrate';
import routes from './routes';

class App {
  constructor() {
    this.app = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();

    this.server = Server(this.app);
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(routes);
  }

  exceptionHandler() {
    // when express receives a middleware with four parameters, this means for it
    // a middleware to treat exeption
    this.app.use(errors());
    this.app.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
