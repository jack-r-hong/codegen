import {Service, Inject} from 'typedi';
import {BankAccountModel} from './bankAccount.model';
import * as requestTypes from './bankAccount.parameters';
import {errors} from '../../errors';
// custom begin import
import {promises as fs} from 'fs';

// custom end import


@Service()
export class BankAccountService {
  @Inject()
  private bankAccountModel!: BankAccountModel;

  async getBackstageBankAccountReson(
      param :requestTypes.GetBackstageBankAccountResonParams,
      session: Express.Request['session'],
  ) {
    // custom begin getBackstageBankAccountReson
    const res = await this.bankAccountModel.getBackstageBankAccountReson(
        param,
        {
        },
    ).catch((e) =>{
      throw e;
    });
    return res;

    // custom end getBackstageBankAccountReson
  }
  async createBackstageBankAccountsReson(
      param :requestTypes.CreateBackstageBankAccountsResonParams,
      session: Express.Request['session'],
  ) {
    // custom begin createBackstageBankAccountsReson
    const res = await this.bankAccountModel.createBackstageBankAccountsReson(
        param,
        {
        },
    ).catch((e) =>{
      throw e;
    });
    return res;

    // custom end createBackstageBankAccountsReson
  }
  async deleteBackstageBankAccountReson(
      param :requestTypes.DeleteBackstageBankAccountResonParams,
      session: Express.Request['session'],
  ) {
    // custom begin deleteBackstageBankAccountReson
    const res = await this.bankAccountModel.deleteBackstageBankAccountReson(
        param,
        {
        },
    ).catch((e) =>{
      throw e;
    });
    return res;

    // custom end deleteBackstageBankAccountReson
  }
  async updateBackstageBankAccountReson(
      param :requestTypes.UpdateBackstageBankAccountResonParams,
      session: Express.Request['session'],
  ) {
    // custom begin updateBackstageBankAccountReson
    const res = await this.bankAccountModel.updateBackstageBankAccountReson(
        param,
        {
        },
    ).catch((e) =>{
      throw e;
    });
    return res;

    // custom end updateBackstageBankAccountReson
  }
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
    const bankAccounts = [
      {
        data: '',
        name: '',
      },
      {
        data: '',
        name: '',
      },
      {
        data: '',
        name: '',
      },
    ];
    for (const e of res[0].user.userVerifyPhoto) {
      const data = await fs.readFile(e.path, 'base64')
          .catch(() => {
            return '';
          });
      switch (e.type) {
        case 7:
          bankAccounts[0] = {
            data,
            name: 'bankAccount1',
          };
          break;
        case 8:
          bankAccounts[1] = {
            data,
            name: 'bankAccount2',
          };
          break;
        case 9:
          bankAccounts[2] = {
            data,
            name: 'bankAccount3',
          };
          break;
      }
    }
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
        id: bankAccountVerify.id??null,
        account: bankAccountVerify.account??null,
        code: bankAccountVerify.code??null,
        name: bankAccountVerify.name??null,
        photo: bankAccountVerify.photo??null,
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
        id,
        account: {
          val: account,
          des: verifyDes.account,
          verify: verify.account,
        },
        code: {
          val: code,
          des: verifyDes.code,
          verify: verify.code,
        },
        name: {
          val: name,
          des: verifyDes.name,
          verify: verify.name,
        },
        photo: {
          val: [bankAccounts[e.order - 1]],
          des: verifyDes.photo,
          verify: verify.photo,
        },
        status,
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

