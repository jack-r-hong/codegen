import {Request, Response, Router, RequestHandler, NextFunction  } from "express";
import { checkSchema, validationResult  } from 'express-validator';


export function Controller(mainPath: string) {
    return <T extends { new(...args: any[]): {} }>(Base: T) =>{
        return class extends Base {
            constructor(...args: any[]) {
                super(...args);
                const app = args[0];
                Object.getOwnPropertySymbols(Base.prototype).forEach(key => {
                    const { path, method, hendle, middleware } = Base.prototype[key]
                    app[method](`${mainPath}${path}`, middleware, hendle);
                })
            }
          }
    } 
}

type Hendle = (req: Request, res: Response) => Router;

class Meta{
    path: string;
    method: string;
    hendle: RequestHandler;
    middleware: RequestHandler[];
    
    constructor(path: string, method: string, hendle: Hendle, middleware: RequestHandler[]) {
        this.path = path;
        this.method = method;
        this.hendle = hendle
        this.middleware = middleware
    }
}

export function Get(path: string)  {
    return decoratorFactory('get', path)
}

export function Post(path: string)  {
    return decoratorFactory('post', path)
}

export function Put(path: string)  {
    return decoratorFactory('pet', path)
}

export function Delete(path: string)  {
    return decoratorFactory('delete', path)
}

function decoratorFactory(httpMethod: string, path: string) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const sym  =  Symbol.for(propertyKey);
        target[sym] = target[sym] || new Meta(path, httpMethod, descriptor.value, []);
        return descriptor;
    };
}

const bedRequestHandler = (req: Request, res: Response, next: NextFunction) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // next(errors);
        return res.status(400).json({ errors: errors.array() });
    }

    next();
}

export function Validator(schema: any)  {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        const sym  =  Symbol.for(propertyKey);
        target[sym] = target[sym] || new Meta('', '', descriptor.value, []);
        target[sym].middleware.push(checkSchema(schema));

        target[sym].middleware.push(bedRequestHandler);
        
    };
}
