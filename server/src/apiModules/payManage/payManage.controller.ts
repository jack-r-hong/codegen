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
  async readManyBackstagePayManage(
      req: payManageParams.ReadManyBackstagePayManageRequest,
      res: Response,
      next: NextFunction,
  ) {
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
  async careateBackstagePayManage(
      req: payManageParams.CareateBackstagePayManageRequest,
      res: Response,
      next: NextFunction,
  ) {
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

          // custom end careateBackstagePayManage
        }).catch((e) => {
          next(e);
        });
  }
  @Delete('/backstage/pay_manage/photo/:id')
  @Validator(validSchemas.deleteQrCodeValidator)
  async deleteQrCode(
      req: payManageParams.DeleteQrCodeRequest,
      res: Response,
      next: NextFunction,
  ) {
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

          // custom end deleteQrCode
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/backstage/pay_manage/photo/:id')
  @Validator(validSchemas.uploadManyQrCodeValidator)
  @FormData()
  async uploadManyQrCode(
      req: payManageParams.UploadManyQrCodeRequest,
      res: Response,
      next: NextFunction,
  ) {
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
  async deleteOneBackstagePayManage(
      req: payManageParams.DeleteOneBackstagePayManageRequest,
      res: Response,
      next: NextFunction,
  ) {
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
  async updateBackstagePayManage(
      req: payManageParams.UpdateBackstagePayManageRequest,
      res: Response,
      next: NextFunction,
  ) {
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

          // custom end updateBackstagePayManage
        }).catch((e) => {
          next(e);
        });
  }
}
