import {Service} from 'typedi';
import * as Prisma from '@prisma/client';
import * as requestTypes from './transaction.parameters';
import {errors} from '../../errors';
// custom begin import
import {referralCodeFormat} from '../../utils/referralCodeFormat';

// custom end import

const prisma = new Prisma.PrismaClient();

@Service()
export class TransactionModel {
  async createTransaction(
      param: requestTypes.CreateTransactionParams,
      customParam: any,
      // custom begin createTransactionParam
      {
        account,
        bonusPoint,
        point,
        twd,
        userId,
        bankAccount,
        bankCode,
        bankName,
        handlingFee,
        serviceFee,
        totalDollars,
        totalPoints,
        rebate,
        rebateRate,
        referralId,
        expiredAt,
      }: {
        account: string,
        bonusPoint: number,
        point: number,
        twd: number,
        userId: string,
        bankAccount: number,
        bankCode: number,
        bankName: string,
        handlingFee: number,
        serviceFee: number,
        totalDollars: number,
        totalPoints: number,
        rebate: number,
        rebateRate: number
        referralId: null | number,
        expiredAt: Date,
      },

      // custom end createTransactionParam
  ) {
    // custom begin createTransaction
    const res: any = await prisma.$transaction([
      prisma.transaction.create({
        data: {
          account,
          bonusPoint,
          bos: param.bodyBos,
          point,
          twd,
          userId,
          bankAccount,
          bankCode,
          bankName,
          payMethod: param.bodyPayMethod,
          handlingFee,
          serviceFee,
          totalDollars,
          totalPoints,
          rebate,
          rebateRate,
          referralId,
          expiredAt,
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
          expiredAt: true,
          user: {
            select: {
              gameUid: true,
            },
          },
        },
      }),
      prisma.transactionQrcode.upsert({
        create: {
          userId,
          data: Buffer.from(param.bodyImage?? '', 'base64'),
          code: param.bodyCode?? '',
        },
        update: {
          data: Buffer.from(param.bodyImage?? '', 'base64'),
          code: param.bodyCode?? '',
        },
        where: {
          userId,
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
  async getTransactionCalculation(
      param: requestTypes.GetTransactionCalculationParams,
      customParam: any,
      // custom begin getTransactionCalculationParam

      // custom end getTransactionCalculationParam
  ) {
    // custom begin getTransactionCalculation

    // custom end getTransactionCalculation
  }
  async getExchangeRateBuy(
      param: requestTypes.GetExchangeRateBuyParams,
      customParam: any,
      // custom begin getExchangeRateBuyParam

      // custom end getExchangeRateBuyParam
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
      // custom begin getExchangeRateSellParam

      // custom end getExchangeRateSellParam
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
      // custom begin postGSPayDepositParam

      // custom end postGSPayDepositParam
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
      // custom begin readMyTransactionParam

      // custom end readMyTransactionParam
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
      state = 99;
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
    const res = await prisma.transaction.findMany({
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
            id: true,
            gameUid: true,
            referralMap: {
              select: {
                referralId: true,
              },
            },
          },
        },
        transactionRecive: {
          select: {
            user: {
              select: {
                id: true,
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
    return res.map((e) => {
      const result = e;
      let state = e.state;
      if (e.timeout) {
        state = 98;
      }
      if (e.appeal) {
        state = 97;
      }
      return Object.assign(result, {
        state,
      });
    });

    // custom end readMyTransaction
  }
  async getPayPhoto(
      param: requestTypes.GetPayPhotoParams,
      customParam: any,
      // custom begin getPayPhotoParam

      // custom end getPayPhotoParam
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
      // custom begin readOneTransactionParam

      // custom end readOneTransactionParam
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
        timeout: true,
        appeal: true,
        expiredAt: true,
        paid: true,
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
    return res;
  }
  async updateTransaction(
      param: requestTypes.UpdateTransactionParams,
      customParam: any,
      // custom begin updateTransactionParam
      paid? : boolean,
      expiredAt?: Date,

      // custom end updateTransactionParam
  ) {
    // custom begin updateTransaction
    let data : { pairedAt: Date;} |
    {completedAt: Date;} |
    {expiredAt: Date;} |
    {state: number;} |
    {paid : boolean}|
    {
      paidAt: Date,
      transactionRecive: {
        create: {
          userId: string,
        },
      },
    };
    if (param.bodyState === 2) {
      if (paid) {
        data = {
          pairedAt: new Date(),
          paid,
        };
      } else {
        data = {
          expiredAt,
          pairedAt: new Date(),
          state: param.bodyState,
          transactionRecive: {
            create: {
              userId: customParam.userId,
            },
          },
        };
      }
    } else if (param.bodyState === 3) {
      data = {
        paidAt: new Date(),
        state: param.bodyState,
      };
    } else if (param.bodyState === 4) {
      data = {
        completedAt: new Date(),
        state: param.bodyState,
      };
    } else if (param.bodyState === 99) {
      data = {
        state: param.bodyState,
      };
    } else {
      return 'bodyState error';
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
        timeout: false,
        appeal: false,
      };
    } else if (state === 'processing') {
      where = {
        state: {
          gt: 1,
          lt: 4,
        },
        timeout: false,
        appeal: false,
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
            timeout: true,
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
            remark: true,
            referralMap: {
              select: {
                referralId: true,
              },
            },
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
      const result = e;
      let state = e.state;
      if (e.timeout) {
        state = 98;
      }
      if (e.appeal) {
        state = 97;
      }
      return Object.assign(result, {
        state,
        name: result.user?.name,
        gameUid: result.user?.gameUid,
        remark: result.user?.remark,
        referralCode: result.user?.referralMap?.referralId? referralCodeFormat(
          result.user?.referralMap?.referralId!): null,
      });
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
          lt: new Date(addDays(new Date(), 1)
              .toJSON().slice(0, 10).replace(/-/g, '/')),
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
  async readMyCountTransaction(
      userId: string,
      queryStartTime: string,
      queryEndTime: string,
  ) {
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
          gt: queryStartTime,
          lt: queryEndTime,
        },
      },
      _sum: {
        point: true,
        totalDollars: true,
        totalPoints: true,
        bonusPoint: true,
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
      dollars: res._sum.totalDollars??0,
      point: res._sum.point??0,
      totalPoints: res._sum.totalPoints??0,
      orderCount: res._count.id??0,
      bonusPoint: res._sum.bonusPoint??0,
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
        timeout: true,
        appeal: true,
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
    const res = await prisma.transactionSetting.findMany({
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async readUserFirstBonusAndRebate(id: string) {
    const res = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        firstBonus: true,
        firstBonusTemp: true,
        referralMap: {
          select: {
            referral: {
              select: {
                id: true,
                rebate: true,
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
  }
  async updateUserFirstBonus(
      id: string,
      firstBonus: boolean,
      firstBonusTemp: boolean,
  ) {
    const res = await prisma.user.update({
      where: {
        id,
      },
      data: {
        firstBonus,
        firstBonusTemp,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async updateUserFirstBonusCancel(
      id: string,
  ) {
    const res = await prisma.user.updateMany({
      where: {
        id,
        firstBonus: true,
      },
      data: {
        firstBonusTemp: true,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async updateUserAccumulation(id: string, amount: number) {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const res = await prisma.userAccumulatedReward.upsert({
      where: {
        uniqueReward: {
          startDate: monthStart,
          endDate: monthEnd,
          userId: id,
        },
      },
      create: {
        startDate: monthStart,
        endDate: monthEnd,
        userId: id,
        amount,
      },
      update: {
        amount: {
          increment: amount,
        },
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
