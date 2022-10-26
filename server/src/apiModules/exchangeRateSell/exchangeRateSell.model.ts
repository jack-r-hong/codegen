import {Service} from 'typedi';
import * as Prisma from '@prisma/client';
import * as requestTypes from './exchangeRateSell.parameters';
import {errors} from '../../errors';
// custom begin import

// custom end import

const prisma = new Prisma.PrismaClient();

@Service()
export class ExchangeRateSellModel {
  async readManyBackstageExchangeRateSell(
      param: requestTypes.ReadManyBackstageExchangeRateSellParams,
      // custom begin readManyBackstageExchangeRateSellParam

      // custom end readManyBackstageExchangeRateSellParam
  ) {
    const res = await prisma.exchangeRateSell.findMany({
      where: {
      // custom begin readManyBackstageExchangeRateSellWhere

      // custom end readManyBackstageExchangeRateSellWhere
      },
      select: {
        des: true,
        id: true,
        rangeLower: true,
        rangeUpper: true,
        rate: true,
        type: true,
        // custom begin readManyBackstageExchangeRateSell

        // custom end readManyBackstageExchangeRateSell
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
  }
  async createOneBackstageExchangeRateSell(
      param: requestTypes.CreateOneBackstageExchangeRateSellParams,
      // custom begin createOneBackstageExchangeRateSellParam

      // custom end createOneBackstageExchangeRateSellParam
  ) {
    const res = await prisma.exchangeRateSell.create({
      data: {
        des: param.bodyDes,
        rangeLower: param.bodyRangeLower,
        rangeUpper: param.bodyRangeUpper,
        rate: param.bodyRate,
        type: param.bodyType,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async deleteOneBackstageExchangeRateSell(
      param: requestTypes.DeleteOneBackstageExchangeRateSellParams,
      // custom begin deleteOneBackstageExchangeRateSellParam

      // custom end deleteOneBackstageExchangeRateSellParam
  ) {
    const res = await prisma.exchangeRateSell.delete({
      where: {
        id: param.pathId,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async updateOneBackstageExchangeRateSell(
      param: requestTypes.UpdateOneBackstageExchangeRateSellParams,
      // custom begin updateOneBackstageExchangeRateSellParam

      // custom end updateOneBackstageExchangeRateSellParam
  ) {
    const res = await prisma.exchangeRateSell.update({
      where: {
        id: param.pathId,
      },
      data: {
        des: param.bodyDes,
        rangeLower: param.bodyRangeLower,
        rangeUpper: param.bodyRangeUpper,
        rate: param.bodyRate,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  // custom begin model
  async readExchangeRateSellById(
      pirce: number,
  ) {
    const res: Prisma.ExchangeRateSell | null = await prisma.exchangeRateSell.findFirst({
      where: {
        rangeUpper: {
          gte: pirce,
        },
        rangeLower: {
          lte: pirce,
        },
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
