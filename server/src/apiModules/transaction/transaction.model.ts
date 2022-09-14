import {Service} from 'typedi';
import {PrismaClient, Transaction} from '@prisma/client';
import * as requestTypes from './transaction.parameters';
import {errors} from '../../errors';

const prisma = new PrismaClient();

@Service()
export class TransactionModel {
  async createTransaction(
      param: requestTypes.CreateTransactionParams,
      customParam: any,
  ) {
    // custom begin createTransaction
    const res: Transaction | null = await prisma.transaction.create({
      data: {
        account: param.bodyAccount,
        bonusPoint: 0,
        bos: param.bodyBos,
        point: param.bodyPoint,
        twd: param.bodyTwd,
        userId: customParam.userId,
        bankAccount: customParam.bankAccount,
        bankCode: customParam.bankCode,
        bankName: customParam.bankName,
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
    const res: Transaction | null = await prisma.transaction.update({
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
    const res: any[] | null = await prisma.transaction.findMany({
      where: {
        OR: [
          {userId: customParam.userId},
          {transactionRecive: {
            userId: customParam.userId,
          }},
        ],
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
    const res: any | null = await prisma.transactionRecive.findFirst({
      where: {
        transactionId: param.queryTransactionId,
        user: {
          payManage: {
            some: {
              status: 3,
            },
          },
        },
      },
      select: {
        user: {
          select: {
            payManage: {
              select: {
                qrCode: true,
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

    // custom end getPayPhoto
  }
  async readPendingTransaction(
      param: requestTypes.ReadPendingTransactionParams,
      customParam: any,
  ) {
    // custom begin readPendingTransaction
    const res: any[] | null = await prisma.transaction.findMany({
      where: {
        state: 1,
      },
      select: {
        id: true,
        point: true,
        state: true,
        twd: true,
        bos: true,
        bonusPoint: true,
        account: true,
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
  async readOneTransaction(
      param: requestTypes.ReadOneTransactionParams,
  ) {
    const res: any | null = await prisma.transaction.findUnique({
      where: {
        id: param.pathId,
      },
      select: {
        account: true,
        bonusPoint: true,
        bos: true,
        createdAt: true,
        id: true,
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
    const res: Transaction | null = await prisma.transaction.update({
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

    // custom end updateTransaction
  }
}
