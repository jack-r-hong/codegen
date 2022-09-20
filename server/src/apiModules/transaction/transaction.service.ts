import {Service, Inject} from 'typedi';
import {TransactionModel} from './transaction.model';
import * as requestTypes from './transaction.parameters';
import {errors} from '../../errors';
// custom begin import
import {promises as fs} from 'fs';
import {Container} from 'typedi';
import {WSClientIdModel} from '../../redisClient/models/webSocketModels';
const wSCIModel = Container.get(WSClientIdModel);
import {BankAccountModel} from '../bankAccount/bankAccount.model';
const bankAccountModel = new BankAccountModel();

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
    session.transaction = {
      id: res.id,
      process: 1,
      requestUserId: res.userId,
      receiveUserId: '',
      bos: res.bos,
    };
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
  async getExchangeRate(
      param :requestTypes.GetExchangeRateParams,
      session: Express.Request['session'],
  ) {
    // custom begin getExchangeRate
    const res = await this.transactionModel.getExchangeRate(
        param,
        {},
    ).catch((e) =>{
      throw e;
    });
    return res;

    // custom end getExchangeRate
  }
  async readMyTransaction(
      param :requestTypes.ReadMyTransactionParams,
      session: Express.Request['session'],
  ) {
    // custom begin readMyTransaction
    const res = await this.transactionModel.readMyTransaction(
        param,
        {userId: session.userInfo?.id},
    ).catch((e) =>{
      throw e;
    });
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
      session.transaction.process = param.bodyState;
    }
    if (param.bodyState === 4) {
      session.transaction = undefined;
    }
    return res;

    // custom end updateTransaction
  }
}

