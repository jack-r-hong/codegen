import {Service, Inject} from 'typedi';
import {UserModel} from './user.model';
import * as requestTypes from './user.parameters';
import {errors} from '../../errors';
// custom begin import
import bcrypt from 'bcrypt';
import svgCaptcha from 'svg-captcha';
import {promises as fs} from 'fs';
import {getPhoneCheck} from '../../utils/axios';
import {query} from 'express-validator';
type UserField = {
  val: string,
  verify: number,
  des: string,
}
const userVerifyResponeFormat = async (data: any) => {
  const {
    userStatus,
    name,
    lineId,
    gameUid,
    birthdate,
    country,
    idCard,
    idCardDate,
    idCardPosiition,
    idCardType,
    city,
    area,
    address,
    userVerify,
    userVerifyPhoto,
  } = data;
  const verifyDes = {
    name: '',
    lineId: '',
    gameUid: '',
    birthdate: '',
    country: '',
    idCard: '',
    idCardDate: '',
    idCardPosiition: '',
    idCardType: '',
    idCardPhoto: '',
    city: '',
    area: '',
    address: '',
    selfie: '',
  };
  const photos = {
    idCard1: {
      data: '',
      name: '',
    },
    idCard2: {
      data: '',
      name: '',
    },
    selfie: {
      data: '',
      name: '',
    },
  };
  for (const e of userVerifyPhoto) {
    const data = await fs.readFile(e.path, 'base64')
        .catch(() => {
          return '';
        });
    switch (e.type) {
      case 1:
        photos.idCard1.data = data;
        photos.idCard1.name = `idCard1`;
        break;
      case 2:
        photos.idCard2.data = data;
        photos.idCard2.name = `$dCard2`;
        break;
      case 5:
        photos.selfie.data = data;
        photos.selfie.name = `selfie`;
        break;
    }
  }
  userVerify.userVerifyResonDes.forEach((element: {
  field: 'name' | 'lineId' | 'gameUid' | 'birthdate' | 'country' | 'idCard' |
  'idCardPhoto' | 'idCardDate' | 'idCardPosiition' | 'idCardType' |
  'city' | 'area' | 'address' | 'selfie',
  userVerifyReson: {
    des: string
  }
  }) => {
    verifyDes[element.field] = element.userVerifyReson.des;
  });
  return {
    userStatus,
    name: {
      val: name,
      des: verifyDes.name,
      verify: userVerify.name,
    },
    lineId: {
      val: lineId,
      des: verifyDes.lineId,
      verify: userVerify.lineId,
    },
    gameUid: {
      val: gameUid,
      des: verifyDes.gameUid,
      verify: userVerify.gameUid,
    },
    birthdate: {
      val: birthdate,
      des: verifyDes.birthdate,
      verify: userVerify.birthdate,
    },
    country: {
      val: country,
      des: verifyDes.country,
      verify: userVerify.country,
    },
    idCard: {
      val: idCard,
      des: verifyDes.idCard,
      verify: userVerify.idCard,
    },
    idCardDate: {
      val: idCardDate,
      des: verifyDes.idCardDate,
      verify: userVerify.idCardDate,
    },
    idCardPosiition: {
      val: idCardPosiition,
      des: verifyDes.idCardPosiition,
      verify: userVerify.idCardPosiition,
    },
    idCardType: {
      val: idCardType,
      des: verifyDes.idCardType,
      verify: userVerify.idCardType,
    },
    city: {
      val: city,
      des: verifyDes.city,
      verify: userVerify.city,
    },
    area: {
      val: area,
      des: verifyDes.area,
      verify: userVerify.area,
    },
    address: {
      val: address,
      des: verifyDes.address,
      verify: userVerify.address,
    },
    idCardPhoto: {
      val: [
        photos.idCard1,
        photos.idCard2,
      ],
      des: verifyDes.idCardPhoto,
      verify: userVerify.idCardPhoto,
    },
    selfie: {
      val: [
        photos.selfie,
      ],
      des: verifyDes.selfie,
      verify: userVerify.selfie,
    },
  };
};
const userVerifyResponeFormat2 = async (data: any) => {
  const {
    userStatus,
    name,
    lineId,
    gameUid,
    birthdate,
    country,
    idCard,
    idCardDate,
    idCardPosiition,
    idCardType,
    city,
    area,
    address,
    userVerify,
    userVerifyPhoto,
    bankAccount,
  } = data;
  const verify = {
    name: userVerify.name,
    lineId: userVerify.lineId,
    gameUid: userVerify.gameUid,
    birthdate: userVerify.birthdate,
    country: userVerify.country,
    idCard: userVerify.idCard,
    idCardDate: userVerify.idCardDate,
    idCardPosiition: userVerify.idCardPosiition,
    idCardType: userVerify.idCardType,
    idCardPhoto: userVerify.idCardPhoto,
    city: userVerify.city,
    area: userVerify.area,
    address: userVerify.address,
    selfie: userVerify.selfie,
  };
  const verifyDes = {
    name: '',
    lineId: '',
    gameUid: '',
    birthdate: '',
    country: '',
    idCard: '',
    idCardDate: '',
    idCardPosiition: '',
    idCardType: '',
    idCardPhoto: '',
    city: '',
    area: '',
    address: '',
    selfie: '',
  };
  const photos = {
    idCard1: '',
    idCard2: '',
    selfie: '',
    bankAccounts: ['', '', ''],
  };
  for (const e of userVerifyPhoto) {
    const data = await fs.readFile(e.path, 'base64')
        .catch(() => {
          return '';
        });
    switch (e.type) {
      case 1:
        photos.idCard1 = data;
        break;
      case 2:
        photos.idCard2 = data;
        break;
      case 5:
        photos.selfie = data;
        break;
      case 7:
        photos.bankAccounts[0] = data;
        break;
      case 8:
        photos.bankAccounts[1] = data;
        break;
      case 9:
        photos.bankAccounts[2] = data;
        break;
    }
  }
  userVerify.userVerifyResonDes.forEach((element: {
  field: 'name' | 'lineId' | 'gameUid' | 'birthdate' | 'country' | 'idCard' |
  'idCardPhoto' | 'idCardDate' | 'idCardPosiition' | 'idCardType' |
  'city' | 'area' | 'address' | 'selfie',
  userVerifyReson: {
    des: string
  }
}) => {
    verifyDes[element.field] = element.userVerifyReson.des;
  });
  const bankAccounts = bankAccount.map((e: {
    code: number,
    name: string,
    account: number,
    order: number,
    bankAccountVerify: {
      code: number,
      name: number,
      account: number,
      photo: number,
      bankAccountVerifyResonDes: {
        field: string,
        bankAccountVerifyReson: {
          des: string
        }
      }[]
    }
  }) => {
    const bankAccountVerify = e.bankAccountVerify;
    const des = {
      code: '',
      account: '',
      name: '',
      photo: '',
    };
    if (bankAccountVerify && bankAccountVerify.bankAccountVerifyResonDes) {
      bankAccountVerify.bankAccountVerifyResonDes.forEach((e2) => {
        const field = e2.field;
        des[field as ('code' | 'account' | 'name' | 'photo')] =
       e2.bankAccountVerifyReson.des;
      });
    }
    return {
      code: {
        val: e.code,
        des: des.code,
        verify: bankAccountVerify.code,
      },
      account: {
        val: e.account,
        des: des.account,
        verify: bankAccountVerify.account,
      },
      name: {
        val: e.name,
        des: des.name,
        verify: bankAccountVerify.name,
      },
      photo: {
        val: photos.bankAccounts[e.order - 1],
        des: des.photo,
        verify: bankAccountVerify.photo,
      },
    };
  });
  return {
    userStatus,
    name,
    gameUid,
    lineId,
    birthdate,
    country,
    idCard,
    idCardDate,
    idCardPosiition,
    idCardType,
    city,
    area,
    address,
    verify,
    verifyDes,
    idCardPhoto: [photos.idCard1, photos.idCard2],
    selfiePhoto: photos.selfie,
    bankAccounts,
  };
};

// custom end import


@Service()
export class UserService {
  @Inject()
  private userModel!: UserModel;

  async getUserBackstageAgents(
      param :requestTypes.GetUserBackstageAgentsParams,
      session: Express.Request['session'],
  ) {
    // custom begin getUserBackstageAgents
    const res = await this.userModel.getUserBackstageAgents(
        param,
        {},
    ).catch((e) =>{
      throw e;
    });
    return res;

    // custom end getUserBackstageAgents
  }
  async readBackstageUserReson(
      param :requestTypes.ReadBackstageUserResonParams,
      session: Express.Request['session'],
  ) {
    // custom begin readBackstageUserReson
    const res = await this.userModel.readBackstageUserReson(
        param,
        {},
    ).catch((e) =>{
      throw e;
    });
    return res;

    // custom end readBackstageUserReson
  }
  async createBackstageUserReson(
      param :requestTypes.CreateBackstageUserResonParams,
      session: Express.Request['session'],
  ) {
    // custom begin createBackstageUserReson
    const res = await this.userModel.createBackstageUserReson(
        param,
        {},
    ).catch((e) =>{
      throw e;
    });
    return res;

    // custom end createBackstageUserReson
  }
  async deleteBackstageUserReson(
      param :requestTypes.DeleteBackstageUserResonParams,
      session: Express.Request['session'],
  ) {
    // custom begin deleteBackstageUserReson
    const res = await this.userModel.deleteBackstageUserReson(
        param,
        {},
    ).catch((e) =>{
      throw e;
    });
    return res;

    // custom end deleteBackstageUserReson
  }
  async updateBackstageUserReson(
      param :requestTypes.UpdateBackstageUserResonParams,
      session: Express.Request['session'],
  ) {
    // custom begin updateBackstageUserReson
    const res = await this.userModel.updateBackstageUserReson(
        param,
        {},
    ).catch((e) =>{
      throw e;
    });
    return res;

    // custom end updateBackstageUserReson
  }
  async updateBackstageUser(
      param :requestTypes.UpdateBackstageUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin updateBackstageUser
    const res = await this.userModel.updateBackstageUser(
        param,
        {},
    ).catch((e) =>{
      throw e;
    });
    return res;

    // custom end updateBackstageUser
  }
  async readOneBackstageUser(
      param :requestTypes.ReadOneBackstageUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin readOneBackstageUser

    // custom end readOneBackstageUser

    const res = await this.userModel.readOneBackstageUser(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin readOneBackstageUser2
    return userVerifyResponeFormat(res);

    // custom end readOneBackstageUser2
    return res;
  }
  async readBackstageUserTransaction(
      param :requestTypes.ReadBackstageUserTransactionParams,
      session: Express.Request['session'],
  ) {
    // custom begin readBackstageUserTransaction
    const res = await this.userModel.readBackstageUserTransaction(
        param,
        {},
    ).catch((e) =>{
      throw e;
    });
    return res;

    // custom end readBackstageUserTransaction
  }
  async readManyUserBackstage(
      param :requestTypes.ReadManyUserBackstageParams,
      session: Express.Request['session'],
  ) {
    // custom begin readManyUserBackstage

    // custom end readManyUserBackstage

    const res = await this.userModel.readManyUserBackstage(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin readManyUserBackstage2

    // custom end readManyUserBackstage2
    return res;
  }
  async captcha(
      param :requestTypes.CaptchaParams,
      session: Express.Request['session'],
  ) {
    // custom begin captcha
    const captcha = svgCaptcha.create({
      size: 7,
      charPreset: '0123456789',
      color: true,
      noise: 4,
    });
    session.captcha = captcha.text;
    return captcha.data;

    // custom end captcha
  }
  async loginUser(
      param :requestTypes.LoginUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin loginUser
    param.bodyPhone = param.bodyPhone.replace(/^0/, '');
    const res = await this.userModel.loginUser(param, null)
        .catch((e) =>{
          throw e;
        });
    if (res !== null) {
      const {id, userStatus, password, isAgent, phone} = res;
      const match = await bcrypt.compare(param.bodyPassword, password);
      if (match) {
        session.userInfo = {
          id,
          userStatus,
          isAgent,
        };
        return {
          id,
          userStatus,
          isAgent,
          phone,
        };
      }
    }
    throw new errors.LoginFailError;

    // custom end loginUser
  }
  async getRealVerify(
      param :requestTypes.GetRealVerifyParams,
      session: Express.Request['session'],
  ) {
    // custom begin getRealVerify
    const dataHandle = await this.userModel.getRealVerify(param,
        {userId: session.userInfo?.id!})
        .catch((e) =>{
          throw e;
        });
    return userVerifyResponeFormat2(dataHandle);

    // custom end getRealVerify
  }
  async postRealVerify(
      param :requestTypes.PostRealVerifyParams,
      session: Express.Request['session'],
  ) {
    // custom begin postRealVerify
    const res = await this.userModel.postRealVerify(param,
        {userId: session.userInfo?.id!})
        .catch((e) =>{
          throw e;
        });
    return res;

    // custom end postRealVerify
  }
  async putRealVerify(
      param :requestTypes.PutRealVerifyParams,
      session: Express.Request['session'],
  ) {
    // custom begin putRealVerify
    const res = await this.userModel.putRealVerify(param,
        {userId: session.userInfo?.id!})
        .catch((e) =>{
          throw e;
        });
    return res;

    // custom end putRealVerify
  }
  async registerUser(
      param :requestTypes.RegisterUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin registerUser
    if (!session.userRegister ||
      !param.bodyPhoneCaptcha ||
      param.bodyPhoneCaptcha !== session.userRegister.verify ||
      param.bodyPassword !== param.bodyPasswordCheck ||
      param.bodyPhoneCaptcha !== session.userRegister.verify||
      param.bodyCaptcha !== session.captcha
    ) {
      throw new errors.CaptchaError;
    }
    if (param.bodyPassword !== param.bodyPasswordCheck) {
      throw new errors.CaptchaError;
    }
    const saltRounds = 10;
    const myPlaintextPassword = param.bodyPassword;
    const {hash, salt} = await new Promise<{hash: string, salt: string}>(
        (resolve, reject) => {
          bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) throw err;
            bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
              if (err) throw err;
              resolve({hash, salt});
            });
          });
        },
    );
    const res = await this.userModel.registerUser(param, {
      phone: param.bodyPhone.replace(/^0/, ''),
      phonePrefix: session.userRegister.phonePrefix,
      password: hash,
      salt: salt,
      promoteCode: param.bodyPromoteCode,
    }).catch((e) =>{
      if (e.message === 'referral code no map to the user') {
        return {success: false, message: 'referral code no map to the user'};
      }
      throw e;
    });
    if ((res as {success: boolean}).success === false) {
      return res;
    }
    session.destroy(() => {});
    return {success: true};

    // custom end registerUser
  }
  async phoneCheck(
      param :requestTypes.PhoneCheckParams,
      session: Express.Request['session'],
  ) {
    // custom begin phoneCheck
    /** todo: send phone message api */
    const code = Math.random().toFixed(6).substring(2);
    const phonePrefix = '886';
    const phone = param.bodyPhone.replace(/^0/, '');
    session.userRegister = {
      verify: '123456',
      phonePrefix,
      phone,
    };

    // custom end phoneCheck
  }
  async getUserMyStatus(
      param :requestTypes.GetUserMyStatusParams,
      session: Express.Request['session'],
  ) {
    // custom begin getUserMyStatus
    const res = await this.userModel.getUserMyStatus(
        param,
        {userId: session.userInfo!.id},
    ).catch((e) =>{
      throw e;
    });
    if (!res) {
      throw new errors.LoginFailError;
    }
    session.userInfo = {
      id: session.userInfo!.id,
      userStatus: res.userStatus,
      isAgent: res.isAgent,
    };
    return res;

    // custom end getUserMyStatus
  }
  async updateOneyUser(
      param :requestTypes.UpdateOneyUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin updateOneyUser

    // custom end updateOneyUser

    const res = await this.userModel.updateOneyUser(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin updateOneyUser2

    // custom end updateOneyUser2
    return res;
  }
}

