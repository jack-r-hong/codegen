import {Application, Response, NextFunction} from 'express';
import {
  Controller,
  Validator,
  FormData,
  limiter,
  httpMethods,
} from '../baseController';
import {AuthService, Container} from './auth.service';
import * as authParams from './auth.parameters';
import * as validSchemas from './auth.validator';

const {Get, Post, Put, Delete} = httpMethods;

const serviceInstance = Container.get(AuthService);

@Controller('')
export class AuthController {
  constructor(private app: Application) {}

  @Post('/auth')
  @Validator(validSchemas.createOneAuthValidator)
  async createOneAuth(
      req: authParams.CreateOneAuthRequest,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.createOneAuth(
        authParams.CreateOneAuthRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
    )
        .then((result) =>{
          res.json(result);
        }).catch((e) => {
          next(e);
        });
  }
  @Delete('/auth/:id')
  @Validator(validSchemas.deleteOneAuthValidator)
  async deleteOneAuth(
      req: authParams.DeleteOneAuthRequest,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.deleteOneAuth(
        authParams.DeleteOneAuthRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
    )
        .then((result) =>{
          res.json(result);
        }).catch((e) => {
          next(e);
        });
  }
  @Put('/auth/:id')
  @Validator(validSchemas.updateOneAuthValidator)
  async updateOneAuth(
      req: authParams.UpdateOneAuthRequest,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.updateOneAuth(
        authParams.UpdateOneAuthRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
    )
        .then((result) =>{
          res.json(result);
        }).catch((e) => {
          next(e);
        });
  }
  @Get('/auths')
  @Validator(validSchemas.readManyAuthValidator)
  async readManyAuth(
      req: authParams.ReadManyAuthRequest,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.readManyAuth(
        authParams.ReadManyAuthRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
    )
        .then((result) =>{
          res.json(result);
        }).catch((e) => {
          next(e);
        });
  }
}
