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
    // custom begin createTransactionCheck

    // custom end createTransactionCheck
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
  @Post('/transaction/calculation')
  @Validator(validSchemas.getTransactionCalculationValidator)
  async getTransactionCalculation(
      req: transactionParams.GetTransactionCalculationRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin getTransactionCalculationCheck

    // custom end getTransactionCalculationCheck
    TransactionController.service.getTransactionCalculation(
        transactionParams.GetTransactionCalculationRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin getTransactionCalculation
          res.json(result);

          // custom end getTransactionCalculation
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
    // custom begin getExchangeRateBuyCheck

    // custom end getExchangeRateBuyCheck
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
    // custom begin getExchangeRateSellCheck

    // custom end getExchangeRateSellCheck
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
  @Post('/transaction/gs_pay/deposit')
  @Validator(validSchemas.postGSPayDepositValidator)
  async postGSPayDeposit(
      req: transactionParams.PostGSPayDepositRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin postGSPayDepositCheck

    // custom end postGSPayDepositCheck
    TransactionController.service.postGSPayDeposit(
        transactionParams.PostGSPayDepositRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin postGSPayDeposit
          res.json(result);

          // custom end postGSPayDeposit
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
    // custom begin readMyTransactionCheck

    // custom end readMyTransactionCheck
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
    // custom begin getPayPhotoCheck

    // custom end getPayPhotoCheck
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
    // custom begin readOneTransactionCheck

    // custom end readOneTransactionCheck
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
    // custom begin updateTransactionCheck

    // custom end updateTransactionCheck
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
