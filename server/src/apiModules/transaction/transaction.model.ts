import {Service} from 'typedi';
import {PrismaClient, Transaction} from '@prisma/client';
import * as requestTypes from './transaction.parameters';
import {errors} from '../../errors';

const prisma = new PrismaClient();

@Service()
export class TransactionModel {
  async readManyTransaction(
      param: requestTypes.ReadManyTransactionParams,
  ) {
    const res: any[] | null = await prisma.transaction.findMany({
      where: {
    userId: param.queryUserId,
      },
      select: {
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
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
  async readMyTransaction(
      param: requestTypes.ReadMyTransactionParams,
      customParam: any,
  ) {
    // custom begin readMyTransaction
    const res: any[] | null = await prisma.transaction.findMany({
      where: {
        userId: customParam.userId,
      },
      select: {
        point: true,
        state: true,
        twd: true,
        bos: true,
        bonusPoint: true,
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

    // custom end readMyTransaction
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
        userId: true,
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
