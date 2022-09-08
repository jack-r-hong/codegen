import {Service} from 'typedi';
import {PrismaClient, User} from '@prisma/client';
import * as requestTypes from './user.parameters';
import {errors} from '../../errors';

const prisma = new PrismaClient();

@Service()
export class UserModel {
  async readOneBackstageUser(
      param: requestTypes.ReadOneBackstageUserParams,
  ) {
    const res: any | null = await prisma.user.findUnique({
      where: {
        id: param.pathId,
      },
      select: {
        address: true,
        area: true,
        birthdate: true,
        city: true,
        country: true,
        email: true,
        id: true,
        idCard: true,
        idCardDate: true,
        idCardPosiition: true,
        idCardType: true,
        name: true,
        userVerifyPhoto: true,
        // custom begin readOneBackstageUser
        userVerify: {
          select: {
            address: true,
            birthdate: true,
            country: true,
            email: true,
            idCardDate: true,
            idCardPosiition: true,
            idCardType: true,
            idCardPhoto: true,
            name: true,
            selfie: true,
            certificate: true,
            sign: true,
            userVerifyResonDes: {
              select: {
                field: true,
                userVerifyReson: {
                  select: {
                    des: true,
                  },
                },
              },
            },
          },
        },

        // custom end readOneBackstageUser
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
  async updateOneBackstageUser(
      param: requestTypes.UpdateOneBackstageUserParams,
  ) {
    const res: User | null = await prisma.user.update({
      where: {
        id: param.pathId,
      },
      data: {
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async readManyUserBackstage(
      param: requestTypes.ReadManyUserBackstageParams,
  ) {
    const res: any[] | null = await prisma.user.findMany({
      where: {
      },
      select: {
        level: true,
        phone: true,
        phonePrefix: true,
        userStatus: true,
        userTransaction: true,
        // custom begin readManyUserBackstage

        // custom end readManyUserBackstage
      },
      orderBy: {
        [param.queryOrderByField]: param.queryOrderBy,
      },
      skip: param.queryPage * param.queryTake,
      take: param.queryTake,
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
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
        userStatus: true,
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
  async postRealVerify(
      param: requestTypes.PostRealVerifyParams,
      customParam: any,
  ) {
    // custom begin postRealVerify
    const bankDatas = param.bodyBankAccounts.map((e, i) => {
      return {
        account: e.bodyAccount,
        code: e.bodyCode,
        name: e.bodyName,
        order: i + 1,
      };
    });
    const res: any | null = await prisma.user.update({
      data: {
        name: param.bodyName,
        email: param.bodyEmail,
        birthdate: param.bodyBirthdate,
        country: param.bodyCountry,
        idCard: param.bodyIdCard,
        idCardDate: param.bodyIdCardDate,
        idCardPosiition: param.bodyIdCardPosiition,
        idCardType: param.bodyIdCardType,
        city: param.bodyCity,
        area: param.bodyArea,
        address: param.bodyArea,
        userStatus: 3,
        bankAccount: {
          createMany: {
            data: bankDatas,
          },
        },
      },
      where: {
        id: customParam.userId,
      },
      select: {
        id: true,
        userStatus: true,
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

    // custom end postRealVerify
  }
  async putRealVerify(
      param: requestTypes.PutRealVerifyParams,
      customParam: any,
  ) {
    // custom begin putRealVerify
    const res: any | null = await prisma.user.update({
      data: {
        name: param.bodyName,
        email: param.bodyEmail,
        birthdate: param.bodyBirthdate,
        country: param.bodyCountry,
        idCard: param.bodyIdCard,
        idCardDate: param.bodyIdCardDate,
        idCardPosiition: param.bodyIdCardPosiition,
        idCardType: param.bodyIdCardType,
        city: param.bodyCity,
        area: param.bodyArea,
        address: param.bodyArea,
        userStatus: 3,
      },
      where: {
        id: customParam.userId,
      },
      select: {
        id: true,
        userStatus: true,
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

    // custom end putRealVerify
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
  async updateOneyUser(
      param: requestTypes.UpdateOneyUserParams,
  ) {
    const res: User | null = await prisma.user.update({
      where: {
        id: param.pathId,
      },
      data: {
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
}
