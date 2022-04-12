import {Service} from 'typedi';
import {PrismaClient, User} from '@prisma/client';
import * as requestTypes from './user.parameters';
import {errors} from '../../errors';

const prisma = new PrismaClient();

@Service()
export class UserModel {
  async googleLogin(
      param: requestTypes.GoogleLoginParams,
      customParam: any,
  ) {
    // custom begin googleLogin
    const select = {
      email: true,
      id: true,
      updatedAt: true,
      username: true,
      auth: {
        select: {
          role: true,
        },
      },
      userStatus: true,
      googleId: true,
    };
    const googleIdExists = await prisma.user.findUnique({
      where: {
        googleId: param.bodyId,
      },
      select,
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    if (googleIdExists) return googleIdExists;
    else {
      return await prisma.user.findUnique({
        where: {
          email: param.bodyEmail,
        },
        select,
      }).catch((e) => {
        throw e;
      }).finally(() => {
        prisma.$disconnect();
      });
    }

    // custom end googleLogin
  }
  async loginUser(
      param: requestTypes.LoginUserParams,
      customParam: any,
  ) {
    // custom begin loginUser
    const select = {
      email: true,
      password: true,
      id: true,
      updatedAt: true,
      username: true,
      auth: {
        select: {
          role: true,
        },
      },
      googleId: true,
      userStatus: true,
    };
    const res = await prisma.user.findUnique({
      where: {
        email: param.bodyEmail,
      },
      select,
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end loginUser
  }
  async logoutUser(
      param: requestTypes.LogoutUserParams,
      customParam: any,
  ) {
    // custom begin logoutUser

    // custom end logoutUser
  }
  async registerUser(
      param: requestTypes.RegisterUserParams,
      customParam: any,
  ) {
    // custom begin registerUser
    const res: User | null = await prisma.user.create({
      data: {
        authLevel: param.bodyAuthLevel,
        email: param.bodyEmail,
        phone: param.bodyPhone,
        userStatus: param.bodyUserStatus,
        username: param.bodyUsername,
        password: customParam.password,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end registerUser
  }
  async deleteOneUser(
      param: requestTypes.DeleteOneUserParams,
  ) {
    const res: User | null = await prisma.user.delete({
      where: {
        id: param.pathId,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async readOneUser(
      param: requestTypes.ReadOneUserParams,
  ) {
    const res: any | null = await prisma.user.findUnique({
      where: {
        id: param.pathId,
      },
      select: {
        createdAt: true,
        email: true,
        id: true,
        phone: true,
        updatedAt: true,
        username: true,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });

    if (res === null) {
      throw new errors.NotFindError;
    }
    return res;
  }
  async updateOneUser(
      param: requestTypes.UpdateOneUserParams,
  ) {
    const res: User | null = await prisma.user.update({
      where: {
        id: param.pathId,
      },
      data: {
        authLevel: param.bodyAuthLevel,
        email: param.bodyEmail,
        password: param.bodyPassword,
        phone: param.bodyPhone,
        userStatus: param.bodyUserStatus,
        username: param.bodyUsername,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async readManyUser(
      param: requestTypes.ReadManyUserParams,
  ) {
    const res: any[] | null = await prisma.user.findMany({
      where: {
      },
      select: {
        username: true,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
}
