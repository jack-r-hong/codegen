import {Service} from 'typedi';
import {PrismaClient, TransactionChatroom} from '@prisma/client';
import * as requestTypes from './transactionChatroom.parameters';
import {errors} from '../../errors';

const prisma = new PrismaClient();

@Service()
export class TransactionChatroomModel {
  // custom begin model
  async createMessage(
      transactionId: string,
      userId: string,
      type: string,
      name: string,
      text: string,
      data: Buffer | undefined,
  ) {
    const res = await prisma.transactionChatroom.create({
      data: {
        transactionId,
        userId,
        data,
        type,
        name,
        text,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async getMessages(
      transactionId: string,
  ) {
    const res = await prisma.transactionChatroom.findMany({
      where: {
        transactionId,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }

  // custom end model
}
