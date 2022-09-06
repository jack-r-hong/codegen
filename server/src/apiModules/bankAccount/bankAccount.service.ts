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

  async getBankAccount(
      param :requestTypes.GetBankAccountParams,
      session: Express.Request['session'],
  ) {
    // custom begin getBankAccount

    // custom end getBankAccount
  }
}

