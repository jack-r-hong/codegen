import {Response, NextFunction} from 'express';
import {Inject, Service, Container} from 'typedi';
import {
  Controller,
  httpMethods,
  middlewareDecorator,
  ControllerToken,
  AppUse,
} from '../baseController';
import {ExchangeRateService} from './exchangeRate.service';
import * as exchangeRateParams from './exchangeRate.parameters';
import * as validSchemas from './exchangeRate.validator';

// eslint-disable-next-line no-unused-vars
const {Get, Post, Put, Delete} = httpMethods;
// eslint-disable-next-line no-unused-vars
const {Validator, FormData, limiter} = middlewareDecorator;

@Service({id: ControllerToken, multiple: true})
export class ExchangeRateController implements Controller {
  constructor() {}

  static service = Container.get(ExchangeRateService);
  @Inject('app.use')
    appUse!: AppUse;

  @Get('/backstage/exchange_rate')
  @Validator(validSchemas.readManyBackstageExchangeRateValidator)
  async readManyBackstageExchangeRate(
      req: exchangeRateParams.ReadManyBackstageExchangeRateRequest,
      res: Response,
      next: NextFunction,
  ) {
    ExchangeRateController.service.readManyBackstageExchangeRate(
        exchangeRateParams.ReadManyBackstageExchangeRateRequestConvert(
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
  @Post('/backstage/exchange_rate')
  @Validator(validSchemas.createOneBackstageExchangeRateValidator)
  async createOneBackstageExchangeRate(
      req: exchangeRateParams.CreateOneBackstageExchangeRateRequest,
      res: Response,
      next: NextFunction,
  ) {
    ExchangeRateController.service.createOneBackstageExchangeRate(
        exchangeRateParams.CreateOneBackstageExchangeRateRequestConvert(
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
  @Delete('/backstage/exchange_rate/:id')
  @Validator(validSchemas.deleteOneBackstageExchangeRateValidator)
  async deleteOneBackstageExchangeRate(
      req: exchangeRateParams.DeleteOneBackstageExchangeRateRequest,
      res: Response,
      next: NextFunction,
  ) {
    ExchangeRateController.service.deleteOneBackstageExchangeRate(
        exchangeRateParams.DeleteOneBackstageExchangeRateRequestConvert(
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
  @Put('/backstage/exchange_rate/:id')
  @Validator(validSchemas.updateOneBackstageExchangeRateValidator)
  async updateOneBackstageExchangeRate(
      req: exchangeRateParams.UpdateOneBackstageExchangeRateRequest,
      res: Response,
      next: NextFunction,
  ) {
    ExchangeRateController.service.updateOneBackstageExchangeRate(
        exchangeRateParams.UpdateOneBackstageExchangeRateRequestConvert(
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
