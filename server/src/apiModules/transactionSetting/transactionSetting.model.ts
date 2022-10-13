import {Service} from 'typedi';
import * as Prisma from '@prisma/client';
import * as requestTypes from './transactionSetting.parameters';
import {errors} from '../../errors';

const prisma = new Prisma.PrismaClient();

@Service()
export class TransactionSettingModel {
  async getAllSetting(
      param: requestTypes.GetAllSettingParams,
      customParam: any,
  ) {
    // custom begin getAllSetting
    const res = await prisma.transactionSetting.findMany({
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end getAllSetting
  }
  async updateSetting(
      param: requestTypes.UpdateSettingParams,
      customParam: any,
  ) {
    // custom begin updateSetting
    enum ParamMap{
      AccumulatedReward = 'bodyAccumulatedReward',
      FirstReward = 'bodyFirstReward',
      AtmHandlingFee = 'bodyAtmHandlingFee',
      BarCodeHandlingFee = 'bodyBarCodeHandlingFee',
      ServiceFee = 'bodyServiceFee',
    }
    const res = await prisma.$transaction(
        (Object.keys(ParamMap) as (keyof typeof ParamMap)[]).map((key) => {
          return prisma.transactionSetting.update({
            data: {
              val: param[ParamMap[key]].toString(),
            },
            where: {
              key,
            },
          });
        }),
    ).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end updateSetting
  }
  // custom begin model

  // custom end model
}