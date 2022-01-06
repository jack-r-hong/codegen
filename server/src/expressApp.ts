
import express, {Application, Request, Response} from 'express';
import {Result} from 'express-validator';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import httpErrors from 'http-errors';
import {registerController} from './apiModules';

export class ExpressApp {
  private app: Application = express();
  private port: number = 4000;

  constructor() {
    this.middleware();
    registerController(this.app);
    this.errorHendler();
    this.listen();
  }

  private listen(): void {
    this.app.listen(this.port, () => {
      console.log(`server running on port ${this.port}`);
    });
  }

  private middleware(): void {
    const corsOptions: cors.CorsOptions = {
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
      ],
      credentials: true,
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      origin: '127.0.0.1',
      preflightContinue: false,
    };
    this.app.use(helmet());
    this.app.use(cors(corsOptions));
    this.app.use(compression());
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(bodyParser.json());
  }

  private errorHendler() {
    this.app.use((
        err :httpErrors.HttpError | Result,
        req :Request,
        res:Response,
    ) => {
      if (err instanceof Result) {
        const err = httpErrors(400);
        res.status(err.statusCode);
        res.send(`${err.statusCode} ${err.message}`);
      } else {
        res.status(err.statusCode);
        res.send(`${err.statusCode} ${err.message}`);
      }
    });
  }
}
