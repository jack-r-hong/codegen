import {Service} from 'typedi';
import * as Prisma from '@prisma/client';
import * as requestTypes from './cashFlow.parameters';
import {errors} from '../../errors';

const prisma = new Prisma.PrismaClient();

@Service()
export class CashFlowModel {
  async notifyPaid(
      param: requestTypes.NotifyPaidParams,
      customParam: any,
  ) {
    // custom begin notifyPaid

    // custom end notifyPaid
  }
  async notifyTakeNumber(
      param: requestTypes.NotifyTakeNumberParams,
      customParam: any,
  ) {
    // custom begin notifyTakeNumber

    // custom end notifyTakeNumber
  }
  // custom begin model

  // custom end model
}
