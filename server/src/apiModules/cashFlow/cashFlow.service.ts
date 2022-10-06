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
}

