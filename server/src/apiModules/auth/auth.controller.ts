import {Response, NextFunction} from 'express';
import {Inject, Service, Container} from 'typedi';
import {
  Controller,
  httpMethods,
  middlewareDecorator,
  ControllerToken,
  AppUse,
} from '../baseController';
import {AuthService} from './auth.service';
import * as authParams from './auth.parameters';
import * as validSchemas from './auth.validator';

// eslint-disable-next-line no-unused-vars
const {Get, Post, Put, Delete} = httpMethods;
// eslint-disable-next-line no-unused-vars
const {Validator, FormData, limiter} = middlewareDecorator;

@Service({id: ControllerToken, multiple: true})
export class AuthController implements Controller {
  constructor() {}

  static service = Container.get(AuthService);
  @Inject('app.use')
    appUse!: AppUse;

  @Post('/auth')
  @Validator(validSchemas.createOneAuthValidator)
  async createOneAuth(
      req: authParams.CreateOneAuthRequest,
      res: Response,
      next: NextFunction,
  ) {
    AuthController.service.createOneAuth(
        authParams.CreateOneAuthRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
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
    AuthController.service.deleteOneAuth(
        authParams.DeleteOneAuthRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
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
    AuthController.service.updateOneAuth(
        authParams.UpdateOneAuthRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
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
    AuthController.service.readManyAuth(
        authParams.ReadManyAuthRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          res.json(result);
        }).catch((e) => {
          next(e);
        });
  }
}
