import {Response, NextFunction} from 'express';
import {Inject, Service, Container} from 'typedi';
import {
  Controller,
  httpMethods,
  middlewareDecorator,
  ControllerToken,
  AppUse,
} from '../baseController';
import {UserLevelService} from './userLevel.service';
import * as userLevelParams from './userLevel.parameters';
import * as validSchemas from './userLevel.validator';

// eslint-disable-next-line no-unused-vars
const {Get, Post, Put, Delete} = httpMethods;
// eslint-disable-next-line no-unused-vars
const {Validator, FormData, limiter} = middlewareDecorator;

@Service({id: ControllerToken, multiple: true})
export class UserLevelController implements Controller {
  constructor() {}

  static service = Container.get(UserLevelService);
  @Inject('app.use')
    appUse!: AppUse;

  @Get('/backstage/user/level')
  @Validator(validSchemas.readManyBackstageUserLevelValidator)
  async readManyBackstageUserLevel(
      req: userLevelParams.ReadManyBackstageUserLevelRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin readManyBackstageUserLevelCheck

    // custom end readManyBackstageUserLevelCheck
    UserLevelController.service.readManyBackstageUserLevel(
        userLevelParams.ReadManyBackstageUserLevelRequestConvert(
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
  @Post('/backstage/user/level')
  @Validator(validSchemas.createOneBackstageUserLevelValidator)
  async createOneBackstageUserLevel(
      req: userLevelParams.CreateOneBackstageUserLevelRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin createOneBackstageUserLevelCheck

    // custom end createOneBackstageUserLevelCheck
    UserLevelController.service.createOneBackstageUserLevel(
        userLevelParams.CreateOneBackstageUserLevelRequestConvert(
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
  @Delete('/backstage/user/level/:id')
  @Validator(validSchemas.deleteOneBackstageUserLevelValidator)
  async deleteOneBackstageUserLevel(
      req: userLevelParams.DeleteOneBackstageUserLevelRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin deleteOneBackstageUserLevelCheck

    // custom end deleteOneBackstageUserLevelCheck
    UserLevelController.service.deleteOneBackstageUserLevel(
        userLevelParams.DeleteOneBackstageUserLevelRequestConvert(
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
  @Put('/backstage/user/level/:id')
  @Validator(validSchemas.updateOneBackstageUserLevelValidator)
  async updateOneBackstageUserLevel(
      req: userLevelParams.UpdateOneBackstageUserLevelRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin updateOneBackstageUserLevelCheck

    // custom end updateOneBackstageUserLevelCheck
    UserLevelController.service.updateOneBackstageUserLevel(
        userLevelParams.UpdateOneBackstageUserLevelRequestConvert(
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
