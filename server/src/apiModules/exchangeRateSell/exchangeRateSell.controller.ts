import {Response, NextFunction} from 'express';
import {Inject, Service, Container} from 'typedi';
import {
  Controller,
  httpMethods,
  middlewareDecorator,
  ControllerToken,
  AppUse,
} from '../baseController';
import {ExchangeRateSellService} from './exchangeRateSell.service';
import * as exchangeRateSellParams from './exchangeRateSell.parameters';
import * as validSchemas from './exchangeRateSell.validator';

// eslint-disable-next-line no-unused-vars
const {Get, Post, Put, Delete} = httpMethods;
// eslint-disable-next-line no-unused-vars
const {Validator, FormData, limiter} = middlewareDecorator;

@Service({id: ControllerToken, multiple: true})
export class ExchangeRateSellController implements Controller {
  constructor() {}

  static service = Container.get(ExchangeRateSellService);
  @Inject('app.use')
    appUse!: AppUse;

  @Get('/backstage/exchange_rate/sell')
  @Validator(validSchemas.readManyBackstageExchangeRateSellValidator)
  async readManyBackstageExchangeRateSell(
      req: exchangeRateSellParams.ReadManyBackstageExchangeRateSellRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin readManyBackstageExchangeRateSellCheck

    // custom end readManyBackstageExchangeRateSellCheck
    ExchangeRateSellController.service.readManyBackstageExchangeRateSell(
        exchangeRateSellParams.ReadManyBackstageExchangeRateSellRequestConvert(
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
  @Post('/backstage/exchange_rate/sell')
  @Validator(validSchemas.createOneBackstageExchangeRateSellValidator)
  async createOneBackstageExchangeRateSell(
      req: exchangeRateSellParams.CreateOneBackstageExchangeRateSellRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin createOneBackstageExchangeRateSellCheck

    // custom end createOneBackstageExchangeRateSellCheck
    ExchangeRateSellController.service.createOneBackstageExchangeRateSell(
        exchangeRateSellParams.CreateOneBackstageExchangeRateSellRequestConvert(
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
  @Delete('/backstage/exchange_rate/sell/:id')
  @Validator(validSchemas.deleteOneBackstageExchangeRateSellValidator)
  async deleteOneBackstageExchangeRateSell(
      req: exchangeRateSellParams.DeleteOneBackstageExchangeRateSellRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin deleteOneBackstageExchangeRateSellCheck

    // custom end deleteOneBackstageExchangeRateSellCheck
    ExchangeRateSellController.service.deleteOneBackstageExchangeRateSell(
        exchangeRateSellParams.DeleteOneBackstageExchangeRateSellRequestConvert(
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
  @Put('/backstage/exchange_rate/sell/:id')
  @Validator(validSchemas.updateOneBackstageExchangeRateSellValidator)
  async updateOneBackstageExchangeRateSell(
      req: exchangeRateSellParams.UpdateOneBackstageExchangeRateSellRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin updateOneBackstageExchangeRateSellCheck

    // custom end updateOneBackstageExchangeRateSellCheck
    ExchangeRateSellController.service.updateOneBackstageExchangeRateSell(
        exchangeRateSellParams.UpdateOneBackstageExchangeRateSellRequestConvert(
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
