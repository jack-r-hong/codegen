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

  @Get('/bank/my/account')
  @Validator(validSchemas.getBankAccountValidator)
  async getBankAccount(
      req: bankAccountParams.GetBankAccountRequest,
      res: Response,
      next: NextFunction,
  ) {
    BankAccountController.service.getBankAccount(
        bankAccountParams.GetBankAccountRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin getBankAccount
          res.json({
            result: {
              '2': {
                'id': 2,
                'name': 'name',
                'code': 123456,
                'account': 1245,
                'status': 2,
              },
              '3': {
                'id': 3,
                'name': 'name2',
                'code': 123456,
                'account': 1245,
                'status': 2,
              },
            },
          });

          // custom end getBankAccount
        }).catch((e) => {
          next(e);
        });
  }
}
