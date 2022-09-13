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
            photo: true,
            id: true,
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
  async putBackstageBankAccounts(
      param: requestTypes.PutBackstageBankAccountsParams,
      customParam: any,
  ) {
    // custom begin putBackstageBankAccounts

    const transactionArray :any[] = [];

    const upsertQuery = (verifyId: number, resonId: number, field: string ) => {
      return prisma.bankAccountVerifyResonDes.upsert({
        where: {
          uniqueBankAccountField: {
            field,
            bankAccountVerifyId: verifyId,
          },
        },
        update: {
          field,
          bankAccountVerifyResonId: resonId,
        },
        create: {
          bankAccountVerifyResonId: resonId,
          field,
          bankAccountVerifyId: verifyId,
        },
      });
    };

    for (const e of param.bodyDataList) {
      transactionArray.push(
          prisma.bankAccountVerify.update({
            where: {
              id: e.bodyVerifyId,
            },
            data: {
              name: e.bodyName,
              code: e.bodyCode,
              account: e.bodyAccount,
              photo: e.bodyPhoto,
            },
          }),
      );

      if (e.bodyAccountResonId) {
        transactionArray.push(
            upsertQuery(e.bodyVerifyId, e.bodyAccountResonId, 'account'),
        );
      }
      if (e.bodyCodeResonId) {
        transactionArray.push(
            upsertQuery(e.bodyVerifyId, e.bodyCodeResonId, 'code'),
        );
      }
      if (e.bodyNameResonId) {
        transactionArray.push(
            upsertQuery(e.bodyVerifyId, e.bodyNameResonId, 'name'),
        );
      }
      if (e.bodyPhotoResonId) {
        transactionArray.push(
            upsertQuery(e.bodyVerifyId, e.bodyPhotoResonId, 'photo'),
        );
      }
    }

    // const aaa = param.bodyDataList.map((e) => {
    //   return;
    //   prisma.bankAccountVerifyResonDes.upsert({
    //     where: {
    //       uniqueBankAccountField: {
    //         field: '',
    //         bankAccountVerifyId: 1,
    //       },
    //     },
    //     update: {
    //       field: '',
    //       bankAccountVerifyResonId: e.bodyAccountResonId,
    //     },
    //     create: {
    //       bankAccountVerifyResonId: e.bodyAccountResonId,
    //       field: '',
    //       bankAccountVerifyId: 1,
    //     },
    //   });
    // });

    const resVerify = await prisma.$transaction(
        transactionArray,
    ).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return resVerify;

    // custom end putBackstageBankAccounts
  }
  async createBankAccounts(
      param: requestTypes.CreateBankAccountsParams,
      customParam: any,
  ) {
    // custom begin createBankAccounts
    const res = await prisma.$transaction(
        param.bodyData.map((e) => {
          return prisma.bankAccount.create({
            data: {
              userId: customParam.userId,
              account: e.bodyAccount,
              code: e.bodyAccount,
              name: e.bodyName,
              order: 1,
              bankAccountVerify: {
                create: {
                  account: 1,
                  code: 1,
                  name: 1,
                  photo: 1,
                },
              },
            },
          });
        }),
    ).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end createBankAccounts
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
