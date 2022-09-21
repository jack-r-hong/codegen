import {Service} from 'typedi';
import * as Prisma from '@prisma/client';
import * as requestTypes from './chatroom.parameters';
import {errors} from '../../errors';

const prisma = new Prisma.PrismaClient();

@Service()
export class ChatroomModel {
  // custom begin model
  async createTransactionMessage(
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
  async getTransactionMessages(
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
  async createServiceMessage(
      userId: string,
      type: string,
      name: string,
      text: string,
      data: Buffer | undefined,
  ) {
    const res = await prisma.serviceChatroom.create({
      data: {
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
  async getServiceMessages(
      userId: string,
  ) {
    const res = await prisma.serviceChatroom.findMany({
      where: {
        userId,
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
