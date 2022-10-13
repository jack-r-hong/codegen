import {Response, NextFunction} from 'express';
import {Inject, Service, Container} from 'typedi';
import {
  Controller,
  httpMethods,
  middlewareDecorator,
  ControllerToken,
  AppUse,
} from '../baseController';
import {TransactionSettingService} from './transactionSetting.service';
import * as transactionSettingParams from './transactionSetting.parameters';
import * as validSchemas from './transactionSetting.validator';

// eslint-disable-next-line no-unused-vars
const {Get, Post, Put, Delete} = httpMethods;
// eslint-disable-next-line no-unused-vars
const {Validator, FormData, limiter} = middlewareDecorator;

@Service({id: ControllerToken, multiple: true})
export class TransactionSettingController implements Controller {
  constructor() {}

  static service = Container.get(TransactionSettingService);
  @Inject('app.use')
    appUse!: AppUse;

  @Get('/backstage/transaction/setting')
  @Validator(validSchemas.getAllSettingValidator)
  async getAllSetting(
      req: transactionSettingParams.GetAllSettingRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin getAllSettingCheck

    // custom end getAllSettingCheck
    TransactionSettingController.service.getAllSetting(
        transactionSettingParams.GetAllSettingRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin getAllSetting
          res.json(result);

          // custom end getAllSetting
        }).catch((e) => {
          next(e);
        });
  }
  @Put('/backstage/transaction/setting')
  @Validator(validSchemas.updateSettingValidator)
  async updateSetting(
      req: transactionSettingParams.UpdateSettingRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin updateSettingCheck

    // custom end updateSettingCheck
    TransactionSettingController.service.updateSetting(
        transactionSettingParams.UpdateSettingRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin updateSetting
          res.json(result);

          // custom end updateSetting
        }).catch((e) => {
          next(e);
        });
  }
}
