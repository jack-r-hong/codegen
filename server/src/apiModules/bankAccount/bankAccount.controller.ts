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
  async getBackstageBankAccountReson(
      req: bankAccountParams.GetBackstageBankAccountResonRequest,
      res: Response,
      next: NextFunction,
  ) {
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
  async createBackstageBankAccountsReson(
      req: bankAccountParams.CreateBackstageBankAccountsResonRequest,
      res: Response,
      next: NextFunction,
  ) {
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
  async deleteBackstageBankAccountReson(
      req: bankAccountParams.DeleteBackstageBankAccountResonRequest,
      res: Response,
      next: NextFunction,
  ) {
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
  async updateBackstageBankAccountReson(
      req: bankAccountParams.UpdateBackstageBankAccountResonRequest,
      res: Response,
      next: NextFunction,
  ) {
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
  async getBackstageBankAccounts(
      req: bankAccountParams.GetBackstageBankAccountsRequest,
      res: Response,
      next: NextFunction,
  ) {
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
  async putBackstageBankAccounts(
      req: bankAccountParams.PutBackstageBankAccountsRequest,
      res: Response,
      next: NextFunction,
  ) {
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
  async createBankAccounts(
      req: bankAccountParams.CreateBankAccountsRequest,
      res: Response,
      next: NextFunction,
  ) {
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
  async getMyBankAccounts(
      req: bankAccountParams.GetMyBankAccountsRequest,
      res: Response,
      next: NextFunction,
  ) {
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
  async readOneBankAccount(
      req: bankAccountParams.ReadOneBankAccountRequest,
      res: Response,
      next: NextFunction,
  ) {
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
