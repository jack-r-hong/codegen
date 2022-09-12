import {Service, Inject} from 'typedi';
import {BankAccountModel} from './bankAccount.model';
import * as requestTypes from './bankAccount.parameters';
import {errors} from '../../errors';
// custom begin import

// custom end import


@Service()
export class BankAccountService {
  @Inject()
  private bankAccountModel!: BankAccountModel;

  async getMyBankAccounts(
      param :requestTypes.GetMyBankAccountsParams,
      session: Express.Request['session'],
  ) {
    // custom begin getMyBankAccounts
    const res = await this.bankAccountModel.getMyBankAccounts(
        param,
        {
          userId: session.userInfo?.id!,
          status: param.queryStatus,
        },
    ).catch((e) =>{
      throw e;
    });
    return res;

    // custom end getMyBankAccounts
  }
  async readOneBankAccount(
      param :requestTypes.ReadOneBankAccountParams,
      session: Express.Request['session'],
  ) {
    // custom begin readOneBankAccount

    // custom end readOneBankAccount

    const res = await this.bankAccountModel.readOneBankAccount(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin readOneBankAccount2

    // custom end readOneBankAccount2
    return res;
  }
}

