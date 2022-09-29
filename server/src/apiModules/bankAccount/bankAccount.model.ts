import {Service} from 'typedi';
import * as Prisma from '@prisma/client';
import * as requestTypes from './bankAccount.parameters';
import {errors} from '../../errors';

const prisma = new Prisma.PrismaClient();

@Service()
export class BankAccountModel {
  async getBackstageBankAccountReson(
      param: requestTypes.GetBackstageBankAccountResonParams,
      customParam: any,
  ) {
    // custom begin getBackstageBankAccountReson
    const res: any | null = await prisma.bankAccountVerifyReson.findMany()
        .catch((e) => {
          throw e;
        }).finally(() => {
          prisma.$disconnect();
        });
    return res;

    // custom end getBackstageBankAccountReson
  }
  async createBackstageBankAccountsReson(
      param: requestTypes.CreateBackstageBankAccountsResonParams,
      customParam: any,
  ) {
    // custom begin createBackstageBankAccountsReson
    const res: any | null = await prisma.bankAccountVerifyReson.create({
      data: {
        des: param.bodyDes,
      },
    })
        .catch((e) => {
          throw e;
        }).finally(() => {
          prisma.$disconnect();
        });
    return res;

    // custom end createBackstageBankAccountsReson
  }
  async deleteBackstageBankAccountReson(
      param: requestTypes.DeleteBackstageBankAccountResonParams,
      customParam: any,
  ) {
    // custom begin deleteBackstageBankAccountReson
    const res: any | null = await prisma.bankAccountVerifyReson.delete({
      where: {
        id: param.pathResonId,
      },
    })
        .catch((e) => {
          throw e;
        }).finally(() => {
          prisma.$disconnect();
        });
    return res;

    // custom end deleteBackstageBankAccountReson
  }
  async updateBackstageBankAccountReson(
      param: requestTypes.UpdateBackstageBankAccountResonParams,
      customParam: any,
  ) {
    // custom begin updateBackstageBankAccountReson
    const res: any | null = await prisma.bankAccountVerifyReson.update({
      data: {
        des: param.bodyDes,
      },
      where: {
        id: param.pathResonId,
      },
    })
        .catch((e) => {
          throw e;
        }).finally(() => {
          prisma.$disconnect();
        });
    return res;

    // custom end updateBackstageBankAccountReson
  }
  async getBackstageBankAccounts(
      param: requestTypes.GetBackstageBankAccountsParams,
      customParam: any,
  ) {
    // custom begin getBackstageBankAccounts
    const res = await prisma.bankAccount.findMany({
      where: {
        userId: param.pathUserId,
      },
      select: {
        account: true,
        code: true,
        id: true,
        name: true,
        status: true,
        order: true,
        userId: true,
        user: {
          select: {
            userVerifyPhoto: {
              where: {
                type: {
                  gt: 6,
                  lt: 10,
                },
              },
            },
          },
        },
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
    console.log(param);
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
    const deleteQuery = (verifyId: number, field: string ) => {
      return prisma.bankAccountVerifyResonDes.deleteMany({
        where: {
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
      } else {
        transactionArray.push(
            deleteQuery(e.bodyVerifyId, 'account'),
        );
      }
      if (e.bodyCodeResonId) {
        transactionArray.push(
            upsertQuery(e.bodyVerifyId, e.bodyCodeResonId, 'code'),
        );
      } else {
        transactionArray.push(
            deleteQuery(e.bodyVerifyId, 'code'),
        );
      }
      if (e.bodyNameResonId) {
        transactionArray.push(
            upsertQuery(e.bodyVerifyId, e.bodyNameResonId, 'name'),
        );
      } else {
        transactionArray.push(
            deleteQuery(e.bodyVerifyId, 'name'),
        );
      }
      if (e.bodyPhotoResonId) {
        transactionArray.push(
            upsertQuery(e.bodyVerifyId, e.bodyPhotoResonId, 'photo'),
        );
      } else {
        transactionArray.push(
            deleteQuery(e.bodyVerifyId, 'photo'),
        );
      }
    }
    const res = await prisma.$transaction(transactionArray)
        .catch((e) => {
          throw e;
        }).finally(() => {
          prisma.$disconnect();
        });
    return res;

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
        status: Number.isNaN(customParam.status) ?undefined: customParam.status,
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
  // custom begin model

  // custom end model
}
