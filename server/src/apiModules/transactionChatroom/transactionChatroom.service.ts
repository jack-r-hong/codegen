import {Service, Inject} from 'typedi';
import {TransactionChatroomModel} from './transactionChatroom.model';
import * as requestTypes from './transactionChatroom.parameters';
import {errors} from '../../errors';
// custom begin import

// custom end import


@Service()
export class TransactionChatroomService {
  @Inject()
  private transactionChatroomModel!: TransactionChatroomModel;

}

