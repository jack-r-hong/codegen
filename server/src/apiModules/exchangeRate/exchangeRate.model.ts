import {Service} from 'typedi';
import {PrismaClient, ExchangeRate} from '@prisma/client';
import * as requestTypes from './exchangeRate.parameters';
import {errors} from '../../errors';

const prisma = new PrismaClient();

@Service()
export class ExchangeRateModel {
  async readManyBackstageExchangeRate(
      param: requestTypes.ReadManyBackstageExchangeRateParams,
  ) {
    const res: any[] | null = await prisma.exchangeRate.findMany({
      where: {
    bos: param.queryBos,
      },
      select: {
        bos: true,
        bouns: true,
        des: true,
        rangeLower: true,
        rangeUpper: true,
        rate: true,
        type: true,
        // custom begin readManyBackstageExchangeRate

        // custom end readManyBackstageExchangeRate
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
  async createOneBackstageExchangeRate(
      param: requestTypes.CreateOneBackstageExchangeRateParams,
  ) {
    const res: ExchangeRate | null = await prisma.exchangeRate.create({
      data: {
        bos: param.bodyBos,
        bouns: param.bodyBouns,
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
  async deleteOneBackstageExchangeRate(
      param: requestTypes.DeleteOneBackstageExchangeRateParams,
  ) {
    const res: ExchangeRate | null = await prisma.exchangeRate.delete({
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
  async updateOneBackstageExchangeRate(
      param: requestTypes.UpdateOneBackstageExchangeRateParams,
  ) {
    const res: ExchangeRate | null = await prisma.exchangeRate.update({
      where: {
        id: param.pathId,
      },
      data: {
        bouns: param.bodyBouns,
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
}
