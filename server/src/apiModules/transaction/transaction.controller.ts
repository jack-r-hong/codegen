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
  @Get('/transaction/exchange_rate')
  @Validator(validSchemas.getExchangeRateValidator)
  async getExchangeRate(
      req: transactionParams.GetExchangeRateRequest,
      res: Response,
      next: NextFunction,
  ) {
    TransactionController.service.getExchangeRate(
        transactionParams.GetExchangeRateRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin getExchangeRate
          res.json({
            result: {
              0: {
                range: 0,
                rate: 120,
              },
              1: {
                range: 150000,
                rate: 130,
              },
              2: {
                range: 500000,
                rate: 140,
              },
            },
          });

          // custom end getExchangeRate
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
  @Get('/transaction/pending')
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
  @Validator(validSchemas.updateOneTransactionStateValidator)
  async updateOneTransactionState(
      req: transactionParams.UpdateOneTransactionStateRequest,
      res: Response,
      next: NextFunction,
  ) {
    TransactionController.service.updateOneTransactionState(
        transactionParams.UpdateOneTransactionStateRequestConvert(
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
