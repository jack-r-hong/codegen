import {Application, Request,
  Response, Router, RequestHandler, NextFunction, IRouterMatcher}
  from 'express';
import {Service, Container, Inject, Token} from 'typedi';
import {checkSchema, Schema, validationResult} from 'express-validator';
import multer from 'multer';
import {v1 as uuidv1} from 'uuid';

import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import {redisLimiterClient as redisClient} from '../redisClient';

const subRouter = Router();

export const ControllerToken = new Token<Controller>('ControllerToken');

export enum ExpressMethod{
  Get='get',
  Post='post',
  Put='put',
  Delete='delete',
}

type ExpressHttpMethods = {[_key in keyof typeof ExpressMethod]: Function }

export interface Controller {
  appUse: AppUse;
}

@Service('app.use')
export class AppUse {
  constructor() {}

  use(app: Application) {
    app.use('/api', subRouter);
  }
}

@Service()
class DecoratorHander {
  private static _instance: DecoratorHander;
  private _keys: Symbol[]= [];

  private constructor() {}

  public get keys() {
    return this._keys;
  }

  public static getInstance = (): DecoratorHander => {
    if (!DecoratorHander._instance) {
      DecoratorHander._instance = new DecoratorHander();
    }

    return DecoratorHander._instance;
  };

  public expressMethodDecoratorFactory(method :ExpressMethod, path :string) {
    return (target: any, propertyKey:any, descriptor: PropertyDescriptor) => {
      const middlewares: RequestHandler[] = [];

      this._keys.forEach((key) => {
        if (Reflect.hasOwnMetadata(key, target, propertyKey)) {
          const middleware = Reflect.getMetadata(
              key, target, propertyKey);
          middlewares.push(middleware);
        }
      });


      subRouter[method](path, middlewares, bedRequestHandler, descriptor.value);
      return descriptor;
    };
  }

  public middlewareDecoratorFactory(key: string, middleware: any) {
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) => {
      const keySymbol = Symbol(key);
      if (!Reflect.hasOwnMetadata(keySymbol, target, propertyKey)) {
        this._keys.push(keySymbol);
        Reflect.defineMetadata(
            keySymbol, middleware,
            target, propertyKey,
        );
      }
    };
  }

  public exportMethod(): ExpressHttpMethods {
    const methods: any = {};

    // Container.get(DecoratorHander.getInstance());

    for (const method in ExpressMethod) {
      if ( typeof method as keyof typeof ExpressMethod) {
        methods[method] = function(path: string) {
          return DecoratorHander._instance.expressMethodDecoratorFactory(
              ExpressMethod[method as keyof typeof ExpressMethod], path,
          );
        };
      }
    }

    return methods;
  }
}
@Service()
class MiddlewareDecorator {
  private _decoratorHander;
  constructor() {
    this._decoratorHander = DecoratorHander.getInstance();
  }

  @Inject()
    decoratorHander!: DecoratorHander;

  Validator = (schema: Schema) => {
    return this._decoratorHander.middlewareDecoratorFactory(
        'validator', checkSchema(schema),
    );
  };

  limiter = (minutes = 15, max = 100) => {
    const limit = rateLimit({
      windowMs: minutes * 60 * 1000, // 15 minutes
      max,
      standardHeaders: true,
      legacyHeaders: false,
      store: new RedisStore({
        sendCommand: (...args: string[]) => redisClient.sendCommand(args),
      }),
    });
    return this._decoratorHander.middlewareDecoratorFactory(
        'limiter', limit,
    );
  };

  FormData = () => {
    const storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, './uploads/');
      },

      filename: function(req: any, file: any, cb: any) {
        cb(null, `${uuidv1()}-${file.originalname}`);
      },
    });
    const fileFilter = (req: any, file: any, cb: any) => {
      if (file.mimetype === 'image/jpg' ||
         file.mimetype ==='image/jpeg' ||
         file.mimetype === 'image/png') {
        cb(null, true);
      } else {
        cb(new Error('Image uploaded is not of type jpg/jpegor png'), false);
      }
    };
    const upload = multer({storage, fileFilter});

    return this._decoratorHander.middlewareDecoratorFactory(
        'FormData', upload.array('files', 10),
    );
  };
}

export const middlewareDecorator = Container.get(MiddlewareDecorator);

export const httpMethods: ExpressHttpMethods =
DecoratorHander.getInstance().exportMethod();

const bedRequestHandler:RequestHandler =
(req: Request, res: Response, next: NextFunction) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(errors);
    return;
  }

  next();
};
