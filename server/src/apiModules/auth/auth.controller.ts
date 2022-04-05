import {Application, Response, NextFunction} from 'express';
import {Inject, Service} from 'typedi';
import {
  Controller,
  httpMethods,
  middlewareDecorator,
} from '../baseController';
import {AuthService} from './auth.service';
import * as authParams from './auth.parameters';
import * as validSchemas from './auth.validator';

const {Get, Post, Put, Delete} = httpMethods;
const {Validator, FormData, limiter} = middlewareDecorator;

@Service('Controller')
@Controller('')
export class AuthController {
  constructor(private app: Application) {}

  @Inject()
    service!: AuthService;

  @Post('/auth')
  @Validator(validSchemas.createOneAuthValidator)
  async createOneAuth(
      req: authParams.CreateOneAuthRequest,
      res: Response,
      next: NextFunction,
  ) {
    this.service.createOneAuth(
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
    this.service.deleteOneAuth(
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
    this.service.updateOneAuth(
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
    this.service.readManyAuth(
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
