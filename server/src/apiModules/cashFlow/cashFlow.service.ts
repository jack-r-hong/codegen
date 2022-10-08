import {Service, Inject} from 'typedi';
import {CashFlowModel} from './cashFlow.model';
import * as requestTypes from './cashFlow.parameters';
import {errors} from '../../errors';
// custom begin import
import {Container} from 'typedi';
import {WSClientIdModel} from '../../redisClient/models/webSocketModels';
import {TransactionModel} from '../transaction/transaction.model';
const wSCIModel = Container.get(WSClientIdModel);
const transactionModel = Container.get(TransactionModel);

// custom end import


@Service()
export class CashFlowService {
  @Inject()
  private cashFlowModel!: CashFlowModel;
  // custom begin Inject

  // custom end Inject

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
    if (param.bodyStatus !== 'settled') {
      return;
    }
    const tranRes = await transactionModel.readOneTransaction({
      pathId: param.bodyMemberOrderNo,
    });
    if (tranRes.state !== 2) {
      return;
    }
    const res = await transactionModel.updateTransaction({
      bodyState: 3,
      pathId: param.bodyMemberOrderNo,
    }, {});
    await wSCIModel.pub(param.bodyMemberOrderNo,
        JSON.stringify({
          state: res.state,
        }),
    );

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

