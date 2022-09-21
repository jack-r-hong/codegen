import {Service} from 'typedi';
import {PrismaClient, TransactionChatroom} from '@prisma/client';
import * as requestTypes from './transactionChatroom.parameters';
import {errors} from '../../errors';

const prisma = new PrismaClient();

@Service()
export class TransactionChatroomModel {
  // custom begin model


  // custom end model
}
