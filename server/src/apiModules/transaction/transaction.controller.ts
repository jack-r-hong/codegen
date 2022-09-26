import {Response, NextFunction} from 'express';
import {Inject, Service, Container} from 'typedi';
import {
  Controller,
  httpMethods,
  middlewareDecorator,
  ControllerToken,
  AppUse,
} from '../baseController';
import {TransactionService} from './transaction.service';
import * as transactionParams from './transaction.parameters';
import * as validSchemas from './transaction.validator';

// eslint-disable-next-line no-unused-vars
const {Get, Post, Put, Delete} = httpMethods;
// eslint-disable-next-line no-unused-vars
const {Validator, FormData, limiter} = middlewareDecorator;

@Service({id: ControllerToken, multiple: true})
export class TransactionController implements Controller {
  constructor() {}

  static service = Container.get(TransactionService);
  @Inject('app.use')
    appUse!: AppUse;

  @Post('/transaction')
  @Validator(validSchemas.createTransactionValidator)
  async createTransaction(
      req: transactionParams.CreateTransactionRequest,
      res: Response,
      next: NextFunction,
  ) {
    TransactionController.service.createTransaction(
        transactionParams.CreateTransactionRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin createTransaction
          res.json({result});

          // custom end createTransaction
        }).catch((e) => {
          next(e);
        });
  }
  @Put('/transaction')
  @Validator(validSchemas.updateTransactionStateValidator)
  async updateTransactionState(
      req: transactionParams.UpdateTransactionStateRequest,
      res: Response,
      next: NextFunction,
  ) {
    TransactionController.service.updateTransactionState(
        transactionParams.UpdateTransactionStateRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin updateTransactionState
          res.json({result});

          // custom end updateTransactionState
        }).catch((e) => {
          next(e);
        });
  }
  @Get('/transaction/agent/:agentShow')
  @Validator(validSchemas.readPendingTransactionValidator)
  async readPendingTransaction(
      req: transactionParams.ReadPendingTransactionRequest,
      res: Response,
      next: NextFunction,
  ) {
    TransactionController.service.readPendingTransaction(
        transactionParams.ReadPendingTransactionRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin readPendingTransaction
          res.json({result});

          // custom end readPendingTransaction
        }).catch((e) => {
          next(e);
        });
  }
  @Get('/transaction/exchange_rate/buy')
  @Validator(validSchemas.getExchangeRateBuyValidator)
  async getExchangeRateBuy(
      req: transactionParams.GetExchangeRateBuyRequest,
      res: Response,
      next: NextFunction,
  ) {
    TransactionController.service.getExchangeRateBuy(
        transactionParams.GetExchangeRateBuyRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin getExchangeRateBuy
          res.json(result);
          // custom end getExchangeRateBuy
        }).catch((e) => {
          next(e);
        });
  }
  @Get('/transaction/exchange_rate/sell')
  @Validator(validSchemas.getExchangeRateSellValidator)
  async getExchangeRateSell(
      req: transactionParams.GetExchangeRateSellRequest,
      res: Response,
      next: NextFunction,
  ) {
    TransactionController.service.getExchangeRateSell(
        transactionParams.GetExchangeRateSellRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin getExchangeRateSell
          res.json(result);
          // custom end getExchangeRateSell
        }).catch((e) => {
          next(e);
        });
  }
  @Get('/transaction/my')
  @Validator(validSchemas.readMyTransactionValidator)
  async readMyTransaction(
      req: transactionParams.ReadMyTransactionRequest,
      res: Response,
      next: NextFunction,
  ) {
    TransactionController.service.readMyTransaction(
        transactionParams.ReadMyTransactionRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin readMyTransaction
          res.json({result});

          // custom end readMyTransaction
        }).catch((e) => {
          next(e);
        });
  }
  @Get('/transaction/pay_photo')
  @Validator(validSchemas.getPayPhotoValidator)
  async getPayPhoto(
      req: transactionParams.GetPayPhotoRequest,
      res: Response,
      next: NextFunction,
  ) {
    TransactionController.service.getPayPhoto(
        transactionParams.GetPayPhotoRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin getPayPhoto
          res.json({result});

          // custom end getPayPhoto
        }).catch((e) => {
          next(e);
        });
  }
  @Get('/transaction/:id')
  @Validator(validSchemas.readOneTransactionValidator)
  async readOneTransaction(
      req: transactionParams.ReadOneTransactionRequest,
      res: Response,
      next: NextFunction,
  ) {
    TransactionController.service.readOneTransaction(
        transactionParams.ReadOneTransactionRequestConvert(
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
  @Put('/transaction/:id')
  @Validator(validSchemas.updateTransactionValidator)
  async updateTransaction(
      req: transactionParams.UpdateTransactionRequest,
      res: Response,
      next: NextFunction,
  ) {
    TransactionController.service.updateTransaction(
        transactionParams.UpdateTransactionRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin updateTransaction
          res.json(result);

          // custom end updateTransaction
        }).catch((e) => {
          next(e);
        });
  }
}
