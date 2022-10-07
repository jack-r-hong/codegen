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

  @Post('/cashFlow/custom/page')
  @Validator(validSchemas.customPageValidator)
  async customPage(
      req: cashFlowParams.CustomPageRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin customPageCheck
    console.log(req.body);

    // custom end customPageCheck
    CashFlowController.service.customPage(
        cashFlowParams.CustomPageRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin customPage
          res.json()

          // custom end customPage
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/cashFlow/notify/grant')
  @Validator(validSchemas.notifyGrantValidator)
  async notifyGrant(
      req: cashFlowParams.NotifyGrantRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin notifyGrantCheck
    console.log(req.body);

    // custom end notifyGrantCheck
    CashFlowController.service.notifyGrant(
        cashFlowParams.NotifyGrantRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin notifyGrant
          res.json()

          // custom end notifyGrant
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/cashFlow/notify/paid')
  @Validator(validSchemas.notifyPaidValidator)
  async notifyPaid(
      req: cashFlowParams.NotifyPaidRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin notifyPaidCheck
    console.log(req.body);

    // custom end notifyPaidCheck
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
    // custom begin notifyTakeNumberCheck
    console.log(req.body);

    // custom end notifyTakeNumberCheck
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
  @Get('/cashFlow/take_number_success')
  @Validator(validSchemas.takeNumberSuccessValidator)
  async takeNumberSuccess(
      req: cashFlowParams.TakeNumberSuccessRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin takeNumberSuccessCheck

    // custom end takeNumberSuccessCheck
    CashFlowController.service.takeNumberSuccess(
        cashFlowParams.TakeNumberSuccessRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin takeNumberSuccess

          // custom end takeNumberSuccess
        }).catch((e) => {
          next(e);
        });
  }
}
