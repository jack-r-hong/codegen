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
      throw new errors.AuthenticationFailedError;
    }
    if (res && res.id === session.userInfo?.id) {
      return chatroomKey.generateAccessToken({
        userName: res.name?? '',
        userId: res.id,
      });
    }
    throw new errors.AuthenticationFailedError;

    // custom end serviceToken
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
      throw new errors.AuthenticationFailedError;
    }
    if (res.user && res.user.id === session.userInfo?.id) {
      return chatroomKey.generateAccessToken({
        transactionId: param.bodyTransactionId,
        userName: res.user.name?? '',
        userId: res.user.id,
        isAgent: res.user.isAgent,
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
      });
    }
    throw new errors.AuthenticationFailedError;

    // custom end transactionToken
  }
}

