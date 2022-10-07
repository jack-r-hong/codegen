import {Response, NextFunction} from 'express';
import {Inject, Service, Container} from 'typedi';
import {
  Controller,
  httpMethods,
  middlewareDecorator,
  ControllerToken,
  AppUse,
} from '../baseController';
import {UserVerifyPhotoService} from './userVerifyPhoto.service';
import * as userVerifyPhotoParams from './userVerifyPhoto.parameters';
import * as validSchemas from './userVerifyPhoto.validator';

// eslint-disable-next-line no-unused-vars
const {Get, Post, Put, Delete} = httpMethods;
// eslint-disable-next-line no-unused-vars
const {Validator, FormData, limiter} = middlewareDecorator;

@Service({id: ControllerToken, multiple: true})
export class UserVerifyPhotoController implements Controller {
  constructor() {}

  static service = Container.get(UserVerifyPhotoService);
  @Inject('app.use')
    appUse!: AppUse;

  @Get('/backstage/real_verify/photo/:userId')
  @Validator(validSchemas.getBackstageUserVerifyPhotoValidator)
  async getBackstageUserVerifyPhoto(
      req: userVerifyPhotoParams.GetBackstageUserVerifyPhotoRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin getBackstageUserVerifyPhotoCheck

    // custom end getBackstageUserVerifyPhotoCheck
    UserVerifyPhotoController.service.getBackstageUserVerifyPhoto(
        userVerifyPhotoParams.GetBackstageUserVerifyPhotoRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin getBackstageUserVerifyPhoto
          res.json({result});

          // custom end getBackstageUserVerifyPhoto
        }).catch((e) => {
          next(e);
        });
  }
  @Get('/real_verify/photo')
  @Validator(validSchemas.getUserVerifyPhotoValidator)
  async getUserVerifyPhoto(
      req: userVerifyPhotoParams.GetUserVerifyPhotoRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin getUserVerifyPhotoCheck

    // custom end getUserVerifyPhotoCheck
    UserVerifyPhotoController.service.getUserVerifyPhoto(
        userVerifyPhotoParams.GetUserVerifyPhotoRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin getUserVerifyPhoto
          res.json({result});

          // custom end getUserVerifyPhoto
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/real_verify/photo')
  @Validator(validSchemas.uploadManyVerifyPhotoValidator)
  @FormData()
  async uploadManyVerifyPhoto(
      req: userVerifyPhotoParams.UploadManyVerifyPhotoRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin uploadManyVerifyPhotoCheck

    // custom end uploadManyVerifyPhotoCheck
    UserVerifyPhotoController.service.uploadManyVerifyPhoto(
        userVerifyPhotoParams.UploadManyVerifyPhotoRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
        req.files as Express.Multer.File[],
    )
        .then((result) =>{
          res.json(result);
        }).catch((e) => {
          next(e);
        });
  }
}
