import {Service} from 'typedi';
import * as Prisma from '@prisma/client';
import * as requestTypes from './chatroom.parameters';
import {errors} from '../../errors';

const prisma = new Prisma.PrismaClient();

@Service()
export class ChatroomModel {
  async serviceToken(
      param: requestTypes.ServiceTokenParams,
      customParam: any,
  ) {
    // custom begin serviceToken
    const res = await prisma.user.findUnique({
      where: {
        id: param.bodyUserId,
      },
      select: {
        id: true,
        name: true,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end serviceToken
  }
  async transactionToken(
      param: requestTypes.TransactionTokenParams,
      customParam: any,
  ) {
    // custom begin transactionToken
    const res = await prisma.transaction.findUnique({
      where: {
        id: param.bodyTransactionId,
      },
      select: {
        user: {
          select: {
            id: true,
            name: true,
            isAgent: true,
          },
        },
        transactionRecive: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                isAgent: true,
              },
            },
          },
        },
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end transactionToken
  }
  // custom begin model
  async createTransactionMessage(
      transactionId: string,
      userId: string,
      type: string,
      name: string,
      text: string,
      data: Buffer | undefined,
      role: number,
  ) {
    const res = await prisma.transactionChatroom.create({
      data: {
        transactionId,
        userId,
        data,
        type,
        name,
        text,
        role,
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
