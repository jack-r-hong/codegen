
// eslint-disable-next-line no-unused-vars
import express, {Application, NextFunction, Request, Response} from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import {registerController} from './apiModules';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import {cookieAuthSession} from './sessions';
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import {redisLimiterClient as redisClient} from './redisClient';
import {errorHandle} from './errors';
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../other/swagger.json');

export class ExpressApp {
  public app: Application = express();

  constructor() {
    this.middleware();
    this.sessionRegister();
    registerController(this.app);
    this.app.use(errorHandle);
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
        'Access-Control-Allow-Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
        'Cookie',
        'Authorization',
        'X-Api-Key',
      ],
      // allowedHeaders: '*',
      // exposedHeaders: '*',
      exposedHeaders: [
        'date',
        'Set-Cookie',
        'Content-Type',
        // 'Authorization',
        // 'X-Api-Key',
      ],
      credentials: true,
      methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
      origin: [
        'https://192.168.10.119',
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'http://127.0.0.1',
        'http://localhost',
        `https://${process.env['HOSTNAME']}`,
        `https://${process.env['FRONT_END_HOST']}`,
      ],
      // origin: '*',
      preflightContinue: true,
      // preflightContinue: false,
    };


    this.app.use(helmet());
    this.app.use(cors(corsOptions));
    this.app.use(morgan('combined', {}));
    this.app.use('/uploads', express.static('./uploads'));
    // this.app.use('/api/', this._rateLimit());

    this.app.use(compression());
    this.app.use(cookieParser());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.app.use(bodyParser.json());
    this.app.use('/api/api-docs'
        , swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  private sessionRegister() {
    this.app.use(cookieAuthSession);
  }

  private _rateLimit() {
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
      store: new RedisStore({
        sendCommand: (...args: string[]) => redisClient.sendCommand(args),
      }),
    });

    return limiter;
  }
}
