import {Service, Inject} from 'typedi';
import {TransactionModel} from './transaction.model';
import * as requestTypes from './transaction.parameters';
import {errors} from '../../errors';
// custom begin import
import {promises as fs} from 'fs';
import {Container} from 'typedi';
import {
  WSClientIdModel,
  WSClientTransactionModel,
  SubscribeExpiredeModel} from '../../redisClient/models/webSocketModels';
const wSCIModel = Container.get(WSClientIdModel);
const wSCTModel = Container.get(WSClientTransactionModel);
import {BankAccountModel} from '../bankAccount/bankAccount.model';
import {UserModel} from '../user/user.model';
import {ExchangeRateBuyModel} from '../exchangeRateBuy/exchangeRateBuy.model';
import {ExchangeRateSellModel}
  from '../exchangeRateSell/exchangeRateSell.model';
import {
  getGSPayDeposit,
  getGSPayQuery,
} from '../../utils/axiosGSPay';
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
    payMethod: number,
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
    rebateRate: 0,
    rebate: 0,
  };
  let rebateRate = null;
  let referralId = null;
  const transactionSetting = await transactionModel.readTransactionSetting();
  if (transactionSetting) {
    transactionSetting.forEach((e) => {
      switch (e.key) {
        case 'FirstReward':
          res.firstBonusPoint = e.val;
          break;
        case 'AtmHandlingFee':
          if (payMethod === 4) {
            res.handlingFee = e.val;
          }
          break;
        case 'BarCodeHandlingFee':
          if (payMethod === 3) {
            res.handlingFee = e.val;
          }
          break;
        case 'ServiceFee':
          res.serviceFee = e.val;
          break;
      }
    });
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
    const dbData = await transactionModel.
        readUserFirstBonusAndRebate(userId);
    if (!dbData || !dbData.firstBonus || !dbData.firstBonusTemp) {
      res.firstBonusPoint = 0;
    }
    if (dbData && dbData.referralMap && dbData.referralMap.referral) {
      res.rebate = dbData.referralMap.referral.rebate
          .mul(setting.dollars).floor().toNumber();
      rebateRate = dbData.referralMap.referral.rebate;
      referralId = dbData.referralMap.referral.id;
    }
    res.twd = setting.dollars;
    res.point = setting.point;
    res.bonusPoint = setting.bouns;
    res.totalPoints = res.point + res.bonusPoint + res.firstBonusPoint -
      res.handlingFee - res.serviceFee;
    res.totalDollars = res.twd;
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
    res.totalPoints = (res.point - res.handlingFee - res.serviceFee);
    res.twd = Math.floor(res.totalPoints / setting.rate);
    res.totalDollars = res.twd;
  }
  return Object.assign(res, {rebateRate, referralId});
}
/**
 * 過期訂單
 */
const expiredTranId = 'expiredTranId';
const peddingTimeout = 5 * 60;
const payTimeout = 65 * 60;
const subscribeExpiredeModel = Container.get(SubscribeExpiredeModel);
subscribeExpiredeModel.sub((key) => {
  if (key.match(/^expiredTranId/) ) {
    wSCTModel.pub(JSON.stringify({}));
    transactionModel.updateTransactionTimeout(
        key.substring(expiredTranId.length),
        true,
    )
        .then((res) => {
          wSCIModel.pub(
              res.id,
              JSON.stringify({
                state: res.state,
              }),
          );
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
  }
});

// custom end import


@Service()
export class TransactionService {
  @Inject()
  private transactionModel!: TransactionModel;
  // custom begin Inject

  // custom end Inject

  async createTransaction(
      param :requestTypes.CreateTransactionParams,
      session: Express.Request['session'],
  ) {
    // custom begin createTransaction
    let bankData: any = {
      name: '',
      account: 0,
      code: 0,
    };
    if (param.bodyPayMethod === 4) {
      if (param.bodyBankId) {
        const dbBankData = await bankAccountModel.readOneBankAccount(
            {pathId: param.bodyBankId},
        );
        bankData = {
          name: dbBankData.name,
          account: dbBankData.account,
          code: dbBankData.code,
        };
      } else {
        throw new errors.CodeError('bankId not found', 400, -3010);
      }
    }
    const dbUserData = await userModel.getUserMyStatus(
        {},
        {userId: session.userInfo?.id!},
    );
    if (!dbUserData || dbUserData.userStatus !== 1) {
      throw new errors.CodeError('user no auth', 403, -3011);
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
      rebateRate,
      rebate,
      referralId,
    } = await calculationTransation(
        param.bodyBos,
        param.bodyBuyOptionId,
        param.bodyPoint,
        session.userInfo!.id,
        param.bodyPayMethod,
    );
    if (totalDollars < 0 || totalPoints < 0) {
      throw new errors.CodeError('Dollars or points less than zero.',
          400, -3013);
    }
    if (firstBonusPoint !== 0) {
      await this.transactionModel.updateUserFirstBonus(
        session.userInfo?.id!,
        true,
        false);
    }
    const res = await this.transactionModel.createTransaction(
        param,
        {},
        {
          account: dbUserData.gameUid??'',
          bonusPoint: bonusPoint + firstBonusPoint,
          point,
          twd,
          userId: session.userInfo?.id!,
          bankAccount: bankData.account,
          bankCode: bankData.code,
          bankName: bankData.name,
          handlingFee,
          serviceFee,
          totalDollars,
          totalPoints,
          rebate,
          rebateRate,
          referralId,
        },
    ).catch((e) =>{
      throw e;
    });
    await wSCTModel.pub(JSON.stringify({}));
    await subscribeExpiredeModel.setExpirKey(
        `${expiredTranId}${res.id}`, peddingTimeout);
    return res;

    // custom end createTransaction
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
        param.bodyPayMethod,
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
  async postGSPayDeposit(
      param :requestTypes.PostGSPayDepositParams,
      session: Express.Request['session'],
  ) {
    // custom begin postGSPayDeposit
    const gsPayQuery = await getGSPayQuery({
      memberOrderNo: param.bodyTransactionId,
    }).catch((err) => {
      return err.response.data.code;
    });
    if (gsPayQuery !== 4021 && gsPayQuery.data) {
      if (param.bodyType === 3) {
        const res = {
          'orderNo': gsPayQuery.data.data.OrderNo,
          'memberOrderNo': gsPayQuery.data.data.MemberOrderNo,
          'amount': gsPayQuery.data.data.Amount,
          'status': gsPayQuery.data.data.Status,
          'bankName': gsPayQuery.data.data.BankName,
          'paymentInfo': gsPayQuery.data.data.PaymentInfo,
        };
        return res;
      }
      if (param.bodyType === 4) {
        const res = {
          'orderNo': gsPayQuery.data.data.OrderNo,
          'memberOrderNo': gsPayQuery.data.data.MemberOrderNo,
          'amount': gsPayQuery.data.data.Amount,
          'status': gsPayQuery.data.data.Status,
          'paymentInfo': gsPayQuery.data.data.PaymentInfo,
        };
        return res;
      }
    }
    const db = await this.transactionModel.postGSPayDeposit(param, {});
    if (db) {
      const res = await getGSPayDeposit({
        amount: db.totalDollars.toString(),
        clinetAccount: db.user!.phonePrefix! + db.user!.phone!,
        dueTime: '1',
        memberOrderNo: param.bodyTransactionId,
        memo: '我是memo要顯示什麼?',
        productName: `${db.point} 大頭家幣`,
        gateway: param.bodyType,
      })
          .catch((err) => {
            throw new errors.CodeError(
                err.response.data.msg,
                err.response.data.code,
                -3003);
          });
      return res.data;
    }
    throw new errors.CodeError('post gspay: order not found', 404, -3004);

    // custom end postGSPayDeposit
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
    const res2 = await this.transactionModel.readMyCountTransaction(
        session.userInfo?.id!,
        param.queryStartTime,
        param.queryEndTime,
    );
    return {
      'total': {
        'point': res2.point,
        'bonusPoint': res2.bonusPoint,
        'totalPoint': res2.totalPoints,
        'twd': res2.dollars,
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
        let selfGameUid: any = null;
        let counterpartyGameUid: any = null;
        if (res.transactionRecive) {
          if (res.transactionRecive.user!.id === session.userInfo!.id ) {
            selfGameUid = res.transactionRecive.user!.gameUid;
          } else {
            counterpartyGameUid = res.transactionRecive.user!.gameUid;
          }
        }
        if (session.userInfo!.id === res.user!.id) {
          selfGameUid = res.user!.gameUid;
        } else {
          counterpartyGameUid = res.user!.gameUid;
        }
        delete (res as any).transactionRecive;
        delete (res as any).user;
        delete (res as any).userId;
        Object.assign(e, {
          payMethod: payMethodMap[e.payMethod as 1|2|3|4],
          selfGameUid,
          counterpartyGameUid,
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
        return {
          photo,
          code: res.code,
        };
      }
    } else {
      const res = await this.transactionModel.readTransactionQrcode(
          transaction.userId,
      ).catch((e) =>{
        throw e;
      });
      if (res) {
        return {
          photo: res.data?.toString('base64'),
          code: res.code,
        };
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
    if (
      param.bodyState === 2 &&
      session.userInfo.isAgent &&
      userId !== session.userInfo.id &&
      state === 1
    ) {} else if (
      param.bodyState === 3 &&
      state === 2 &&
      (
        (
          bos === 1 &&
          userId === session.userInfo.id
        ) || (
          bos === 2 &&
          transactionRecive &&
          transactionRecive.userId === session.userInfo.id
        )
      )
    ) {} else if (
      param.bodyState === 4 &&
      state === 3 &&
      (
        (
          bos === 1 &&
          session.userInfo.isAgent &&
          transactionRecive &&
          transactionRecive.userId === session.userInfo.id
        ) || (
          bos === 2 &&
          userId === session.userInfo.id
        )
      )
    ) {} else if (
      param.bodyState === 99
    ) {} else {
      throw new errors.CodeError('updateTransaction', 403, -3005);
    }
    const res = await this.transactionModel.updateTransaction(
        param,
        {userId: session.userInfo?.id},
    ).catch((e) =>{
      throw e;
    });
    if (res === 'bodyState error') {
      throw new errors.CodeError('updateTransaction', 403, -3005);
    }
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
      if (res.state === 2) {
        await subscribeExpiredeModel.setExpirKey(
            `${expiredTranId}${res.id}`, payTimeout);
      }
      if (res.state === 3 || res.state === 99) {
        await subscribeExpiredeModel.del(res.id);
      }
      if (res.state === 99) {
        await this.transactionModel.updateUserFirstBonusCancel(res.userId);
      }
      if (res.state === 4) {
        await this.transactionModel.updateUserAccumulation(res.userId, res.twd);
        await this.transactionModel.updateUserFirstBonus(
          session.userInfo?.id!,
          false,
          false);
      }
    }
    return res;

    // custom end updateTransaction
  }
}

