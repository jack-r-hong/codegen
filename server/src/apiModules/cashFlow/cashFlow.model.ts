import {Service} from 'typedi';
import * as Prisma from '@prisma/client';
import * as requestTypes from './cashFlow.parameters';
import {errors} from '../../errors';
// custom begin import

// custom end import

const prisma = new Prisma.PrismaClient();

@Service()
export class CashFlowModel {
  async customPage(
      param: requestTypes.CustomPageParams,
      customParam: any,
      // custom begin customPageParam

      // custom end customPageParam
  ) {
    // custom begin customPage

    // custom end customPage
  }
  async notifyGrant(
      param: requestTypes.NotifyGrantParams,
      customParam: any,
      // custom begin notifyGrantParam

      // custom end notifyGrantParam
  ) {
    // custom begin notifyGrant

    // custom end notifyGrant
  }
  async notifyPaid(
      param: requestTypes.NotifyPaidParams,
      customParam: any,
      // custom begin notifyPaidParam

      // custom end notifyPaidParam
  ) {
    // custom begin notifyPaid

    // custom end notifyPaid
  }
  async notifyTakeNumber(
      param: requestTypes.NotifyTakeNumberParams,
      customParam: any,
      // custom begin notifyTakeNumberParam

      // custom end notifyTakeNumberParam
  ) {
    // custom begin notifyTakeNumber

    // custom end notifyTakeNumber
  }
  async takeNumberSuccess(
      param: requestTypes.TakeNumberSuccessParams,
      customParam: any,
      // custom begin takeNumberSuccessParam

      // custom end takeNumberSuccessParam
  ) {
    // custom begin takeNumberSuccess

    // custom end takeNumberSuccess
  }
  // custom begin model

  // custom end model
}
