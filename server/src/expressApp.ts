
import express, {Application, NextFunction, Request, Response} from 'express';
import {Result} from 'express-validator';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import httpErrors from 'http-errors';
import {registerController} from './apiModules';


export class ExpressApp {
  public app: Application = express();

  constructor() {
    this.middleware();
    registerController(this.app);
    this.errorHendler();
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`server running on port ${port}`);
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
    const errorHandle = (
        err :httpErrors.HttpError | Result,
        req :Request,
        res:Response,
        next: NextFunction,
    ) => {
      console.log(err);

      if (err instanceof Result) {
        const err = httpErrors(400);
        res.status(err.statusCode);
        res.send(`${err.statusCode} ${err.message}`);
      } else if (err instanceof httpErrors.HttpError) {
        res.status(err.statusCode);
        res.send(`${err.statusCode} ${err.message}`);
      } else {
        const err = httpErrors(500);
        res.status(err.statusCode);
        res.send(`${err.statusCode} ${err.message}`);
      }
    };
    this.app.use(errorHandle);
  }
}
