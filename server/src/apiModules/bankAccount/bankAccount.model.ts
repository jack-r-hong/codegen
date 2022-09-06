import {Service} from 'typedi';
import {PrismaClient, BankAccount} from '@prisma/client';
import * as requestTypes from './bankAccount.parameters';
import {errors} from '../../errors';

const prisma = new PrismaClient();

@Service()
export class BankAccountModel {
  async getBankAccount(
      param: requestTypes.GetBankAccountParams,
      customParam: any,
  ) {
    // custom begin getBankAccount

    // custom end getBankAccount
  }
}
