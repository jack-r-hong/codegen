import {Response, NextFunction} from 'express';
import {Inject, Service, Container} from 'typedi';
import {
  Controller,
  httpMethods,
  middlewareDecorator,
  ControllerToken,
  AppUse,
} from '../baseController';
import {BankAccountService} from './bankAccount.service';
import * as bankAccountParams from './bankAccount.parameters';
import * as validSchemas from './bankAccount.validator';

// eslint-disable-next-line no-unused-vars
const {Get, Post, Put, Delete} = httpMethods;
// eslint-disable-next-line no-unused-vars
const {Validator, FormData, limiter} = middlewareDecorator;

@Service({id: ControllerToken, multiple: true})
export class BankAccountController implements Controller {
  constructor() {}

  static service = Container.get(BankAccountService);
  @Inject('app.use')
    appUse!: AppUse;

  @Get('/backstage/banks/verify/reson')
  @Validator(validSchemas.getBackstageBankAccountResonValidator)
  // custom begin getBackstageBankAccountResonDecorator

  // custom end getBackstageBankAccountResonDecorator
  async getBackstageBankAccountReson(
      req: bankAccountParams.GetBackstageBankAccountResonRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin getBackstageBankAccountResonCheck

    // custom end getBackstageBankAccountResonCheck
    BankAccountController.service.getBackstageBankAccountReson(
        bankAccountParams.GetBackstageBankAccountResonRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin getBackstageBankAccountReson
          res.json({result});

          // custom end getBackstageBankAccountReson
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/backstage/banks/verify/reson')
  @Validator(validSchemas.createBackstageBankAccountsResonValidator)
  // custom begin createBackstageBankAccountsResonDecorator

  // custom end createBackstageBankAccountsResonDecorator
  async createBackstageBankAccountsReson(
      req: bankAccountParams.CreateBackstageBankAccountsResonRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin createBackstageBankAccountsResonCheck

    // custom end createBackstageBankAccountsResonCheck
    BankAccountController.service.createBackstageBankAccountsReson(
        bankAccountParams.CreateBackstageBankAccountsResonRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin createBackstageBankAccountsReson
          res.json({result});

          // custom end createBackstageBankAccountsReson
        }).catch((e) => {
          next(e);
        });
  }
  @Delete('/backstage/banks/verify/reson/:resonId')
  @Validator(validSchemas.deleteBackstageBankAccountResonValidator)
  // custom begin deleteBackstageBankAccountResonDecorator

  // custom end deleteBackstageBankAccountResonDecorator
  async deleteBackstageBankAccountReson(
      req: bankAccountParams.DeleteBackstageBankAccountResonRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin deleteBackstageBankAccountResonCheck

    // custom end deleteBackstageBankAccountResonCheck
    BankAccountController.service.deleteBackstageBankAccountReson(
        bankAccountParams.DeleteBackstageBankAccountResonRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin deleteBackstageBankAccountReson
          res.json({result});

          // custom end deleteBackstageBankAccountReson
        }).catch((e) => {
          next(e);
        });
  }
  @Put('/backstage/banks/verify/reson/:resonId')
  @Validator(validSchemas.updateBackstageBankAccountResonValidator)
  // custom begin updateBackstageBankAccountResonDecorator

  // custom end updateBackstageBankAccountResonDecorator
  async updateBackstageBankAccountReson(
      req: bankAccountParams.UpdateBackstageBankAccountResonRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin updateBackstageBankAccountResonCheck

    // custom end updateBackstageBankAccountResonCheck
    BankAccountController.service.updateBackstageBankAccountReson(
        bankAccountParams.UpdateBackstageBankAccountResonRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin updateBackstageBankAccountReson
          res.json({result});

          // custom end updateBackstageBankAccountReson
        }).catch((e) => {
          next(e);
        });
  }
  @Get('/backstage/banks/verify/:userId')
  @Validator(validSchemas.getBackstageBankAccountsValidator)
  // custom begin getBackstageBankAccountsDecorator

  // custom end getBackstageBankAccountsDecorator
  async getBackstageBankAccounts(
      req: bankAccountParams.GetBackstageBankAccountsRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin getBackstageBankAccountsCheck

    // custom end getBackstageBankAccountsCheck
    BankAccountController.service.getBackstageBankAccounts(
        bankAccountParams.GetBackstageBankAccountsRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin getBackstageBankAccounts
          res.json({result});

          // custom end getBackstageBankAccounts
        }).catch((e) => {
          next(e);
        });
  }
  @Put('/backstage/banks/verify/:userId')
  @Validator(validSchemas.putBackstageBankAccountsValidator)
  // custom begin putBackstageBankAccountsDecorator

  // custom end putBackstageBankAccountsDecorator
  async putBackstageBankAccounts(
      req: bankAccountParams.PutBackstageBankAccountsRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin putBackstageBankAccountsCheck

    // custom end putBackstageBankAccountsCheck
    BankAccountController.service.putBackstageBankAccounts(
        bankAccountParams.PutBackstageBankAccountsRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin putBackstageBankAccounts
          res.json({result});

          // custom end putBackstageBankAccounts
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/bank')
  @Validator(validSchemas.createBankAccountsValidator)
  // custom begin createBankAccountsDecorator

  // custom end createBankAccountsDecorator
  async createBankAccounts(
      req: bankAccountParams.CreateBankAccountsRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin createBankAccountsCheck

    // custom end createBankAccountsCheck
    BankAccountController.service.createBankAccounts(
        bankAccountParams.CreateBankAccountsRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin createBankAccounts
          res.json({result});

          // custom end createBankAccounts
        }).catch((e) => {
          next(e);
        });
  }
  @Get('/bank/my/accounts')
  @Validator(validSchemas.getMyBankAccountsValidator)
  // custom begin getMyBankAccountsDecorator

  // custom end getMyBankAccountsDecorator
  async getMyBankAccounts(
      req: bankAccountParams.GetMyBankAccountsRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin getMyBankAccountsCheck

    // custom end getMyBankAccountsCheck
    BankAccountController.service.getMyBankAccounts(
        bankAccountParams.GetMyBankAccountsRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin getMyBankAccounts
          res.json({result});

          // custom end getMyBankAccounts
        }).catch((e) => {
          next(e);
        });
  }
  @Get('/bank/:id')
  @Validator(validSchemas.readOneBankAccountValidator)
  // custom begin readOneBankAccountDecorator

  // custom end readOneBankAccountDecorator
  async readOneBankAccount(
      req: bankAccountParams.ReadOneBankAccountRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin readOneBankAccountCheck

    // custom end readOneBankAccountCheck
    BankAccountController.service.readOneBankAccount(
        bankAccountParams.ReadOneBankAccountRequestConvert(
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
