import {Service} from 'typedi';
import * as Prisma from '@prisma/client';
import * as requestTypes from './exchangeRateBuy.parameters';
import {errors} from '../../errors';

const prisma = new Prisma.PrismaClient();

@Service()
export class ExchangeRateBuyModel {
  async readManyBackstageExchangeRateBuy(
      param: requestTypes.ReadManyBackstageExchangeRateBuyParams,
  ) {
    const res: any[] | null = await prisma.exchangeRateBuy.findMany({
      where: {
      },
      select: {
        bouns: true,
        des: true,
        dollars: true,
        id: true,
        point: true,
        type: true,
        // custom begin readManyBackstageExchangeRateBuy

        // custom end readManyBackstageExchangeRateBuy
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
  async createOneBackstageExchangeRateBuy(
      param: requestTypes.CreateOneBackstageExchangeRateBuyParams,
  ) {
    const res: Prisma.ExchangeRateBuy | null = await prisma.exchangeRateBuy.create({
      data: {
        bouns: param.bodyBouns,
        des: param.bodyDes,
        dollars: param.bodyDollars,
        point: param.bodyPoint,
        type: param.bodyType,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async deleteOneBackstageExchangeRateBuy(
      param: requestTypes.DeleteOneBackstageExchangeRateBuyParams,
  ) {
    const res: Prisma.ExchangeRateBuy | null = await prisma.exchangeRateBuy.delete({
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
  async updateOneBackstageExchangeRateBuy(
      param: requestTypes.UpdateOneBackstageExchangeRateBuyParams,
  ) {
    const res: Prisma.ExchangeRateBuy | null = await prisma.exchangeRateBuy.update({
      where: {
        id: param.pathId,
      },
      data: {
        bouns: param.bodyBouns,
        des: param.bodyDes,
        dollars: param.bodyDollars,
        point: param.bodyPoint,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  // custom begin model

  // custom end model
}
