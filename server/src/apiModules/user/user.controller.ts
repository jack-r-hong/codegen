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

  @Get('/backstage/agents')
  @Validator(validSchemas.getUserBackstageAgentsValidator)
  async getUserBackstageAgents(
      req: userParams.GetUserBackstageAgentsRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin getUserBackstageAgentsCheck

    // custom end getUserBackstageAgentsCheck
    UserController.service.getUserBackstageAgents(
        userParams.GetUserBackstageAgentsRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin getUserBackstageAgents
          res.json(result);

          // custom end getUserBackstageAgents
        }).catch((e) => {
          next(e);
        });
  }
  @Get('/backstage/user/verify/reson')
  @Validator(validSchemas.readBackstageUserResonValidator)
  async readBackstageUserReson(
      req: userParams.ReadBackstageUserResonRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin readBackstageUserResonCheck

    // custom end readBackstageUserResonCheck
    UserController.service.readBackstageUserReson(
        userParams.ReadBackstageUserResonRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin readBackstageUserReson
          res.json({result});

          // custom end readBackstageUserReson
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/backstage/user/verify/reson')
  @Validator(validSchemas.createBackstageUserResonValidator)
  async createBackstageUserReson(
      req: userParams.CreateBackstageUserResonRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin createBackstageUserResonCheck

    // custom end createBackstageUserResonCheck
    UserController.service.createBackstageUserReson(
        userParams.CreateBackstageUserResonRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin createBackstageUserReson
          res.json({result});

          // custom end createBackstageUserReson
        }).catch((e) => {
          next(e);
        });
  }
  @Delete('/backstage/user/verify/reson/:resonId')
  @Validator(validSchemas.deleteBackstageUserResonValidator)
  async deleteBackstageUserReson(
      req: userParams.DeleteBackstageUserResonRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin deleteBackstageUserResonCheck

    // custom end deleteBackstageUserResonCheck
    UserController.service.deleteBackstageUserReson(
        userParams.DeleteBackstageUserResonRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin deleteBackstageUserReson
          res.json({result});

          // custom end deleteBackstageUserReson
        }).catch((e) => {
          next(e);
        });
  }
  @Put('/backstage/user/verify/reson/:resonId')
  @Validator(validSchemas.updateBackstageUserResonValidator)
  async updateBackstageUserReson(
      req: userParams.UpdateBackstageUserResonRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin updateBackstageUserResonCheck

    // custom end updateBackstageUserResonCheck
    UserController.service.updateBackstageUserReson(
        userParams.UpdateBackstageUserResonRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin updateBackstageUserReson
          res.json({result});

          // custom end updateBackstageUserReson
        }).catch((e) => {
          next(e);
        });
  }
  @Put('/backstage/user/verify/:id')
  @Validator(validSchemas.updateBackstageUserValidator)
  async updateBackstageUser(
      req: userParams.UpdateBackstageUserRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin updateBackstageUserCheck

    // custom end updateBackstageUserCheck
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
    // custom begin readOneBackstageUserCheck

    // custom end readOneBackstageUserCheck
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
  @Get('/backstage/user/:id/transaction')
  @Validator(validSchemas.readBackstageUserTransactionValidator)
  async readBackstageUserTransaction(
      req: userParams.ReadBackstageUserTransactionRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin readBackstageUserTransactionCheck

    // custom end readBackstageUserTransactionCheck
    UserController.service.readBackstageUserTransaction(
        userParams.ReadBackstageUserTransactionRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin readBackstageUserTransaction
          res.json(result);

          // custom end readBackstageUserTransaction
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
    // custom begin readManyUserBackstageCheck

    // custom end readManyUserBackstageCheck
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
    // custom begin captchaCheck

    // custom end captchaCheck
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
    // custom begin loginUserCheck

    // custom end loginUserCheck
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
  @Get('/real_verify')
  @Validator(validSchemas.getRealVerifyValidator)
  async getRealVerify(
      req: userParams.GetRealVerifyRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin getRealVerifyCheck

    // custom end getRealVerifyCheck
    UserController.service.getRealVerify(
        userParams.GetRealVerifyRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin getRealVerify
          res.json(result);

          // custom end getRealVerify
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
    // custom begin postRealVerifyCheck

    // custom end postRealVerifyCheck
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
    // custom begin putRealVerifyCheck

    // custom end putRealVerifyCheck
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
    // custom begin registerUserCheck

    // custom end registerUserCheck
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
  @Post('/register/phone_check')
  @Validator(validSchemas.phoneCheckValidator)
  async phoneCheck(
      req: userParams.PhoneCheckRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin phoneCheckCheck

    // custom end phoneCheckCheck
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
    // custom begin getUserMyStatusCheck

    // custom end getUserMyStatusCheck
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
    // custom begin updateOneyUserCheck

    // custom end updateOneyUserCheck
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
