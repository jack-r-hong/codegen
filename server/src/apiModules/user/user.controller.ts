import {Application, Response, NextFunction} from 'express';
import {Controller, Get, Post, Put,
Delete, Validator, FormData} from '../baseController';
import {UserService, Container} from './user.service';
import * as userParams from './user.parameters';
import * as validSchemas from './user.validator';

const serviceInstance = Container.get(UserService);

@Controller('')
export class UserController {
  constructor(private app: Application) {}

  @Get('/oauthcallback')
  @Validator(validSchemas.oauthcallbackValidator)
  async oauthcallback(
      req: userParams.OauthcallbackRequest,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.oauthcallback(
        userParams.OauthcallbackRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
    )
        .then((result) =>{
          // custom begin oauthcallback
          res.json(result);

          // custom end oauthcallback
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/user')
  @Validator(validSchemas.createOneUserValidator)
  async createOneUser(
      req: userParams.CreateOneUserRequest,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.createOneUser(
        userParams.CreateOneUserRequestConvert(
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
  @Get('/user/google/login')
  @Validator(validSchemas.googleLoginUrlValidator)
  async googleLoginUrl(
      req: userParams.GoogleLoginUrlRequest,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.googleLoginUrl(
        userParams.GoogleLoginUrlRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
    )
        .then((result) =>{
          // custom begin googleLoginUrl
          res.json(result);

          // custom end googleLoginUrl
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/user/google/login')
  @Validator(validSchemas.googleLoginUserValidator)
  async googleLoginUser(
      req: userParams.GoogleLoginUserRequest,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.googleLoginUser(
        userParams.GoogleLoginUserRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
    )
        .then((result) =>{
          // custom begin googleLoginUser

          // custom end googleLoginUser
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/user/login')
  @Validator(validSchemas.loginUserValidator)
  async loginUser(
      req: userParams.LoginUserRequest,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.loginUser(
        userParams.LoginUserRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
    )
        .then((result) =>{
          // custom begin loginUser

          // custom end loginUser
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/user/logout')
  @Validator(validSchemas.logoutUserValidator)
  async logoutUser(
      req: userParams.LogoutUserRequest,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.logoutUser(
        userParams.LogoutUserRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
    )
        .then((result) =>{
          // custom begin logoutUser

          // custom end logoutUser
        }).catch((e) => {
          next(e);
        });
  }
  @Delete('/user/:id')
  @Validator(validSchemas.deleteOneUserValidator)
  async deleteOneUser(
      req: userParams.DeleteOneUserRequest,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.deleteOneUser(
        userParams.DeleteOneUserRequestConvert(
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
  @Get('/user/:id')
  @Validator(validSchemas.readOneUserValidator)
  async readOneUser(
      req: userParams.ReadOneUserRequest,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.readOneUser(
        userParams.ReadOneUserRequestConvert(
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
  @Put('/user/:id')
  @Validator(validSchemas.updateOneUserValidator)
  async updateOneUser(
      req: userParams.UpdateOneUserRequest,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.updateOneUser(
        userParams.UpdateOneUserRequestConvert(
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
  @Post('/users')
  @Validator(validSchemas.createManyUserValidator)
  async createManyUser(
      req: userParams.CreateManyUserRequest,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.createManyUser(
        userParams.CreateManyUserRequestConvert(
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
