import {Service} from 'typedi';
import {PrismaClient, BankAccount} from '@prisma/client';
import * as requestTypes from './bankAccount.parameters';
import {errors} from '../../errors';

const prisma = new PrismaClient();

@Service()
export class BankAccountModel {
  async getBackstageBankAccounts(
      param: requestTypes.GetBackstageBankAccountsParams,
      customParam: any,
  ) {
    // custom begin getBackstageBankAccounts
    const res: any | null = await prisma.bankAccount.findMany({
      where: {
        userId: param.pathUserId,
      },
      select: {
        account: true,
        code: true,
        id: true,
        name: true,
        status: true,
        userId: true,
        bankAccountVerify: {
          select: {
            account: true,
            code: true,
            name: true,
            bankAccountVerifyResonDes: {
              select: {
                field: true,
                bankAccountVerifyReson: {
                  select: {
                    des: true,
                  },
                },
              },
            },
          },
        },
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end getBackstageBankAccounts
  }
  async getMyBankAccounts(
      param: requestTypes.GetMyBankAccountsParams,
      customParam: any,
  ) {
    // custom begin getMyBankAccounts
    const res: any | null = await prisma.bankAccount.findMany({
      where: {
        status: customParam.status,
        userId: customParam.userId,
      },
      select: {
        account: true,
        code: true,
        id: true,
        name: true,
        status: true,
        userId: true,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end getMyBankAccounts
  }
  async readOneBankAccount(
      param: requestTypes.ReadOneBankAccountParams,
  ) {
    const res: any | null = await prisma.bankAccount.findUnique({
      where: {
        id: param.pathId,
      },
      select: {
        account: true,
        code: true,
        id: true,
        name: true,
        status: true,
        userId: true,
        // custom begin readOneBankAccount

        // custom end readOneBankAccount
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });

    if (res === null) {
      throw new errors.NotFindError;
    }
    return res;
  }
}
