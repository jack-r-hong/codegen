import {Service} from 'typedi';
import * as Prisma from '@prisma/client';
import * as requestTypes from './chatroom.parameters';
import {errors} from '../../errors';
// custom begin import

// custom end import

const prisma = new Prisma.PrismaClient();

@Service()
export class ChatroomModel {
  async transactionServiceToken(
      param: requestTypes.TransactionServiceTokenParams,
      customParam: any,
      // custom begin transactionServiceTokenParam

      // custom end transactionServiceTokenParam
  ) {
    // custom begin transactionServiceToken

    // custom end transactionServiceToken
  }
  async transactionToken(
      param: requestTypes.TransactionTokenParams,
      customParam: any,
      // custom begin transactionTokenParam

      // custom end transactionTokenParam
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
  async userToken(
      param: requestTypes.UserTokenParams,
      customParam: any,
      // custom begin userTokenParam

      // custom end userTokenParam
  ) {
    // custom begin userToken
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

    // custom end userToken
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
    const res = await prisma.transactionChatroomMessange.create({
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
    const res = await prisma.transactionChatroomMessange.findMany({
      where: {
        transactionId,
      },
      select: {
        id: true,
        transactionId: true,
        name: true,
        userId: true,
        role: true,
        text: true,
        type: true,
        data: true,
        createdAt: true,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async getTransactionCursor(
      transactionId: string,
      userId: string,
  ) {
    const res = await prisma.transactionChatroomCursor.findUnique({
      where: {
        uniqueUserCursorId: {
          transactionId,
          userId,
        },
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async getManyTransactionServiceCursor(
      userId: string,
  ) {
    const res = await prisma.transactionChatroomCursor.findMany({
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
  async getTransactionUnread(
      cursorArray: {
        transactionId: string,
        cursor: number,
      }[],
  ) {
    const res = await prisma.$transaction(cursorArray.map((e) => {
      return prisma.transactionChatroomMessange.count({
        where: {
          transactionId: e.transactionId,
          id: {
            gt: e.cursor,
          },
        },
      });
    })).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async getManyTransactionRoomLastMessage(
  ) {
    const res = await prisma.transactionChatroomMessange.findMany({
      distinct: ['transactionId'],
      orderBy: {
        id: 'desc',
      },
      take: 50,
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async upsertTransactionCursor(
      transactionId: string,
      userId: string,
  ) {
    const findRes = await prisma.transactionChatroomMessange.findFirst({
      where: {
        transactionId,
      },
      orderBy: {
        id: 'desc',
      },
    })
        .catch((e) => {
          throw e;
        }).finally(() => {
          prisma.$disconnect();
        });
    const cursor = findRes? findRes.id : 0;
    const res = await prisma.transactionChatroomCursor.upsert({
      create: {
        transactionId,
        userId,
        cursor,
      },
      update: {
        cursor,
      },
      where: {
        uniqueUserCursorId: {
          transactionId,
          userId,
        },
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async getUserCursor(
      roomId: string,
      userId: string,
  ) {
    const res = await prisma.userChatroomCursor.findUnique({
      where: {
        uniqueUserCursorId: {
          roomId,
          userId,
        },
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async upsertUserCursor(
      roomId: string,
      userId: string,
  ) {
    const findRes = await prisma.userChatroomMessange.findFirst({
      where: {
        roomId,
      },
      orderBy: {
        id: 'desc',
      },
    })
        .catch((e) => {
          throw e;
        }).finally(() => {
          prisma.$disconnect();
        });
    const cursor = findRes? findRes.id : 0;
    const res = await prisma.userChatroomCursor.upsert({
      create: {
        roomId,
        userId,
        cursor,
      },
      update: {
        cursor,
      },
      where: {
        uniqueUserCursorId: {
          roomId,
          userId,
        },
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async createUserChatroomMessage(
      userId: string,
      type: string,
      name: string,
      text: string,
      data: Buffer | undefined,
      role: number,
      roomId: string,
  ) {
    const res = await prisma.userChatroomMessange.create({
      data: {
        roomId,
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
  async getUserChatroomMessages(
      userId: string,
  ) {
    const res = await prisma.userChatroomMessange.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        name: true,
        userId: true,
        role: true,
        text: true,
        data: true,
        type: true,
        createdAt: true,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async getManyUserChatroomServiceCursor(
      userId: string,
  ) {
    const res = await prisma.userChatroomCursor.findMany({
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
  async getManyUserRoomLastMessage(
  ) {
    const res = await prisma.userChatroomMessange.findMany({
      distinct: ['roomId'],
      orderBy: {
        id: 'desc',
      },
      take: 50,
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async getUserChatroomUnread(
      cursorArray: {
      userId: string,
      cursor: number,
    }[],
  ) {
    const res = await prisma.$transaction(cursorArray.map((e) => {
      return prisma.userChatroomMessange.count({
        where: {
          userId: e.userId,
          id: {
            gt: e.cursor,
          },
        },
      });
    })).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }

  // custom end model
}
