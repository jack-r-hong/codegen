import {Service} from 'typedi';
import {PrismaClient, User} from '@prisma/client';
import * as requestTypes from './user.parameters';
import {errors} from '../../errors';

const prisma = new PrismaClient();

@Service()
export class UserModel {
  async readBackstageUserReson(
      param: requestTypes.ReadBackstageUserResonParams,
      customParam: any,
  ) {
    // custom begin readBackstageUserReson
    const res = await prisma.userVerifyReson.findMany()
        .catch((e) => {
          throw e;
        }).finally(() => {
          prisma.$disconnect();
        });
    return res;

    // custom end readBackstageUserReson
  }
  async createBackstageUserReson(
      param: requestTypes.CreateBackstageUserResonParams,
      customParam: any,
  ) {
    // custom begin createBackstageUserReson
    const res = await prisma.userVerifyReson.create({
      data: {
        des: param.bodyDes,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end createBackstageUserReson
  }
  async deleteBackstageUserReson(
      param: requestTypes.DeleteBackstageUserResonParams,
      customParam: any,
  ) {
    // custom begin deleteBackstageUserReson
    const res = await prisma.userVerifyReson.delete({
      where: {
        id: param.pathResonId,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end deleteBackstageUserReson
  }
  async updateBackstageUserReson(
      param: requestTypes.UpdateBackstageUserResonParams,
      customParam: any,
  ) {
    // custom begin updateBackstageUserReson
    const res = await prisma.userVerifyReson.update({
      where: {
        id: param.pathResonId,
      },
      data: {
        des: param.bodyDes,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end updateBackstageUserReson
  }
  async updateBackstageUser(
      param: requestTypes.UpdateBackstageUserParams,
      customParam: any,
  ) {
    // custom begin updateBackstageUser
    const fields = {
      'bodyAddress': 1,
      'bodyBirthdate': 1,
      'bodyCertificate': 1,
      'bodyCountry': 1,
      'bodyEmail': 1,
      'bodyIdCardDate': 1,
      'bodyIdCardPhoto': 1,
      'bodyIdCardPosiition': 1,
      'bodyIdCardType': 1,
      'bodyName': 1,
      'bodySelfie': 1,
      'bodySign': 1,
    };


    const isVerified = (Object.keys(fields) as ( keyof typeof fields)[] )
        .every((key) => {
          if (param[key] === 2) {
            return true;
          }
          return false;
        });

    const userStatus = isVerified? 1: 3;

    const userVerifyRes = await prisma.userVerify.update({
      where: {
        userId: param.pathId,
      },
      data: {
        address: param.bodyAddress,
        birthdate: param.bodyBirthdate,
        certificate: param.bodyCertificate,
        country: param.bodyCountry,
        email: param.bodyEmail,
        idCardDate: param.bodyIdCardDate,
        idCardPhoto: param.bodyIdCardPhoto,
        idCardPosiition: param.bodyIdCardPosiition,
        idCardType: param.bodyIdCardType,
        name: param.bodyName,
        selfie: param.bodySelfie,
        sign: param.bodySign,
        user: {
          update: {
            userStatus,
          },
        },
      },
      select: {
        address: true,
        birthdate: true,
        certificate: true,
        country: true,
        email: true,
        idCardDate: true,
        idCardPhoto: true,
        idCardPosiition: true,
        idCardType: true,
        name: true,
        selfie: true,
        sign: true,
        id: true,
      },
    });


    const resonMap = {
      bodyAddressResonId: 'address',
      bodyBirthdateResonId: 'birthdate',
      bodyCertificateResonId: 'certificate',
      bodyCountryResonId: 'country',
      bodyEmailResonId: 'email',
      bodyIdCardDateResonId: 'idCardDate',
      bodyIdCardPhotoResonId: 'idCardPhoto',
      bodyIdCardPosiitionResonId: 'idCardPosiition',
      bodyIdCardTypeResonId: 'idCardType',
      bodyNameResonId: 'name',
      bodySelfieResonId: 'selfie',
      bodySignResonId: 'sign',
    } as const;

    await prisma.$transaction(
        (Object.keys(resonMap) as (keyof typeof resonMap)[] )
            .filter((key) => {
              return !!param[key];
            }).map((key) =>
              prisma.userVerifyResonDes.upsert({
                where: {
                  uniqueUserField: {
                    userVerifyId: userVerifyRes.id,
                    field: resonMap[key],
                  },
                },
                update: {
                  field: resonMap[key],
                  UserVerifyResonId: param[key],
                },
                create: {
                  UserVerifyResonId: param[key] as number,
                  field: resonMap[key],
                  userVerifyId: userVerifyRes.id,
                },
              }),
            ),
    ).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });

    return userVerifyRes;
    // custom end updateBackstageUser
  }
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
  async readManyUserBackstage(
      param: requestTypes.ReadManyUserBackstageParams,
  ) {
    const res: any[] | null = await prisma.user.findMany({
      where: {
      },
      select: {
        id: true,
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
  async getRealVerify(
      param: requestTypes.GetRealVerifyParams,
      customParam: any,
  ) {
    // custom begin getRealVerify
    const res: any | null = await prisma.user.findUnique({
      where: {
        id: customParam.userId,
      },
      select: {
        userStatus: true,
        name: true,
        email: true,
        birthdate: true,
        country: true,
        idCard: true,
        idCardDate: true,
        idCardPosiition: true,
        idCardType: true,
        city: true,
        area: true,
        address: true,
        userVerifyPhoto: true,
        userVerify: {
          select: {
            address: true,
            birthdate: true,
            certificate: true,
            country: true,
            email: true,
            id: true,
            idCardDate: true,
            idCardPhoto: true,
            idCardPosiition: true,
            idCardType: true,
            name: true,
            selfie: true,
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

    // custom end getRealVerify
  }
  async postRealVerify(
      param: requestTypes.PostRealVerifyParams,
      customParam: any,
  ) {
    // custom begin postRealVerify

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
    await prisma.$transaction(
        param.bodyBankAccounts.map((e, i) => {
          return prisma.bankAccount.create({
            data: {
              userId: customParam.userId,
              account: e.bodyAccount,
              code: e.bodyAccount,
              name: e.bodyName,
              order: i + 1,
              bankAccountVerify: {
                create: {
                  account: 1,
                  code: 1,
                  name: 1,
                  photo: 1,
                },
              },
            },
          });
        }),
    ).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
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
        userVerify: {
          create: {
            name: 1,
            email: 1,
            birthdate: 1,
            country: 1,
            idCardDate: 1,
            idCardPosiition: 1,
            idCardType: 1,
            idCardPhoto: 1,
            certificate: 1,
            selfie: 1,
            sign: 1,
            address: 1,
          },
        },
        userTransaction: {
          create: {
            atcbw: 1000,
            cta: 7000,
            cnot: 4000,
            limit: 2000,
          },
        },
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end phoneCheck
  }
  async getUserMyStatus(
      param: requestTypes.GetUserMyStatusParams,
      customParam: any,
  ) {
    // custom begin getUserMyStatus
    const res: {userStatus: number} | null = await prisma.user.findUnique({
      where: {
        id: customParam.userId,
      },
      select: {
        userStatus: true,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end getUserMyStatus
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
