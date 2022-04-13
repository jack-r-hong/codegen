import {Response, NextFunction} from 'express';
import {Inject, Service, Container} from 'typedi';
import {
  Controller,
  httpMethods,
  middlewareDecorator,
  ControllerToken,
  AppUse,
} from '../baseController';
import {UserService} from './user.service';
import * as userParams from './user.parameters';
import * as validSchemas from './user.validator';

// eslint-disable-next-line no-unused-vars
const {Get, Post, Put, Delete} = httpMethods;
// eslint-disable-next-line no-unused-vars
const {Validator, FormData, limiter} = middlewareDecorator;

@Service({id: ControllerToken, multiple: true})
export class UserController implements Controller {
  constructor() {}

  static service = Container.get(UserService);
  @Inject('app.use')
    appUse!: AppUse;

  @Post('/google/login')
  @Validator(validSchemas.googleLoginValidator)
  async googleLogin(
      req: userParams.GoogleLoginRequest,
      res: Response,
      next: NextFunction,
  ) {
    UserController.service.googleLogin(
        userParams.GoogleLoginRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin googleLogin
          res.json({result});

          // custom end googleLogin
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/login')
  @Validator(validSchemas.loginUserValidator)
  async loginUser(
      req: userParams.LoginUserRequest,
      res: Response,
      next: NextFunction,
  ) {
    UserController.service.loginUser(
        userParams.LoginUserRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin loginUser
          res.json({result});

          // custom end loginUser
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/logout')
  @Validator(validSchemas.logoutUserValidator)
  async logoutUser(
      req: userParams.LogoutUserRequest,
      res: Response,
      next: NextFunction,
  ) {
    UserController.service.logoutUser(
        userParams.LogoutUserRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin logoutUser
          res.json(result);

          // custom end logoutUser
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/user')
  @Validator(validSchemas.registerUserValidator)
  async registerUser(
      req: userParams.RegisterUserRequest,
      res: Response,
      next: NextFunction,
  ) {
    UserController.service.registerUser(
        userParams.RegisterUserRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin registerUser
          res.json({result});

          // custom end registerUser
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
    UserController.service.deleteOneUser(
        userParams.DeleteOneUserRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
        req.session,
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
    UserController.service.readOneUser(
        userParams.ReadOneUserRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
        req.session,
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
    UserController.service.updateOneUser(
        userParams.UpdateOneUserRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
        req.session,
    )
        .then((result) =>{
          res.json(result);
        }).catch((e) => {
          next(e);
        });
  }
  @Get('/users')
  @Validator(validSchemas.readManyUserValidator)
  async readManyUser(
      req: userParams.ReadManyUserRequest,
      res: Response,
      next: NextFunction,
  ) {
    UserController.service.readManyUser(
        userParams.ReadManyUserRequestConvert(
            req.body,
            req.query,
            req.params,
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
