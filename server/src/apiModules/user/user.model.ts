import {Service} from 'typedi';
import {PrismaClient, User} from '@prisma/client';
import * as requestTypes from './user.parameters';
import {errors} from '../../errors';

const prisma = new PrismaClient();

@Service()
export class UserModel {
  async captcha(
      param: requestTypes.CaptchaParams,
      customParam: any,
  ) {
    // custom begin captcha

    // custom end captcha
  }
  async loginUser(
      param: requestTypes.LoginUserParams,
      customParam: any,
  ) {
    // custom begin loginUser

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

    // custom end registerUser
  }
  async sendPhoneCheck(
      param: requestTypes.SendPhoneCheckParams,
      customParam: any,
  ) {
    // custom begin sendPhoneCheck

    // custom end sendPhoneCheck
  }
  async phoneCheck(
      param: requestTypes.PhoneCheckParams,
      customParam: any,
  ) {
    // custom begin phoneCheck

    // custom end phoneCheck
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
        name: true,
        phone: true,
        updatedAt: true,
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
        email: param.bodyEmail,
        name: param.bodyName,
        password: param.bodyPassword,
        phone: param.bodyPhone,
        userStatus: param.bodyUserStatus,
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
        name: true,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
}
