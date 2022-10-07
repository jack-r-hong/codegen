import {Service, Inject} from 'typedi';
import {CashFlowModel} from './cashFlow.model';
import * as requestTypes from './cashFlow.parameters';
import {errors} from '../../errors';
// custom begin import

// custom end import


@Service()
export class CashFlowService {
  @Inject()
  private cashFlowModel!: CashFlowModel;

  async customPage(
      param :requestTypes.CustomPageParams,
      session: Express.Request['session'],
  ) {
    // custom begin customPage

    // custom end customPage
  }
  async notifyGrant(
      param :requestTypes.NotifyGrantParams,
      session: Express.Request['session'],
  ) {
    // custom begin notifyGrant

    // custom end notifyGrant
  }
  async notifyPaid(
      param :requestTypes.NotifyPaidParams,
      session: Express.Request['session'],
  ) {
    // custom begin notifyPaid

    // custom end notifyPaid
  }
  async notifyTakeNumber(
      param :requestTypes.NotifyTakeNumberParams,
      session: Express.Request['session'],
  ) {
    // custom begin notifyTakeNumber

    // custom end notifyTakeNumber
  }
  async takeNumberSuccess(
      param :requestTypes.TakeNumberSuccessParams,
      session: Express.Request['session'],
  ) {
    // custom begin takeNumberSuccess

    // custom end takeNumberSuccess
  }
}

