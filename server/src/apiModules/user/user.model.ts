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
    const res: any | null = await prisma.user.findUnique({
      where: {
        phone_all: {
          phone: param.bodyPhone,
          phonePrefix: param.bodyPhonePrefix,
        },
      },
      select: {
        email: true,
        id: true,
        name: true,
        password: true,
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

    // custom end loginUser
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
    const res: User | null = await prisma.user.create({
      data: {
        phone: customParam.phone,
        phonePrefix: customParam.phonePrefix,
        password: customParam.password,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end phoneCheck
  }
}
