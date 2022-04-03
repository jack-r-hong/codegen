import {Service} from 'typedi';
import {PrismaClient, User} from '@prisma/client';
import * as requestTypes from './user.parameters';
import {errors} from '../../errors';

const prisma = new PrismaClient();

@Service()
export class UserModel {
  async oauthcallback(
      param: requestTypes.OauthcallbackParams,
  ) {
    // custom begin oauthcallback

    // custom end oauthcallback
  }
  async createOneUser(
      param: requestTypes.CreateOneUserParams,
  ) {
    const res: User | null = await prisma.user.create({
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
  async googleLoginUrl(
      param: requestTypes.GoogleLoginUrlParams,
  ) {
    // custom begin googleLoginUrl

    // custom end googleLoginUrl
  }
  async googleLoginUser(
      param: requestTypes.GoogleLoginUserParams,
  ) {
    // custom begin googleLoginUser

    // custom end googleLoginUser
  }
  async loginUser(
      param: requestTypes.LoginUserParams,
  ) {
    // custom begin loginUser

    // custom end loginUser
  }
  async logoutUser(
      param: requestTypes.LogoutUserParams,
  ) {
    // custom begin logoutUser

    // custom end logoutUser
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
  async createManyUser(
      param: requestTypes.CreateManyUserParams,
  ) {
    const data = param.bodyDataList.map((e) => {
      return {
        authLevel: e.bodyAuthLevel,
        email: e.bodyEmail,
        password: e.bodyPassword,
        phone: e.bodyPhone,
        userStatus: e.bodyUserStatus,
        username: e.bodyUsername,
      };
    });

    const res: any = await prisma.user.createMany({
      data,
      skipDuplicates: true,
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res.count;
  }
}
