import {Service} from 'typedi';
import * as Prisma from '@prisma/client';
import * as requestTypes from './transaction.parameters';
import {errors} from '../../errors';

const prisma = new Prisma.PrismaClient();

@Service()
export class TransactionModel {
  async createTransaction(
      param: requestTypes.CreateTransactionParams,
      customParam: any,
  ) {
    // custom begin createTransaction
    const res: Prisma.Transaction | null = await prisma.transaction.create({
      data: {
        account: param.bodyAccount,
        bonusPoint: param.bodyBonusPoint,
        bos: param.bodyBos,
        point: param.bodyPoint,
        twd: param.bodyTwd,
        userId: customParam.userId,
        bankAccount: customParam.bankAccount,
        bankCode: customParam.bankCode,
        bankName: customParam.bankName,
        payMethod: param.bodyPayMethod,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end createTransaction
  }
  async updateTransactionState(
      param: requestTypes.UpdateTransactionStateParams,
      customParam: any,
  ) {
    // custom begin updateTransactionState
    const res: Prisma.Transaction | null = await prisma.transaction.update({
      where: {
        id: customParam.tId,
      },
      data: {
        state: param.bodyState,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    if (param.bodyState === 2) {
      await prisma.transactionRecive.create({
        data: {
          userId: customParam.userId,
          transactionId: res.id,
        },
      }).catch((e) => {
        throw e;
      }).finally(() => {
        prisma.$disconnect();
      });
    }
    return res;

    // custom end updateTransactionState
  }
  async readPendingTransaction(
      param: requestTypes.ReadPendingTransactionParams,
      customParam: any,
  ) {
    // custom begin readPendingTransaction
    let where: {state: 1} | { state: {
      gt: number,
      lt: number,
    }, } = {
      state: 1,
    };
    if (param.pathAgentShow === 'processing' ) {
      where = {
        state: {
          gt: 1,
          lt: 4,
        },
      };
    }
    const res: any[] | null = await prisma.transaction.findMany({
      where,
      select: {
        id: true,
        point: true,
        state: true,
        twd: true,
        bos: true,
        bonusPoint: true,
        account: true,
        payMethod: true,
        createdAt: true,
      },
      orderBy: {
        [param.queryOrderByField]: param.queryOrderBy,
      },
      skip: param.queryPage * param.queryTake,
      take: param.queryTake,
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end readPendingTransaction
  }
  async getExchangeRate(
      param: requestTypes.GetExchangeRateParams,
      customParam: any,
  ) {
    // custom begin getExchangeRate
    const res = await prisma.exchangeRate.findMany(
        {
          where: {
            bos: {
              equals: param.queryBos,
            },
          },
        },
    ).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end getExchangeRate
  }
  async readMyTransaction(
      param: requestTypes.ReadMyTransactionParams,
      customParam: any,
  ) {
    // custom begin readMyTransaction
    let state :undefined | any = undefined;
    if (param.queryState === 'failed') {
      state = 0;
    } else if (param.queryState === 'pending') {
      state = 1;
    } else if (param.queryState === 'processing') {
      state = {
        gt: 1,
        lt: 4,
      };
    }
    const res: any[] | null = await prisma.transaction.findMany({
      where: {
        OR: [
          {userId: customParam.userId},
          {transactionRecive: {
            userId: customParam.userId,
          }},
        ],
        state,
        createdAt: {
          gte: param.queryStartTime,
          lte: param.queryEndTime,
        },
      },
      select: {
        id: true,
        point: true,
        state: true,
        twd: true,
        bos: true,
        payMethod: true,
        bonusPoint: true,
        createdAt: true,
        bankAccount: true,
        bankCode: true,
        bankName: true,
      },
      orderBy: {
        [param.queryOrderByField]: param.queryOrderBy,
      },
      skip: param.queryPage * param.queryTake,
      take: param.queryTake,
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end readMyTransaction
  }
  async getPayPhoto(
      param: requestTypes.GetPayPhotoParams,
      customParam: any,
  ) {
    // custom begin getPayPhoto
    const res: any | null = await prisma.payManage.findFirst({
      where: {
        user: {
          transactionRecive: {
            some: {
              transactionId: param.queryTransactionId,
            },
          },
        },
        type: param.queryType,
        status: 3,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    console.log(res);
    return res;

    // custom end getPayPhoto
  }
  async readOneTransaction(
      param: requestTypes.ReadOneTransactionParams,
  ) {
    const res: any | null = await prisma.transaction.findUnique({
      where: {
        id: param.pathId,
      },
      select: {
        account: true,
        bankAccount: true,
        bankCode: true,
        bankName: true,
        bonusPoint: true,
        bos: true,
        createdAt: true,
        id: true,
        payMethod: true,
        point: true,
        state: true,
        twd: true,
        // custom begin readOneTransaction

        // custom end readOneTransaction
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
  async updateTransaction(
      param: requestTypes.UpdateTransactionParams,
      customParam: any,
  ) {
    // custom begin updateTransaction
    let res: any | null = await prisma.transaction.update({
      where: {
        id: param.pathId,
      },
      data: {
        state: param.bodyState,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    if (param.bodyState === 2) {
      res = await prisma.transaction.update({
        where: {
          id: param.pathId,
        },
        data: {
          state: param.bodyState,
          transactionRecive: {
            create: {
              userId: customParam.userId,
            },
          },
        },
      }).catch((e) => {
        throw e;
      }).finally(() => {
        prisma.$disconnect();
      });
    }
    return res;

    // custom end updateTransaction
  }
  // custom begin model

  // custom end model
}
