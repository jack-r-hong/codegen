import {Service} from 'typedi';
import * as Prisma from '@prisma/client';
import * as requestTypes from './cashFlow.parameters';
import {errors} from '../../errors';

const prisma = new Prisma.PrismaClient();

@Service()
export class CashFlowModel {
  async customPage(
      param: requestTypes.CustomPageParams,
      customParam: any,
  ) {
    // custom begin customPage

    // custom end customPage
  }
  async notifyGrant(
      param: requestTypes.NotifyGrantParams,
      customParam: any,
  ) {
    // custom begin notifyGrant

    // custom end notifyGrant
  }
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
  async takeNumberSuccess(
      param: requestTypes.TakeNumberSuccessParams,
      customParam: any,
  ) {
    // custom begin takeNumberSuccess

    // custom end takeNumberSuccess
  }
  // custom begin model

  // custom end model
}
