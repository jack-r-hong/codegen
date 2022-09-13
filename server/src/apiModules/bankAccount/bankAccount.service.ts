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

  async getBackstageBankAccounts(
      param :requestTypes.GetBackstageBankAccountsParams,
      session: Express.Request['session'],
  ) {
    // custom begin getBackstageBankAccounts
    const res = await this.bankAccountModel.getBackstageBankAccounts(
        param,
        {
        },
    ).catch((e) =>{
      throw e;
    });
    return res.map((e: any) => {
      const {
        account,
        code,
        id,
        name,
        status,
        bankAccountVerify,
      } = e;
      const verify = {
        id: bankAccountVerify.id,
        account: bankAccountVerify.account,
        code: bankAccountVerify.code,
        name: bankAccountVerify.name,
        photo: bankAccountVerify.photo,
      };
      const verifyDes = {
        account: '',
        code: '',
        name: '',
        photo: '',
      };
      bankAccountVerify.bankAccountVerifyResonDes.forEach((element: {
        field: 'name' | 'code' | 'account' | 'photo',
        bankAccountVerifyReson: {
          des: string
        }
      }) => {
        verifyDes[element.field] = element.bankAccountVerifyReson.des;
      });
      return {
        account,
        code,
        id,
        name,
        status,
        verify,
        verifyDes,
      };
    });

    // custom end getBackstageBankAccounts
  }
  async putBackstageBankAccounts(
      param :requestTypes.PutBackstageBankAccountsParams,
      session: Express.Request['session'],
  ) {
    // custom begin putBackstageBankAccounts
    const res = await this.bankAccountModel.putBackstageBankAccounts(
        param,
        {
        },
    ).catch((e) =>{
      throw e;
    });
    return res;

    // custom end putBackstageBankAccounts
  }
  async createBankAccounts(
      param :requestTypes.CreateBankAccountsParams,
      session: Express.Request['session'],
  ) {
    // custom begin createBankAccounts
    const res = await this.bankAccountModel.createBankAccounts(
        param,
        {
          userId: session.userInfo?.id,
        },
    ).catch((e) =>{
      throw e;
    });
    return res;

    // custom end createBankAccounts
  }
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

