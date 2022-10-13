import {Service} from 'typedi';
import * as Prisma from '@prisma/client';
import * as requestTypes from './user.parameters';
import {errors} from '../../errors';

const prisma = new Prisma.PrismaClient();

@Service()
export class UserModel {
  async getUserBackstageAgents(
      param: requestTypes.GetUserBackstageAgentsParams,
      customParam: any,
      // custom begin getUserBackstageAgentsParam

      // custom end getUserBackstageAgentsParam
  ) {
    // custom begin getUserBackstageAgents
    const res: any[] | null = await prisma.user.findMany({
      where: {
        isAgent: true,
      },
      select: {
        id: true,
        phone: true,
        phonePrefix: true,
        name: true,
        gameUid: true,
        remark: true,
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

    // custom end getUserBackstageAgents
  }
  async readBackstageUserReson(
      param: requestTypes.ReadBackstageUserResonParams,
      customParam: any,
      // custom begin readBackstageUserResonParam

      // custom end readBackstageUserResonParam
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
      // custom begin createBackstageUserResonParam

      // custom end createBackstageUserResonParam
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
      // custom begin deleteBackstageUserResonParam

      // custom end deleteBackstageUserResonParam
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
      // custom begin updateBackstageUserResonParam

      // custom end updateBackstageUserResonParam
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
      // custom begin updateBackstageUserParam

      // custom end updateBackstageUserParam
  ) {
    // custom begin updateBackstageUser
    const fields = {
      'bodyAddress': 1,
      'bodyCity': 1,
      'bodyArea': 1,
      'bodyBirthdate': 1,
      'bodyCountry': 1,
      'bodyLineId': 1,
      'bodyGameUid': 1,
      'bodyIdCard': 1,
      'bodyIdCardDate': 1,
      'bodyIdCardPhoto': 1,
      'bodyIdCardPosiition': 1,
      'bodyIdCardType': 1,
      'bodyName': 1,
      'bodySelfie': 1,
    };
    let isVerified = (Object.keys(fields) as ( keyof typeof fields)[] )
        .every((key) => {
          if (param[key] === 2) {
            return true;
          }
          return false;
        });
    if (isVerified) {
      const userBank = await prisma.bankAccount.findMany({
        where: {
          userId: param.pathId,
        },
        select: {
          status: true,
        },
      });
      userBank.forEach((e) => {
        if (e.status !== 2) {
          isVerified = false;
        }
      });
    }
    const userStatus = isVerified? 1: 4;
    const userVerifyRes = await prisma.userVerify.update({
      where: {
        userId: param.pathId,
      },
      data: {
        address: param.bodyAddress,
        area: param.bodyArea,
        birthdate: param.bodyBirthdate,
        city: param.bodyCity,
        country: param.bodyCountry,
        lineId: param.bodyLineId,
        gameUid: param.bodyGameUid,
        idCard: param.bodyIdCard,
        idCardDate: param.bodyIdCardDate,
        idCardPhoto: param.bodyIdCardPhoto,
        idCardPosiition: param.bodyIdCardPosiition,
        idCardType: param.bodyIdCardType,
        name: param.bodyName,
        selfie: param.bodySelfie,
        user: {
          update: {
            userStatus,
          },
        },
      },
      select: {
        address: true,
        area: true,
        birthdate: true,
        city: true,
        country: true,
        lineId: true,
        gameUid: true,
        idCard: true,
        idCardDate: true,
        idCardPhoto: true,
        idCardPosiition: true,
        idCardType: true,
        name: true,
        selfie: true,
        id: true,
      },
    });
    const resonMap = {
      bodyAddressResonId: 'address',
      bodyAreaResonId: 'area',
      bodyBirthdateResonId: 'birthdate',
      bodyCityResonId: 'city',
      bodyCountryResonId: 'country',
      bodyGameUidResonId: 'gameUid',
      bodyLineIdResonId: 'lineId',
      bodyIdCardResonId: 'idCard',
      bodyIdCardDateResonId: 'idCardDate',
      bodyIdCardPhotoResonId: 'idCardPhoto',
      bodyIdCardPosiitionResonId: 'idCardPosiition',
      bodyIdCardTypeResonId: 'idCardType',
      bodyNameResonId: 'name',
      bodySelfieResonId: 'selfie',
    } as const;
    await prisma.$transaction(
        (Object.keys(resonMap) as (keyof typeof resonMap)[] )
            .map((key) => {
              if (!param[key]) {
                return prisma.userVerifyResonDes.deleteMany({
                  where: {
                    userVerifyId: userVerifyRes.id,
                    field: resonMap[key],
                  },
                });
              }
              return prisma.userVerifyResonDes.upsert({
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
              });
            }),
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
      // custom begin readOneBackstageUserParam

      // custom end readOneBackstageUserParam
  ) {
    const res = await prisma.user.findUnique({
      where: {
        id: param.pathId,
        
      },
      select: {
        address: true,
        area: true,
        birthdate: true,
        city: true,
        country: true,
        gameUid: true,
        id: true,
        idCard: true,
        idCardDate: true,
        idCardPosiition: true,
        idCardType: true,
        lineId: true,
        name: true,
        userVerifyPhoto: true,
        // custom begin readOneBackstageUser
        userVerify: {
          select: {
            address: true,
            birthdate: true,
            country: true,
            lineId: true,
            gameUid: true,
            idCardDate: true,
            idCardPosiition: true,
            idCardType: true,
            idCardPhoto: true,
            idCard: true,
            area: true,
            city: true,
            name: true,
            selfie: true,
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
      // custom begin updateOneBackstageUserParam

      // custom end updateOneBackstageUserParam
  ) {
    const res = await prisma.user.update({
      where: {
        id: param.pathId,
      },
      data: {
        level: param.bodyLevel,
        remark: param.bodyRemark,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async readBackstageUserTransaction(
      param: requestTypes.ReadBackstageUserTransactionParams,
      customParam: any,
      // custom begin readBackstageUserTransactionParam

      // custom end readBackstageUserTransactionParam
  ) {
    // custom begin readBackstageUserTransaction
    const res: any[] | null = await prisma.transaction.findMany({
      where: {
        OR: [
          {userId: param.pathId},
          {transactionRecive: {
            userId: param.pathId,
          }},
        ],
        createdAt: {
          gte: param.queryStartTime,
          lte: param.queryEndTime,
        },
      },
      select: {
        id: true,
        point: true,
        state: true,
        twd: true,
        bos: true,
        payMethod: true,
        bonusPoint: true,
        createdAt: true,
        bankAccount: true,
        bankCode: true,
        bankName: true,
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

    // custom end readBackstageUserTransaction
  }
  async readManyUserBackstage(
      param: requestTypes.ReadManyUserBackstageParams,
      // custom begin readManyUserBackstageParam
      isAgent?: boolean,

      // custom end readManyUserBackstageParam
  ) {
    const res = await prisma.user.findMany({
      where: {
      // custom begin readManyUserBackstageWhere
        isAgent,

      // custom end readManyUserBackstageWhere
      },
      select: {
        gameUid: true,
        id: true,
        isAgent: true,
        level: true,
        phone: true,
        phonePrefix: true,
        remark: true,
        userStatus: true,
        // custom begin readManyUserBackstage
        referral: {
          select: {
            id: true,
            rebate: true,
          },
        },

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
      // custom begin captchaParam

      // custom end captchaParam
  ) {
    // custom begin captcha

    // custom end captcha
  }
  async forgetPasswordPhoneCheck(
      param: requestTypes.ForgetPasswordPhoneCheckParams,
      customParam: any,
      // custom begin forgetPasswordPhoneCheckParam

      // custom end forgetPasswordPhoneCheckParam
  ) {
    // custom begin forgetPasswordPhoneCheck

    // custom end forgetPasswordPhoneCheck
  }
  async forgetPasswordPhoneCheckVerify(
      param: requestTypes.ForgetPasswordPhoneCheckVerifyParams,
      customParam: any,
      // custom begin forgetPasswordPhoneCheckVerifyParam

      // custom end forgetPasswordPhoneCheckVerifyParam
  ) {
    // custom begin forgetPasswordPhoneCheckVerify

    // custom end forgetPasswordPhoneCheckVerify
  }
  async forgetPasswordReset(
      param: requestTypes.ForgetPasswordResetParams,
      customParam: any,
      // custom begin forgetPasswordResetParam

      // custom end forgetPasswordResetParam
  ) {
    // custom begin forgetPasswordReset
    const res = await prisma.user.update({
      where: {
        phone_all: {
          phone: customParam.phone,
          phonePrefix: customParam.phonePrefix,
        },
      },
      data: {
        password: customParam.password,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end forgetPasswordReset
  }
  async loginUser(
      param: requestTypes.LoginUserParams,
      customParam: any,
      // custom begin loginUserParam

      // custom end loginUserParam
  ) {
    // custom begin loginUser
    const res = await prisma.user.findUnique({
      where: {
        phone_all: {
          phone: param.bodyPhone,
          phonePrefix: param.bodyPhonePrefix,
        },
      },
      select: {
        phone: true,
        id: true,
        name: true,
        password: true,
        userStatus: true,
        isAgent: true,
        gameUid: true,
      },
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
      // custom begin logoutUserParam

      // custom end logoutUserParam
  ) {
    // custom begin logoutUser

    // custom end logoutUser
  }
  async getRealVerify(
      param: requestTypes.GetRealVerifyParams,
      customParam: any,
      // custom begin getRealVerifyParam

      // custom end getRealVerifyParam
  ) {
    // custom begin getRealVerify
    const res = await prisma.user.findUnique({
      where: {
        id: customParam.userId,
      },
      select: {
        userStatus: true,
        name: true,
        gameUid: true,
        lineId: true,
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
            area: true,
            city: true,
            birthdate: true,
            country: true,
            gameUid: true,
            lineId: true,
            id: true,
            idCard: true,
            idCardDate: true,
            idCardPhoto: true,
            idCardPosiition: true,
            idCardType: true,
            name: true,
            selfie: true,
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
        bankAccount: {
          select: {
            code: true,
            name: true,
            account: true,
            order: true,
            bankAccountVerify: {
              select: {
                code: true,
                name: true,
                account: true,
                photo: true,
                bankAccountVerifyResonDes: {
                  select: {
                    field: true,
                    bankAccountVerifyReson: {
                      select: {
                        des: true,
                      },
                    },
                  },
                },
              },
            },
          },
          orderBy: {
            order: 'asc',
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
      // custom begin postRealVerifyParam

      // custom end postRealVerifyParam
  ) {
    // custom begin postRealVerify
    const originalUser = await prisma.user.findUnique({
      where: {
        id: customParam.userId,
      },
    });
    enum FieldMap {
      address = 'bodyAddress',
      area ='bodyArea',
      birthdate ='bodyBirthdate',
      city ='bodyCity',
      country ='bodyCountry',
      gameUid ='bodyGameUid',
      lineId ='bodyLineId',
      idCard ='bodyIdCard',
      idCardDate ='bodyIdCardDate',
      idCardPosiition ='bodyIdCardPosiition',
      idCardType ='bodyIdCardType',
      name ='bodyName',
    }
    const updataVerifyData : any = {};
    if (originalUser) {
      for (const e of (Object.keys(FieldMap) as (keyof typeof FieldMap)[])) {
        if (originalUser[e] !== param[FieldMap[e]]) {
          updataVerifyData[e] = 1;
        }
      }
    }
    const res = await prisma.user.update({
      data: {
        address: param.bodyAddress,
        area: param.bodyArea,
        birthdate: param.bodyBirthdate,
        city: param.bodyCity,
        country: param.bodyCountry,
        gameUid: param.bodyGameUid,
        lineId: param.bodyLineId,
        idCard: param.bodyIdCard,
        idCardDate: param.bodyIdCardDate,
        idCardPosiition: param.bodyIdCardPosiition,
        idCardType: param.bodyIdCardType,
        name: param.bodyName,
        userStatus: 3,
        userVerify: {
          update: updataVerifyData,
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
    const originalBank = await prisma.bankAccount.findMany({
      where: {
        userId: customParam.userId,
      },
    });
    await prisma.$transaction(
        param.bodyBankAccounts.map((e, i) => {
          let updateVerify :any = {update: {}};
          let status :any = 1;
          const bank = originalBank.find((bank) => bank.order === e.bodyOrder);
          if (bank) {
            if (bank.account !== e.bodyAccount) {
              updateVerify.update.account = 1;
            }
            if (bank.code !== e.bodyCode) {
              updateVerify.update.code = 1;
            }
            if (bank.name !== e.bodyName) {
              updateVerify.update.name = 1;
            }
          }
          if (Object.keys(updateVerify.update).length <= 0) {
            updateVerify = undefined;
            status = undefined;
          }
          return prisma.bankAccount.upsert({
            where: {
              uniqueOrder: {
                userId: customParam.userId,
                order: e.bodyOrder,
              },
            },
            update: {
              account: e.bodyAccount,
              code: e.bodyCode,
              name: e.bodyName,
              status,
              bankAccountVerify: updateVerify,
            },
            create: {
              userId: customParam.userId,
              order: e.bodyOrder,
              account: e.bodyAccount,
              code: e.bodyCode,
              name: e.bodyName,
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
      // custom begin putRealVerifyParam

      // custom end putRealVerifyParam
  ) {
    // custom begin putRealVerify
    const res: any | null = await prisma.user.update({
      data: {
        name: param.bodyName,
        lineId: param.bodyLineId,
        gameUid: param.bodyGameUid,
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
      // custom begin registerUserParam

      // custom end registerUserParam
  ) {
    // custom begin registerUser
    let referralMap: undefined | {
      create: {
        referralId: number,
      },
    } = undefined;
    if (customParam.promoteCode && customParam.promoteCode !== '' ) {
      const referralId = parseInt(customParam.promoteCode);
      const checkCode = await prisma.referral.findUnique({
        where: {
          id: referralId,
        },
      }).catch((e) => {
        throw new Error('referral code no map to the user');
      }).finally(() => {
        prisma.$disconnect();
      });
      if (!checkCode) {
        console.log('checkCode');
        throw new Error('referral code no map to the user');
      }
      referralMap = {
        create: {
          referralId: referralId,
        },
      };
    }
    const res: Prisma.User | null = await prisma.user.create({
      data: {
        phone: customParam.phone,
        phonePrefix: customParam.phonePrefix,
        password: customParam.password,
        userVerify: {
          create: {
            name: 1,
            gameUid: 1,
            lineId: 1,
            birthdate: 1,
            country: 1,
            idCardDate: 1,
            idCardPosiition: 1,
            idCardType: 1,
            idCardPhoto: 1,
            selfie: 1,
            address: 1,
          },
        },
        referral: {
          create: {
            rebate: 0,
          },
        },
        referralMap,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end registerUser
  }
  async phoneCheck(
      param: requestTypes.PhoneCheckParams,
      customParam: any,
      // custom begin phoneCheckParam

      // custom end phoneCheckParam
  ) {
    // custom begin phoneCheck
    const res = await prisma.user.findUnique({
      where: {
        phone_all: {
          phone: param.bodyPhone,
          phonePrefix: '886',
        },
      },
      select: {
        phone: true,
        phonePrefix: true,
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
      // custom begin getUserMyStatusParam

      // custom end getUserMyStatusParam
  ) {
    // custom begin getUserMyStatus
    const res =
    await prisma.user.findUnique({
      where: {
        id: customParam.userId,
      },
      select: {
        id: true,
        userStatus: true,
        isAgent: true,
        phone: true,
        gameUid: true,
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
      // custom begin updateOneyUserParam

      // custom end updateOneyUserParam
  ) {
    const res = await prisma.user.update({
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
  // custom begin model
  async getUserName(
      userId: string,
  ) {
    const res: {
      name: string | null,
      id: string
    } | null = await prisma.user.findUnique({
      where: {
        id: userId,
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
  }
  async getUserVerify(
      userId: string,
  ) {
    const res = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        gameUid: true,
        lineId: true,
        birthdate: true,
        country: true,
        idCard: true,
        idCardDate: true,
        idCardPosiition: true,
        idCardType: true,
        city: true,
        area: true,
        address: true,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async readManyUserSumBackstage(
      userIdList: string[],
  ) {
    const res = await prisma.transaction.groupBy({
      by: ['userId'],
      _sum: {
        twd: true,
      },
      _count: true,
      where: {
        state: 4,
        userId: {
          in: userIdList,
        },
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
