import {Service} from 'typedi';
import * as Prisma from '@prisma/client';
import * as requestTypes from './transaction.parameters';
import {errors} from '../../errors';

const prisma = new Prisma.PrismaClient();

@Service()
export class TransactionModel {
  async createTransaction(
      param: requestTypes.CreateTransactionParams,
      customParam: {
        userId: string,
        bankAccount: number,
        bankName: string,
        bankCode: number,
        twd: number,
        point: number,
        bonusPoint: number,
        account: string
      },
  ) {
    // custom begin createTransaction

    const res: any = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          account: '',
          bonusPoint: customParam.bonusPoint,
          bos: param.bodyBos,
          point: customParam.point,
          twd: customParam.twd,
          userId: customParam.userId,
          bankAccount: customParam.bankAccount,
          bankCode: customParam.bankCode,
          bankName: customParam.bankName,
          payMethod: param.bodyPayMethod,
        },
        select: {
          id: true,
          account: true,
          bonusPoint: true,
          bos: true,
          point: true,
          twd: true,
          userId: true,
          bankAccount: true,
          bankCode: true,
          bankName: true,
          payMethod: true,
          createdAt: true,
          state: true,
          user: {
            select: {
              gameUid: true,
            },
          },
        },
      }),
      prisma.transactionQrcode.upsert({
        create: {
          userId: customParam.userId,
          data: Buffer.from(param.bodyImage?? '', 'base64'),
        },
        update: {
          data: Buffer.from(param.bodyImage?? '', 'base64'),
        },
        where: {
          userId: customParam.userId,
        },
      }),
    ]).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });

    return res[0];

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
  async getTransactionCalculation(
      param: requestTypes.GetTransactionCalculationParams,
      customParam: any,
  ) {
    // custom begin getTransactionCalculation

    // custom end getTransactionCalculation
  }
  async getExchangeRateBuy(
      param: requestTypes.GetExchangeRateBuyParams,
      customParam: any,
  ) {
    // custom begin getExchangeRateBuy
    const res = await prisma.exchangeRateBuy.findMany(
    ).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end getExchangeRateBuy
  }
  async getExchangeRateSell(
      param: requestTypes.GetExchangeRateSellParams,
      customParam: any,
  ) {
    // custom begin getExchangeRateSell
    const res = await prisma.exchangeRateSell.findMany(
    ).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end getExchangeRateSell
  }
  async readMyTransaction(
      param: requestTypes.ReadMyTransactionParams,
      customParam: any,
  ) {
    // custom begin readMyTransaction
    let state :undefined | any = undefined;
    let bos1 : undefined | number = undefined;
    let bos2 : undefined | number = undefined;
    if (param.queryBos === 1 || param.queryBos === 2) {
      if (customParam.isAgent) {
        if (param.queryBos === 1) {
          bos2 = 2;
        } else {
          bos2 = 1;
        }
      } else {
        bos2 = param.queryBos;
      }
      bos1 = param.queryBos;
    }
    if (param.queryState === 'failed') {
      state = 0;
    } else if (param.queryState === 'pending') {
      state = 1;
    } else if (param.queryState === 'processing') {
      state = {
        gt: 0,
        lt: 4,
      };
    } else if (param.queryState === 'completed') {
      state = 4;
    };
    const res: any[] | null = await prisma.transaction.findMany({
      where: {
        OR: [
          {
            userId: customParam.userId,
            bos: bos1,
          },
          {
            transactionRecive: {
              userId: customParam.userId,
            },
            bos: bos2,
          },
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
        userId: true,
        user: {
          select: {
            gameUid: true,
          },
        },
        transactionRecive: {
          select: {
            user: {
              select: {
                gameUid: true,
              },
            },
          },
        },
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
  async readRealtimeTransaction(
      userId: string,
      state: 'pending' | 'processing',
  ) {
    let where: any = undefined;
    if (state === 'pending') {
      where = {
        state: 1,
      };
    } else if (state === 'processing') {
      where = {
        state: {
          gt: 1,
          lt: 4,
        },
        transactionRecive: {
          userId,
        },
      };
    }
    const res = await prisma.transaction.findMany({
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
        user: {
          select: {
            name: true,
            gameUid: true,
          },
        },
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res.map((e) => {
      let t = e;
      t = Object.assign(t, {
        name: t.user?.gameUid,
        gameUid: t.user?.gameUid,
      });
      return t;
    });
  }

  async readTransactionQrcode(
      userId: string,
  ) {
    const res = await prisma.transactionQrcode.findUnique({
      where: {
        userId,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }

  // custom end model
}
