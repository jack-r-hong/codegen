import {Response, NextFunction} from 'express';
import {Inject, Service, Container} from 'typedi';
import {
  Controller,
  httpMethods,
  middlewareDecorator,
  ControllerToken,
  AppUse,
} from '../baseController';
import {BackstageAdminService} from './backstageAdmin.service';
import * as backstageAdminParams from './backstageAdmin.parameters';
import * as validSchemas from './backstageAdmin.validator';

// eslint-disable-next-line no-unused-vars
const {Get, Post, Put, Delete} = httpMethods;
// eslint-disable-next-line no-unused-vars
const {Validator, FormData, limiter} = middlewareDecorator;

@Service({id: ControllerToken, multiple: true})
export class BackstageAdminController implements Controller {
  constructor() {}

  static service = Container.get(BackstageAdminService);
  @Inject('app.use')
    appUse!: AppUse;

  @Post('/backstage/admin')
  @Validator(validSchemas.getAdminFromIdValidator)
  async getAdminFromId(
      req: backstageAdminParams.GetAdminFromIdRequest,
      res: Response,
      next: NextFunction,
  ) {
    BackstageAdminController.service.getAdminFromId(
        backstageAdminParams.GetAdminFromIdRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin getAdminFromId
          res.json({result});

          // custom end getAdminFromId
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/backstage/admin/login')
  @Validator(validSchemas.adminLoginValidator)
  async adminLogin(
      req: backstageAdminParams.AdminLoginRequest,
      res: Response,
      next: NextFunction,
  ) {
    BackstageAdminController.service.adminLogin(
        backstageAdminParams.AdminLoginRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin adminLogin
          res.json({result});

          // custom end adminLogin
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/backstage/admin/register')
  @Validator(validSchemas.adminRegisterValidator)
  async adminRegister(
      req: backstageAdminParams.AdminRegisterRequest,
      res: Response,
      next: NextFunction,
  ) {
    BackstageAdminController.service.adminRegister(
        backstageAdminParams.AdminRegisterRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin adminRegister
          res.json({result});

          // custom end adminRegister
        }).catch((e) => {
          next(e);
        });
  }
}
