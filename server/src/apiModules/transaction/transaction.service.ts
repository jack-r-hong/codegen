import {Service, Inject} from 'typedi';
import {TransactionModel} from './transaction.model';
import * as requestTypes from './transaction.parameters';
import {errors} from '../../errors';
// custom begin import
import {promises as fs} from 'fs';
import * as Prisma from '@prisma/client';
import {Container} from 'typedi';
import {WSClientIdModel,
  WSClientTransactionModel} from '../../redisClient/models/webSocketModels';
const wSCIModel = Container.get(WSClientIdModel);
const wSCTModel = Container.get(WSClientTransactionModel);
import {BankAccountModel} from '../bankAccount/bankAccount.model';
import {UserModel} from '../user/user.model';
import {ExchangeRateBuyModel} from '../exchangeRateBuy/exchangeRateBuy.model';
import {ExchangeRateSellModel} from '../exchangeRateSell/exchangeRateSell.model';
const transactionModel = new TransactionModel();
const bankAccountModel = new BankAccountModel();
const userModel = new UserModel();
const exchangeRateBuyModel = new ExchangeRateBuyModel();
const exchangeRateSellModel = new ExchangeRateSellModel();
const payMethodMap = {
  1: 'LinePay',
  2: '街口支付',
  3: '超商儲值',
  4: 'ATM轉帳',
};
async function calculationTransation(
    bos: number,
    buyOptionId: number | undefined,
    sellPoint: number | undefined,
    userId: string,
) {
  const res = {
    twd: 0,
    point: 0,
    bonusPoint: 0,
    firstBonusPoint: 0,
    handlingFee: 0,
    serviceFee: 0,
    totalPoints: 0,
    totalDollars: 0,
  };
  const transactionSetting = await transactionModel.readTransactionSetting();
  if (transactionSetting) {
    res.firstBonusPoint = transactionSetting.firstBonusPoint;
    res.handlingFee = transactionSetting.handlingFee;
    res.serviceFee = transactionSetting.serviceFee;
  }
  if (bos === 1) {
    if (!buyOptionId) {
      throw new Error('bodyBuyOptionId not found');
    }
    const setting =
      await exchangeRateBuyModel.readExchangeRateBuyById(buyOptionId);
    if (!setting) {
      throw new Error('bodyBuyOptionId not found');
    }
    const firstBonus = await transactionModel.readUserFirstBonus(userId);
    if (!firstBonus || !firstBonus.firstBonus) {
      res.firstBonusPoint = 0;
    }
    res.twd = setting.dollars;
    res.point = setting.point;
    res.bonusPoint = setting.bouns;
    res.totalPoints = res.point + res.bonusPoint + res.firstBonusPoint;
    res.totalDollars = res.twd + res.handlingFee + res.serviceFee;
  }
  if (bos === 2) {
    if (!sellPoint) {
      throw new Error('point not found');
    }
    const setting =
      await exchangeRateSellModel.readExchangeRateSellById(sellPoint);
    if (!setting) {
      throw new Error('sell setting no found');
    }
    res.point = sellPoint;
    res.twd = Math.floor(res.point / setting.rate);
    res.totalPoints = res.point;
    res.totalDollars = res.twd - res.handlingFee - res.serviceFee;
  }
  return res;
}

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
    console.log(session);
    const dbBankData = await bankAccountModel.readOneBankAccount(
        {pathId: param.bodyBankId},
    );
    const dbUserData = await userModel.getUserMyStatus(
        {},
        {userId: session.userInfo?.id!},
    );
    console.log(session);
    if (!dbUserData || dbUserData.userStatus !== 1) {
      console.log(dbUserData);
      /* todo throw error */
      throw new errors.CodeError('mesage', 403, -1);
    }
    const {
      twd,
      point,
      bonusPoint,
      firstBonusPoint,
      handlingFee,
      serviceFee,
      totalDollars,
      totalPoints,
    } = await calculationTransation(
        param.bodyBos,
        param.bodyBuyOptionId,
        param.bodyPoint,
        session.userInfo!.id,
    );
    if (firstBonusPoint !== 0) {
      await this.transactionModel.updateUserFirstBonus(
        session.userInfo?.id!,
        false);
    }
    const res = await this.transactionModel.createTransaction(
        param,
        {
          userId: session.userInfo?.id!,
          bankName: dbBankData.name,
          bankAccount: dbBankData.account,
          bankCode: dbBankData.code,
          twd,
          point,
          bonusPoint: bonusPoint + firstBonusPoint,
          account: dbUserData.gameUid??'',
          handlingFee,
          serviceFee,
          totalDollars,
          totalPoints,
        },
    ).catch((e) =>{
      throw e;
    });
    await wSCTModel.pub(JSON.stringify({}));
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
    const {
      twd,
      point,
      bonusPoint,
      totalDollars,
      totalPoints,
      firstBonusPoint,
      handlingFee,
      serviceFee,
    } = await calculationTransation(
        param.bodyBos,
        param.bodyBuyOptionId,
        param.bodyPoint,
        session.userInfo!.id,
    );
    return {
      totalPoints,
      point,
      bonusPoint,
      firstBonusPoint,
      totalDollars,
      dollars: twd,
      handlingFee,
      serviceFee,
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
    const transaction = await this.transactionModel.readTransaction(
        param.queryTransactionId);
    if (!transaction) {
      throw new errors.NotFindError;
    }
    if (transaction.bos === 1) {
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
    } else {
      const res = await this.transactionModel.readTransactionQrcode(
          transaction.userId,
      ).catch((e) =>{
        throw e;
      });
      if (res) {
        return res.data?.toString('base64');
      }
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
    let name = null;
    let gameUid = null;
    let receiveName = null;
    let receiveGameUid = null;
    if ( !res.user) {
      return;
    }
    if (res.bos === 2) {
      name = res.user.name;
      gameUid = res.user.gameUid;
      if (res.transactionRecive && res.transactionRecive.user) {
        receiveName = res.transactionRecive.user.name;
        receiveGameUid = res.transactionRecive.user.gameUid;
      }
    } else {
      receiveName = res.user.name;
      receiveGameUid = res.user.gameUid;
      if (res.transactionRecive && res.transactionRecive.user) {
        name = res.transactionRecive.user.name;
        gameUid = res.transactionRecive.user.gameUid;
      }
    }
    const flatten ={
      name,
      gameUid,
      receiveName,
      receiveGameUid,
    };
    delete (res as any).user;
    delete (res as any).transactionRecive;
    return Object.assign(res, flatten);

    // custom end readOneTransaction2
    return res;
  }
  async updateTransaction(
      param :requestTypes.UpdateTransactionParams,
      session: Express.Request['session'],
  ) {
    // custom begin updateTransaction
    const thisTransaciotn = await this.transactionModel.readCheckTransaction(
        param.pathId,
    );
    if (!thisTransaciotn) {
      throw new errors.NotFindError('thisTransaciotn');
    }
    const {bos, userId, state, transactionRecive} = thisTransaciotn;
    /** check is auth user */
    if (!session.userInfo) {
      throw new Error('userInfo not found');
    }
    switch (param.bodyState) {
      case 0:
        break;
      case 1:
      case 2:
        if (
          session.userInfo.isAgent &&
          userId !== session.userInfo.id &&
          state === 1
        ) {
          break;
        }
      case 3:
        if (state === 2) {
          if (
            bos === 1 &&
            userId === session.userInfo.id
          ) {
            break;
          }
          if (
            bos === 2 &&
            transactionRecive &&
            transactionRecive.userId === session.userInfo.id
          ) {
            break;
          }
        }
      case 4:
        if (state === 3) {
          if (
            bos === 1 &&
            session.userInfo.isAgent &&
            transactionRecive &&
            transactionRecive.userId === session.userInfo.id
          ) {
            break;
          }
          if (
            bos === 2 &&
            userId === session.userInfo.id
          ) {
            break;
          }
        }
      default:
        throw new errors.AuthenticationFailedError('updateTransaction');
    }
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
    return res;

    // custom end updateTransaction
  }
}

