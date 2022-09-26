import {Response, NextFunction} from 'express';
import {Inject, Service, Container} from 'typedi';
import {
  Controller,
  httpMethods,
  middlewareDecorator,
  ControllerToken,
  AppUse,
} from '../baseController';
import {ExchangeRateBuyService} from './exchangeRateBuy.service';
import * as exchangeRateBuyParams from './exchangeRateBuy.parameters';
import * as validSchemas from './exchangeRateBuy.validator';

// eslint-disable-next-line no-unused-vars
const {Get, Post, Put, Delete} = httpMethods;
// eslint-disable-next-line no-unused-vars
const {Validator, FormData, limiter} = middlewareDecorator;

@Service({id: ControllerToken, multiple: true})
export class ExchangeRateBuyController implements Controller {
  constructor() {}

  static service = Container.get(ExchangeRateBuyService);
  @Inject('app.use')
    appUse!: AppUse;

  @Get('/backstage/exchange_rate/buy')
  @Validator(validSchemas.readManyBackstageExchangeRateBuyValidator)
  async readManyBackstageExchangeRateBuy(
      req: exchangeRateBuyParams.ReadManyBackstageExchangeRateBuyRequest,
      res: Response,
      next: NextFunction,
  ) {
    ExchangeRateBuyController.service.readManyBackstageExchangeRateBuy(
        exchangeRateBuyParams.ReadManyBackstageExchangeRateBuyRequestConvert(
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
  @Post('/backstage/exchange_rate/buy')
  @Validator(validSchemas.createOneBackstageExchangeRateBuyValidator)
  async createOneBackstageExchangeRateBuy(
      req: exchangeRateBuyParams.CreateOneBackstageExchangeRateBuyRequest,
      res: Response,
      next: NextFunction,
  ) {
    ExchangeRateBuyController.service.createOneBackstageExchangeRateBuy(
        exchangeRateBuyParams.CreateOneBackstageExchangeRateBuyRequestConvert(
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
  @Delete('/backstage/exchange_rate/buy/:id')
  @Validator(validSchemas.deleteOneBackstageExchangeRateBuyValidator)
  async deleteOneBackstageExchangeRateBuy(
      req: exchangeRateBuyParams.DeleteOneBackstageExchangeRateBuyRequest,
      res: Response,
      next: NextFunction,
  ) {
    ExchangeRateBuyController.service.deleteOneBackstageExchangeRateBuy(
        exchangeRateBuyParams.DeleteOneBackstageExchangeRateBuyRequestConvert(
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
  @Put('/backstage/exchange_rate/buy/:id')
  @Validator(validSchemas.updateOneBackstageExchangeRateBuyValidator)
  async updateOneBackstageExchangeRateBuy(
      req: exchangeRateBuyParams.UpdateOneBackstageExchangeRateBuyRequest,
      res: Response,
      next: NextFunction,
  ) {
    ExchangeRateBuyController.service.updateOneBackstageExchangeRateBuy(
        exchangeRateBuyParams.UpdateOneBackstageExchangeRateBuyRequestConvert(
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
