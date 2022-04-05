import {Application, Request,
  Response, Router, RequestHandler, NextFunction, IRouterMatcher}
  from 'express';
import {checkSchema, Schema, validationResult} from 'express-validator';
import multer from 'multer';
import {v1 as uuidv1} from 'uuid';

import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import {redisLimiterClient as redisClient} from '../redisClient';

const subRouter = Router();

export enum ExpressMethod{
  Get='get',
  Post='post',
  Put='put',
  Delete='delete',
}

type ExpressHttpMethods = {[_key in keyof typeof ExpressMethod]: Function }


export function Controller(mainPath: string) {
  return <T extends { new(...args: any[]): {} }>(Base: T) =>{
    return class extends Base {
      constructor(...args: any[]) {
        super(...args);
        const app :Application = args[0];
        app.get;
        app.use(`/api/${mainPath}`, subRouter);
      }
    };
  };
}


class DecoratorHander {
  private static _instance: DecoratorHander;
  private _keys: Symbol[ ]= [];

  constructor( ) {}

  public static getInstance(): DecoratorHander {
    if (!DecoratorHander._instance) {
      DecoratorHander._instance = new DecoratorHander();
    }

    return DecoratorHander._instance;
  }

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

    for (const method in ExpressMethod) {
      if ( typeof method as keyof typeof ExpressMethod) {
        methods[method] = function(path: string) {
          return decoratorHander.expressMethodDecoratorFactory(
              ExpressMethod[method as keyof typeof ExpressMethod], path,
          );
        };
      }
    }

    return methods;
  }
}

const decoratorHander = DecoratorHander.getInstance();

export const httpMethods: ExpressHttpMethods =
decoratorHander.exportMethod();

const bedRequestHandler:RequestHandler =
(req: Request, res: Response, next: NextFunction) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(errors);
    return;
  }

  next();
};

export function Validator(schema: Schema) {
  return decoratorHander.middlewareDecoratorFactory(
      'validator', checkSchema(schema),
  );
}

export function FormData() {
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

  return decoratorHander.middlewareDecoratorFactory(
      'FormData', upload.array('files', 10),
  );
}

export function limiter(minutes = 15, max = 100) {
  const limit = rateLimit({
    windowMs: minutes * 60 * 1000, // 15 minutes
    max,
    standardHeaders: true,
    legacyHeaders: false,
    store: new RedisStore({
      sendCommand: (...args: string[]) => redisClient.sendCommand(args),
    }),
  });
  return decoratorHander.middlewareDecoratorFactory(
      'limiter', limit,
  );
}
