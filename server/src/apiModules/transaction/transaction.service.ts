import {Service, Inject} from 'typedi';
import {TransactionModel} from './transaction.model';
import * as requestTypes from './transaction.parameters';
import {errors} from '../../errors';
// custom begin import
import {promises as fs} from 'fs';
import {Container} from 'typedi';
import {WSClientIdModel,
  WSClientTransactionModel} from '../../redisClient/models/webSocketModels';
const wSCIModel = Container.get(WSClientIdModel);
const wSCTModel = Container.get(WSClientTransactionModel);
import {BankAccountModel} from '../bankAccount/bankAccount.model';
const bankAccountModel = new BankAccountModel();
const payMethodMap = {
  1: 'LinePay',
  2: '街口支付',
  3: '超商儲值',
  4: 'ATM轉帳',
};

// custom end import


@Service()
export class TransactionService {
  @Inject()
  private transactionModel!: TransactionModel;

  async createTransaction(
      param :requestTypes.CreateTransactionParams,
      session: Express.Request['session'],
  ) {
    // custom begin createTransaction
    const dbBankData = await bankAccountModel.readOneBankAccount(
        {pathId: param.bodyBankId},
    );
    if (!dbBankData) {
      /* todo throw error */
    }
    const res = await this.transactionModel.createTransaction(
        param,
        {
          userId: session.userInfo?.id,
          bankName: dbBankData.name,
          bankAccount: dbBankData.account,
          bankCode: dbBankData.code,
        },
    ).catch((e) =>{
      throw e;
    });

    await wSCTModel.pub(JSON.stringify(res));
    return res;

    // custom end createTransaction
  }
  async updateTransactionState(
      param :requestTypes.UpdateTransactionStateParams,
      session: Express.Request['session'],
  ) {
    // custom begin updateTransactionState
    if (!session.transaction) {
      return;
    }
    const res = await this.transactionModel.updateTransactionState(
        param,
        {
          userId: session.userInfo!.id,
          tId: session.transaction.id,
        },
    ).catch((e) =>{
      throw e;
    });
    if (param.bodyState) {
      await wSCIModel.pub(session.transaction.id,
          JSON.stringify({
            state: res.state,
          }),
      );
      session.transaction.process = param.bodyState;
    }
    if (param.bodyState === 4) {
      session.transaction = undefined;
    }
    await wSCTModel.pub(JSON.stringify(res));
    return res;

    // custom end updateTransactionState
  }
  async readPendingTransaction(
      param :requestTypes.ReadPendingTransactionParams,
      session: Express.Request['session'],
  ) {
    // custom begin readPendingTransaction
    const res = await this.transactionModel.readPendingTransaction(
        param,
        {},
    ).catch((e) =>{
      throw e;
    });
    return res;

    // custom end readPendingTransaction
  }
  async getTransactionCalculation(
      param :requestTypes.GetTransactionCalculationParams,
      session: Express.Request['session'],
  ) {
    // custom begin getTransactionCalculation
    return {
      'totalPoints': 1,
      'point': 1,
      'bonusPoint': 1,
      'firstBonusPoint': 1,
      'totalDollars': 1,
      'dollars': 1,
      'handlingFee': 1,
      'serviceFee': 1,
    };

    // custom end getTransactionCalculation
  }
  async getExchangeRateBuy(
      param :requestTypes.GetExchangeRateBuyParams,
      session: Express.Request['session'],
  ) {
    // custom begin getExchangeRateBuy
    const res = await this.transactionModel.getExchangeRateBuy(
        param,
        {},
    ).catch((e) =>{
      throw e;
    });
    return res;

    // custom end getExchangeRateBuy
  }
  async getExchangeRateSell(
      param :requestTypes.GetExchangeRateSellParams,
      session: Express.Request['session'],
  ) {
    // custom begin getExchangeRateSell
    const res = await this.transactionModel.getExchangeRateSell(
        param,
        {},
    ).catch((e) =>{
      throw e;
    });
    return res;

    // custom end getExchangeRateSell
  }
  async readMyTransaction(
      param :requestTypes.ReadMyTransactionParams,
      session: Express.Request['session'],
  ) {
    // custom begin readMyTransaction
    const res = await this.transactionModel.readMyTransaction(
        param,
        {userId: session.userInfo?.id, isAgent: session.userInfo?.isAgent},
    ).catch((e) =>{
      throw e;
    });

    return {
      'total': {
        'point': 2000,
        'bonusPoint': 1000,
        'totalPoint': 3000,
        'twd': 4000,
      },
      'dataList': res.map((e) => {
        const res = e;
        if (session.userInfo?.isAgent && res.userId !== session.userInfo?.id) {
          if (res.bos === 1) {
            res.bos = 2;
          } else {
            res.bos = 1;
          }
        }

        if (res.transactionRecive) {
          res.counterpartyGameUid = res.transactionRecive.user.gameUid;
        } else {
          res.counterpartyGameUid = null;
        }
        res.selfGameUid = res.user.gameUid;
        delete res.transactionRecive;
        delete res.user;
        delete res.userId;
        Object.assign(e, {
          payMethod: payMethodMap[e.payMethod as 1|2|3|4],
        });
        return res;
      }),
    };
    return res;

    // custom end readMyTransaction
  }
  async getPayPhoto(
      param :requestTypes.GetPayPhotoParams,
      session: Express.Request['session'],
  ) {
    // custom begin getPayPhoto
    const res = await this.transactionModel.getPayPhoto(
        param,
        {userId: session.userInfo?.id},
    ).catch((e) =>{
      throw e;
    });
    if (res && res.qrCode) {
      const photo = await fs.readFile( res.qrCode, 'base64');
      return photo;
    }
    throw new errors.NotFindError;

    // custom end getPayPhoto
  }
  async readOneTransaction(
      param :requestTypes.ReadOneTransactionParams,
      session: Express.Request['session'],
  ) {
    // custom begin readOneTransaction

    // custom end readOneTransaction

    const res = await this.transactionModel.readOneTransaction(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin readOneTransaction2

    // custom end readOneTransaction2
    return res;
  }
  async updateTransaction(
      param :requestTypes.UpdateTransactionParams,
      session: Express.Request['session'],
  ) {
    // custom begin updateTransaction
    const res = await this.transactionModel.updateTransaction(
        param,
        {userId: session.userInfo?.id},
    ).catch((e) =>{
      throw e;
    });
    if (!session.transaction) {
      session.transaction = {
        id: param.pathId,
        requestUserId: res.userId,
        receiveUserId: session.userInfo!.id,
        process: res.state,
        bos: res.bos,
      };
    }
    if (typeof param.bodyState === 'number') {
      await wSCIModel.pub(
          param.pathId,
          JSON.stringify({
            state: res.state,
          }),
      );
      await wSCTModel.pub(JSON.stringify(res));
      session.transaction.process = param.bodyState;
    }
    if (param.bodyState === 4) {
      session.transaction = undefined;
    }
    return res;

    // custom end updateTransaction
  }
}

