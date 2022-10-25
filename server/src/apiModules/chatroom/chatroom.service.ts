import {Service, Inject} from 'typedi';
import {ChatroomModel} from './chatroom.model';
import * as requestTypes from './chatroom.parameters';
import {errors} from '../../errors';
// custom begin import
import {chatroomKey} from '../../jwt';

// custom end import


@Service()
export class ChatroomService {
  @Inject()
  private chatroomModel!: ChatroomModel;
  // custom begin Inject

  // custom end Inject

  async serviceToken(
      param :requestTypes.ServiceTokenParams,
      session: Express.Request['session'],
  ) {
    // custom begin serviceToken
    const res = await this.chatroomModel.serviceToken(param, {})
        .catch((e) => {
          throw e;
        });
    if (!res) {
      throw errors.UserNotAuthorized;
    }
    if (res && res.id === session.userInfo?.id) {
      return chatroomKey.generateAccessToken({
        userName: res.name?? '',
        userId: res.id,
      });
    }
    throw errors.UserNotAuthorized;

    // custom end serviceToken
  }
  async transactionServiceToken(
      param :requestTypes.TransactionServiceTokenParams,
      session: Express.Request['session'],
  ) {
    // custom begin transactionServiceToken
    return chatroomKey.generateAccessToken({
      transactionId: param.bodyTransactionId,
      userName: 'CS',
      userId: 'CS',
      isAgent: false,
      isCS: true,
    });

    // custom end transactionServiceToken
  }
  async transactionToken(
      param :requestTypes.TransactionTokenParams,
      session: Express.Request['session'],
  ) {
    // custom begin transactionToken
    const res = await this.chatroomModel.transactionToken(param, {})
        .catch((e) => {
          throw e;
        });
    if (!res) {
      throw errors.UserNotAuthorized;
    }
    if (res.user && res.user.id === session.userInfo?.id) {
      return chatroomKey.generateAccessToken({
        transactionId: param.bodyTransactionId,
        userName: res.user.name?? '',
        userId: res.user.id,
        isAgent: res.user.isAgent,
        isCS: false,
      });
    }
    if (res.transactionRecive &&
      res.transactionRecive.user &&
      res.transactionRecive.user.id === session.userInfo?.id
    ) {
      return chatroomKey.generateAccessToken({
        transactionId: param.bodyTransactionId,
        userName: res.transactionRecive.user.name?? '',
        userId: res.transactionRecive.user.id,
        isAgent: res.transactionRecive.user.isAgent,
        isCS: false,
      });
    }
    throw errors.UserNotAuthorized;

    // custom end transactionToken
  }
}

