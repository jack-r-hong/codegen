import {Response, NextFunction} from 'express';
import {Inject, Service, Container} from 'typedi';
import {
  Controller,
  httpMethods,
  middlewareDecorator,
  ControllerToken,
  AppUse,
} from '../baseController';
import {CashFlowService} from './cashFlow.service';
import * as cashFlowParams from './cashFlow.parameters';
import * as validSchemas from './cashFlow.validator';

// eslint-disable-next-line no-unused-vars
const {Get, Post, Put, Delete} = httpMethods;
// eslint-disable-next-line no-unused-vars
const {Validator, FormData, limiter} = middlewareDecorator;

@Service({id: ControllerToken, multiple: true})
export class CashFlowController implements Controller {
  constructor() {}

  static service = Container.get(CashFlowService);
  @Inject('app.use')
    appUse!: AppUse;

  @Post('/cashFlow/notify/paid')
  @Validator(validSchemas.notifyPaidValidator)
  async notifyPaid(
      req: cashFlowParams.NotifyPaidRequest,
      res: Response,
      next: NextFunction,
  ) {
    CashFlowController.service.notifyPaid(
        cashFlowParams.NotifyPaidRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin notifyPaid
          res.json();

          // custom end notifyPaid
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/cashFlow/notify/take_number')
  @Validator(validSchemas.notifyTakeNumberValidator)
  async notifyTakeNumber(
      req: cashFlowParams.NotifyTakeNumberRequest,
      res: Response,
      next: NextFunction,
  ) {
    CashFlowController.service.notifyTakeNumber(
        cashFlowParams.NotifyTakeNumberRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin notifyTakeNumber
          res.json();

          // custom end notifyTakeNumber
        }).catch((e) => {
          next(e);
        });
  }
}
