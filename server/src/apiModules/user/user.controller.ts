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
  // custom begin getUserBackstageAgentsDecorator

  // custom end getUserBackstageAgentsDecorator
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
  // custom begin readBackstageUserResonDecorator

  // custom end readBackstageUserResonDecorator
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
  // custom begin createBackstageUserResonDecorator

  // custom end createBackstageUserResonDecorator
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
  // custom begin deleteBackstageUserResonDecorator

  // custom end deleteBackstageUserResonDecorator
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
  // custom begin updateBackstageUserResonDecorator

  // custom end updateBackstageUserResonDecorator
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
  // custom begin updateBackstageUserDecorator

  // custom end updateBackstageUserDecorator
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
  // custom begin readOneBackstageUserDecorator

  // custom end readOneBackstageUserDecorator
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
  @Put('/backstage/user/:id')
  @Validator(validSchemas.UpdateUserStatusOrRemarkOrRebateValidator)
  // custom begin UpdateUserStatusOrRemarkOrRebateDecorator

  // custom end UpdateUserStatusOrRemarkOrRebateDecorator
  async UpdateUserStatusOrRemarkOrRebate(
      req: userParams.UpdateUserStatusOrRemarkOrRebateRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin UpdateUserStatusOrRemarkOrRebateCheck

    // custom end UpdateUserStatusOrRemarkOrRebateCheck
    UserController.service.UpdateUserStatusOrRemarkOrRebate(
        userParams.UpdateUserStatusOrRemarkOrRebateRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin UpdateUserStatusOrRemarkOrRebate
          res.json(result);

          // custom end UpdateUserStatusOrRemarkOrRebate
        }).catch((e) => {
          next(e);
        });
  }
  @Get('/backstage/user/:id/transaction')
  @Validator(validSchemas.readBackstageUserTransactionValidator)
  // custom begin readBackstageUserTransactionDecorator

  // custom end readBackstageUserTransactionDecorator
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
  @Validator(validSchemas.getManyUserBackstageValidator)
  // custom begin getManyUserBackstageDecorator

  // custom end getManyUserBackstageDecorator
  async getManyUserBackstage(
      req: userParams.GetManyUserBackstageRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin getManyUserBackstageCheck

    // custom end getManyUserBackstageCheck
    UserController.service.getManyUserBackstage(
        userParams.GetManyUserBackstageRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin getManyUserBackstage
          res.json(result);

          // custom end getManyUserBackstage
        }).catch((e) => {
          next(e);
        });
  }
  @Get('/captcha')
  @Validator(validSchemas.captchaValidator)
  // custom begin captchaDecorator

  // custom end captchaDecorator
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
  @Get('/custom_service/user/:id')
  @Validator(validSchemas.getOneCustomServiceUserValidator)
  // custom begin getOneCustomServiceUserDecorator

  // custom end getOneCustomServiceUserDecorator
  async getOneCustomServiceUser(
      req: userParams.GetOneCustomServiceUserRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin getOneCustomServiceUserCheck

    // custom end getOneCustomServiceUserCheck
    UserController.service.getOneCustomServiceUser(
        userParams.GetOneCustomServiceUserRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin getOneCustomServiceUser
          res.json(result);

          // custom end getOneCustomServiceUser
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/forget_password/phone_check')
  @Validator(validSchemas.forgetPasswordPhoneCheckValidator)
  // custom begin forgetPasswordPhoneCheckDecorator
  @limiter(2, 1)

  // custom end forgetPasswordPhoneCheckDecorator
  async forgetPasswordPhoneCheck(
      req: userParams.ForgetPasswordPhoneCheckRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin forgetPasswordPhoneCheckCheck

    // custom end forgetPasswordPhoneCheckCheck
    UserController.service.forgetPasswordPhoneCheck(
        userParams.ForgetPasswordPhoneCheckRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin forgetPasswordPhoneCheck
          res.json(result);

          // custom end forgetPasswordPhoneCheck
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/forget_password/phone_check/verify')
  @Validator(validSchemas.forgetPasswordPhoneCheckVerifyValidator)
  // custom begin forgetPasswordPhoneCheckVerifyDecorator

  // custom end forgetPasswordPhoneCheckVerifyDecorator
  async forgetPasswordPhoneCheckVerify(
      req: userParams.ForgetPasswordPhoneCheckVerifyRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin forgetPasswordPhoneCheckVerifyCheck

    // custom end forgetPasswordPhoneCheckVerifyCheck
    UserController.service.forgetPasswordPhoneCheckVerify(
        userParams.ForgetPasswordPhoneCheckVerifyRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin forgetPasswordPhoneCheckVerify
          res.json(result);

          // custom end forgetPasswordPhoneCheckVerify
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/forget_password/reset')
  @Validator(validSchemas.forgetPasswordResetValidator)
  // custom begin forgetPasswordResetDecorator

  // custom end forgetPasswordResetDecorator
  async forgetPasswordReset(
      req: userParams.ForgetPasswordResetRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin forgetPasswordResetCheck

    // custom end forgetPasswordResetCheck
    UserController.service.forgetPasswordReset(
        userParams.ForgetPasswordResetRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin forgetPasswordReset
          res.json(result);

          // custom end forgetPasswordReset
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/login')
  @Validator(validSchemas.loginUserValidator)
  // custom begin loginUserDecorator

  // custom end loginUserDecorator
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
  @Post('/logout')
  @Validator(validSchemas.logoutUserValidator)
  // custom begin logoutUserDecorator

  // custom end logoutUserDecorator
  async logoutUser(
      req: userParams.LogoutUserRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin logoutUserCheck

    // custom end logoutUserCheck
    UserController.service.logoutUser(
        userParams.LogoutUserRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin logoutUser

          // custom end logoutUser
        }).catch((e) => {
          next(e);
        });
  }
  @Get('/real_verify')
  @Validator(validSchemas.getRealVerifyValidator)
  // custom begin getRealVerifyDecorator

  // custom end getRealVerifyDecorator
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
  // custom begin postRealVerifyDecorator

  // custom end postRealVerifyDecorator
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
  @Post('/register')
  @Validator(validSchemas.registerUserValidator)
  // custom begin registerUserDecorator

  // custom end registerUserDecorator
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
  // custom begin phoneCheckDecorator
  @limiter(2, 4)

  // custom end phoneCheckDecorator
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
  // custom begin getUserMyStatusDecorator

  // custom end getUserMyStatusDecorator
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
  // custom begin updateOneyUserDecorator

  // custom end updateOneyUserDecorator
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
