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
    const res: any = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          account: customParam.account,
          bonusPoint: customParam.bonusPoint,
          bos: param.bodyBos,
          point: customParam.point,
          twd: customParam.twd,
          userId: customParam.userId,
          bankAccount: customParam.bankAccount,
          bankCode: customParam.bankCode,
          bankName: customParam.bankName,
          payMethod: param.bodyPayMethod,
          handlingFee: customParam.handlingFee,
          serviceFee: customParam.serviceFee,
          totalDollars: customParam.totalDollars,
          totalPoints: customParam.totalPoints,
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
  async postGSPayDeposit(
      param: requestTypes.PostGSPayDepositParams,
      customParam: any,
  ) {
    // custom begin postGSPayDeposit
    const res = await prisma.transaction.findUnique({
      where: {
        id: param.bodyTransactionId,
      },
      select: {
        twd: true,
        totalDollars: true,
        point: true,
        user: {
          select: {
            phone: true,
            phonePrefix: true,
          },
        },
      },
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end postGSPayDeposit
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
        totalDollars: true,
        totalPoints: true,
        serviceFee: true,
        handlingFee: true,
        appeal: true,
        timeout: true,
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
    const res = await prisma.payManage.findFirst({
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
    return res;

    // custom end getPayPhoto
  }
  async readOneTransaction(
      param: requestTypes.ReadOneTransactionParams,
  ) {
    const res = await prisma.transaction.findUnique({
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
        handlingFee: true,
        id: true,
        payMethod: true,
        point: true,
        serviceFee: true,
        state: true,
        totalDollars: true,
        totalPoints: true,
        twd: true,
        // custom begin readOneTransaction
        user: {
          select: {
            name: true,
            gameUid: true,
          },
        },
        transactionRecive: {
          select: {
            user: {
              select: {
                name: true,
                gameUid: true,
              },
            },
          },
        },

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
    let data : { pairedAt: Date;} |
    {completedAt: Date;} |
    {state: number;} |
    {
      paidAt: Date,
      transactionRecive: {
        create: {
          userId: string,
        },
      },
    };
    if (param.bodyState === 2) {
      data = {
        pairedAt: new Date(),
        completedAt: new Date(),
        state: param.bodyState,
      };
    } else if (param.bodyState === 3) {
      data = {
        pairedAt: new Date(),
        state: param.bodyState,
      };
    } else if (param.bodyState === 4) {
      data = {
        completedAt: new Date(),
        state: param.bodyState,
      };
    } else {
      throw new Error('bodyState error');
    }
    const res = await prisma.transaction.update({
      where: {
        id: param.pathId,
      },
      data,
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end updateTransaction
  }
  // custom begin model
  async readRealtimeTransaction(
      userId: string,
      state: 'pending' | 'processing' | 'failed',
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
    } else {
      where = {
        OR: [
          {
            state: 99,
          },
          {
            appeal: true,
          },
          {
            timeOut: true,
          },
        ],
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
        totalDollars: true,
        totalPoints: true,
        serviceFee: true,
        handlingFee: true,
        appeal: true,
        timeout: true,
        user: {
          select: {
            name: true,
            gameUid: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res.map((e) => {
      let t = e;
      t = Object.assign(t, {
        name: t.user?.name,
        gameUid: t.user?.gameUid,
      });
      return t;
    });
  }
  async readRealtimeCountTransaction(
      userId: string,
  ) {
    function addDays(date: Date, days: number) {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }
    const res = await prisma.transaction.aggregate({
      where: {
        OR: [
          {
            transactionRecive: {
              userId,
            },
          },
          {
            userId,
          },
        ],
        state: 4,
        createdAt: {
          gt: new Date(new Date().toJSON().slice(0, 10).replace(/-/g, '/')),
          lt: new Date(addDays(new Date(), 1).toJSON().slice(0, 10).replace(/-/g, '/')),
        },
      },
      _sum: {
        totalDollars: true,
        totalPoints: true,
      },
      _count: {
        id: true,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return {
      dollars: res._sum.totalDollars,
      point: res._sum.totalPoints,
      orderCount: res._count.id,
    };
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
  async readTransaction(
      id: string,
  ) {
    const res = await prisma.transaction.findUnique({
      where: {
        id,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async readCheckTransaction(
      id: string,
  ) {
    const res = await prisma.transaction.findUnique({
      where: {
        id,
      },
      select: {
        userId: true,
        state: true,
        bos: true,
        transactionRecive: {
          select: {
            userId: true,
          },
        },
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async readTransactionSetting() {
    const res = await prisma.transactionSetting.findFirst({
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async readUserFirstBonus(id: string) {
    const res = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        firstBonus: true,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async updateUserFirstBonus(id: string, firstBonus: boolean) {
    const res = await prisma.user.update({
      where: {
        id,
      },
      data: {
        firstBonus,
      },
      select: {
        firstBonus: true,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async updateTransactionTimeout(id: string, timeout: boolean) {
    const res = await prisma.transaction.update({
      where: {
        id,
      },
      data: {
        timeout,
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
