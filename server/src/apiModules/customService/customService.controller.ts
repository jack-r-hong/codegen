import {Response, NextFunction} from 'express';
import {Inject, Service, Container} from 'typedi';
import {
  Controller,
  httpMethods,
  middlewareDecorator,
  ControllerToken,
  AppUse,
} from '../baseController';
import {CustomServiceService} from './customService.service';
import * as customServiceParams from './customService.parameters';
import * as validSchemas from './customService.validator';

// eslint-disable-next-line no-unused-vars
const {Get, Post, Put, Delete} = httpMethods;
// eslint-disable-next-line no-unused-vars
const {Validator, FormData, limiter} = middlewareDecorator;

@Service({id: ControllerToken, multiple: true})
export class CustomServiceController implements Controller {
  constructor() {}

  static service = Container.get(CustomServiceService);
  @Inject('app.use')
    appUse!: AppUse;

  @Get('/cs/user/:id')
  @Validator(validSchemas.getOneBackstageUserValidator)
  // custom begin getOneBackstageUserDecorator

  // custom end getOneBackstageUserDecorator
  async getOneBackstageUser(
      req: customServiceParams.GetOneBackstageUserRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin getOneBackstageUserCheck

    // custom end getOneBackstageUserCheck
    CustomServiceController.service.getOneBackstageUser(
        customServiceParams.GetOneBackstageUserRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin getOneBackstageUser

          // custom end getOneBackstageUser
        }).catch((e) => {
          next(e);
        });
  }
}
