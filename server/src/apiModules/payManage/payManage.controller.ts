import {Response, NextFunction} from 'express';
import {Inject, Service, Container} from 'typedi';
import {
  Controller,
  httpMethods,
  middlewareDecorator,
  ControllerToken,
  AppUse,
} from '../baseController';
import {PayManageService} from './payManage.service';
import * as payManageParams from './payManage.parameters';
import * as validSchemas from './payManage.validator';

// eslint-disable-next-line no-unused-vars
const {Get, Post, Put, Delete} = httpMethods;
// eslint-disable-next-line no-unused-vars
const {Validator, FormData, limiter} = middlewareDecorator;

@Service({id: ControllerToken, multiple: true})
export class PayManageController implements Controller {
  constructor() {}

  static service = Container.get(PayManageService);
  @Inject('app.use')
    appUse!: AppUse;

  @Get('/backstage/pay_manage')
  @Validator(validSchemas.readManyBackstagePayManageValidator)
  // custom begin readManyBackstagePayManageDecorator

  // custom end readManyBackstagePayManageDecorator
  async readManyBackstagePayManage(
      req: payManageParams.ReadManyBackstagePayManageRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin readManyBackstagePayManageCheck

    // custom end readManyBackstagePayManageCheck
    PayManageController.service.readManyBackstagePayManage(
        payManageParams.ReadManyBackstagePayManageRequestConvert(
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
  @Post('/backstage/pay_manage')
  @Validator(validSchemas.careateBackstagePayManageValidator)
  // custom begin careateBackstagePayManageDecorator

  // custom end careateBackstagePayManageDecorator
  async careateBackstagePayManage(
      req: payManageParams.CareateBackstagePayManageRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin careateBackstagePayManageCheck

    // custom end careateBackstagePayManageCheck
    PayManageController.service.careateBackstagePayManage(
        payManageParams.CareateBackstagePayManageRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin careateBackstagePayManage
          res.json({result});

          // custom end careateBackstagePayManage
        }).catch((e) => {
          next(e);
        });
  }
  @Delete('/backstage/pay_manage/photo/:id')
  @Validator(validSchemas.deleteQrCodeValidator)
  // custom begin deleteQrCodeDecorator

  // custom end deleteQrCodeDecorator
  async deleteQrCode(
      req: payManageParams.DeleteQrCodeRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin deleteQrCodeCheck

    // custom end deleteQrCodeCheck
    PayManageController.service.deleteQrCode(
        payManageParams.DeleteQrCodeRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin deleteQrCode
          res.json({result});

          // custom end deleteQrCode
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/backstage/pay_manage/photo/:id')
  @Validator(validSchemas.uploadManyQrCodeValidator)
  @FormData()
  // custom begin uploadManyQrCodeDecorator

  // custom end uploadManyQrCodeDecorator
  async uploadManyQrCode(
      req: payManageParams.UploadManyQrCodeRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin uploadManyQrCodeCheck

    // custom end uploadManyQrCodeCheck
    PayManageController.service.uploadManyQrCode(
        payManageParams.UploadManyQrCodeRequestConvert(
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
  @Delete('/backstage/pay_manage/:id')
  @Validator(validSchemas.deleteOneBackstagePayManageValidator)
  // custom begin deleteOneBackstagePayManageDecorator

  // custom end deleteOneBackstagePayManageDecorator
  async deleteOneBackstagePayManage(
      req: payManageParams.DeleteOneBackstagePayManageRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin deleteOneBackstagePayManageCheck

    // custom end deleteOneBackstagePayManageCheck
    PayManageController.service.deleteOneBackstagePayManage(
        payManageParams.DeleteOneBackstagePayManageRequestConvert(
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
  @Put('/backstage/pay_manage/:id')
  @Validator(validSchemas.updateBackstagePayManageValidator)
  // custom begin updateBackstagePayManageDecorator

  // custom end updateBackstagePayManageDecorator
  async updateBackstagePayManage(
      req: payManageParams.UpdateBackstagePayManageRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin updateBackstagePayManageCheck

    // custom end updateBackstagePayManageCheck
    PayManageController.service.updateBackstagePayManage(
        payManageParams.UpdateBackstagePayManageRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin updateBackstagePayManage
          res.json({result});

          // custom end updateBackstagePayManage
        }).catch((e) => {
          next(e);
        });
  }
}
