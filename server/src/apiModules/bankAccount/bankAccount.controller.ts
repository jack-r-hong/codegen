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
