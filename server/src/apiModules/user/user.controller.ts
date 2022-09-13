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

  @Put('/backstage/user/verify/:id')
  @Validator(validSchemas.updateBackstageUserValidator)
  async updateBackstageUser(
      req: userParams.UpdateBackstageUserRequest,
      res: Response,
      next: NextFunction,
  ) {
    UserController.service.updateBackstageUser(
        userParams.UpdateBackstageUserRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin updateBackstageUser
          res.json({result});

          // custom end updateBackstageUser
        }).catch((e) => {
          next(e);
        });
  }
  @Get('/backstage/user/:id')
  @Validator(validSchemas.readOneBackstageUserValidator)
  async readOneBackstageUser(
      req: userParams.ReadOneBackstageUserRequest,
      res: Response,
      next: NextFunction,
  ) {
    UserController.service.readOneBackstageUser(
        userParams.ReadOneBackstageUserRequestConvert(
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
  @Get('/backstage/users')
  @Validator(validSchemas.readManyUserBackstageValidator)
  async readManyUserBackstage(
      req: userParams.ReadManyUserBackstageRequest,
      res: Response,
      next: NextFunction,
  ) {
    UserController.service.readManyUserBackstage(
        userParams.ReadManyUserBackstageRequestConvert(
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
  @Get('/captcha')
  @Validator(validSchemas.captchaValidator)
  async captcha(
      req: userParams.CaptchaRequest,
      res: Response,
      next: NextFunction,
  ) {
    UserController.service.captcha(
        userParams.CaptchaRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin captcha
          res.type('svg');
          res.status(200).send(result);

          // custom end captcha
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
            req.cookies,
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
  @Post('/real_verify')
  @Validator(validSchemas.postRealVerifyValidator)
  async postRealVerify(
      req: userParams.PostRealVerifyRequest,
      res: Response,
      next: NextFunction,
  ) {
    UserController.service.postRealVerify(
        userParams.PostRealVerifyRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin postRealVerify
          res.json({result});

          // custom end postRealVerify
        }).catch((e) => {
          next(e);
        });
  }
  @Put('/real_verify')
  @Validator(validSchemas.putRealVerifyValidator)
  async putRealVerify(
      req: userParams.PutRealVerifyRequest,
      res: Response,
      next: NextFunction,
  ) {
    UserController.service.putRealVerify(
        userParams.PutRealVerifyRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin putRealVerify
          res.json({result});

          // custom end putRealVerify
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/register')
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
            req.cookies,
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
  @Get('/register/phone_check')
  @Validator(validSchemas.sendPhoneCheckValidator)
  async sendPhoneCheck(
      req: userParams.SendPhoneCheckRequest,
      res: Response,
      next: NextFunction,
  ) {
    UserController.service.sendPhoneCheck(
        userParams.SendPhoneCheckRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin sendPhoneCheck
          res.json({result});

          // custom end sendPhoneCheck
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/register/phone_check')
  @Validator(validSchemas.phoneCheckValidator)
  async phoneCheck(
      req: userParams.PhoneCheckRequest,
      res: Response,
      next: NextFunction,
  ) {
    UserController.service.phoneCheck(
        userParams.PhoneCheckRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin phoneCheck
          res.json({result});

          // custom end phoneCheck
        }).catch((e) => {
          next(e);
        });
  }
  @Get('/user/my/status')
  @Validator(validSchemas.getUserMyStatusValidator)
  async getUserMyStatus(
      req: userParams.GetUserMyStatusRequest,
      res: Response,
      next: NextFunction,
  ) {
    UserController.service.getUserMyStatus(
        userParams.GetUserMyStatusRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin getUserMyStatus
          res.json({result});

          // custom end getUserMyStatus
        }).catch((e) => {
          next(e);
        });
  }
  @Put('/user/:id')
  @Validator(validSchemas.updateOneyUserValidator)
  async updateOneyUser(
      req: userParams.UpdateOneyUserRequest,
      res: Response,
      next: NextFunction,
  ) {
    UserController.service.updateOneyUser(
        userParams.UpdateOneyUserRequestConvert(
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
