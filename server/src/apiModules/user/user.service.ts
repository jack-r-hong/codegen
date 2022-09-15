import {Service, Inject} from 'typedi';
import {UserModel} from './user.model';
import * as requestTypes from './user.parameters';
import {errors} from '../../errors';
// custom begin import
import bcrypt from 'bcrypt';
import svgCaptcha from 'svg-captcha';
import {promises as fs} from 'fs';
const userVerifyResponeFormat = async (data: any) => {
  const {
    userStatus,
    name,
    email,
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
  const verify = {
    name: userVerify.name,
    email: userVerify.email,
    birthdate: userVerify.birthdate,
    country: userVerify.country,
    idCardDate: userVerify.idCardDate,
    idCardPosiition: userVerify.idCardPosiition,
    idCardType: userVerify.idCardType,
    idCardPhoto: userVerify.idCardPhoto,
    city: userVerify.city,
    area: userVerify.area,
    address: userVerify.address,
    certificate: userVerify.certificate,
    selfie: userVerify.selfie,
    sign: userVerify.sign,
  };
  const verifyDes = {
    name: '',
    email: '',
    birthdate: '',
    country: '',
    idCardDate: '',
    idCardPosiition: '',
    idCardType: '',
    idCardPhoto: '',
    city: '',
    area: '',
    address: '',
    certificate: '',
    selfie: '',
    sign: '',
  };
  const photos = {
    idCard1: '',
    idCard2: '',
    certificate1: '',
    certificate2: '',
    selfie: '',
    sign: '',
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
      case 3:
        photos.certificate1 = data;
        break;
      case 4:
        photos.certificate2 = data;
        break;
      case 5:
        photos.selfie = data;
        break;
      case 6:
        photos.sign = data;
        break;
    }
  }
  userVerify.userVerifyResonDes.forEach((element: {
  field: 'name' | 'email' | 'birthdate' | 'country' |
  'idCardPhoto' | 'idCardDate' | 'idCardPosiition' | 'idCardType' |
  'city' | 'area' | 'address' | 'certificate' | 'selfie' | 'sign',
  userVerifyReson: {
    des: string
  }
}) => {
    verifyDes[element.field] = element.userVerifyReson.des;
  });
  return {
    userStatus,
    name,
    email,
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
    photos,
  };
};

// custom end import


@Service()
export class UserService {
  @Inject()
  private userModel!: UserModel;

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
    const captcha = svgCaptcha.create();
    session.captcha = captcha.text;
    return captcha.data;

    // custom end captcha
  }
  async loginUser(
      param :requestTypes.LoginUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin loginUser
    const res = await this.userModel.loginUser(param, null).catch((e) =>{
      throw e;
    });
    if (res !== null) {
      const {id, userStatus, password} = res;
      const match = await bcrypt.compare(param.bodyPassword, password);
      if (match) {
        session.userInfo = {
          id,
          userStatus,
        };
        return {
          id,
          userStatus,
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
    return userVerifyResponeFormat(dataHandle);

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
    const {bodyPassword, bodyPhone, bodyPhonePrefix,
      bodyPasswordCheck, bodyCaptcha} = param;
    if (bodyPassword !== bodyPasswordCheck) {
      throw new errors.CaptchaError('bodyPasswordCheck');
    }
    if (bodyCaptcha !== session.captcha) {
      throw new errors.CaptchaError('captcha');
    }
    session.userRegister = {
      phone: bodyPhone!,
      phonePrefix: bodyPhonePrefix!,
      password: bodyPassword!,
    };
    return true;

    // custom end registerUser
  }
  async sendPhoneCheck(
      param :requestTypes.SendPhoneCheckParams,
      session: Express.Request['session'],
  ) {
    // custom begin sendPhoneCheck
    if (session.userRegister) {
      /** todo: send phone message api */
      /**  const {phonePrefix, phone} = session.userRegister; */
      session.userRegister.verify = '123456';
    }
    return {success: true};

    // custom end sendPhoneCheck
  }
  async phoneCheck(
      param :requestTypes.PhoneCheckParams,
      session: Express.Request['session'],
  ) {
    // custom begin phoneCheck
    if (!session.userRegister ||
      !param.bodyVerify ||
      param.bodyVerify !== session.userRegister.verify) {
      throw new errors.CaptchaError;
    }
    const saltRounds = 10;
    const myPlaintextPassword = session.userRegister.password;
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
    await this.userModel.phoneCheck(param, {
      phone: session.userRegister.phone,
      phonePrefix: session.userRegister.phonePrefix,
      password: hash,
      salt: salt,
    }).catch((e) =>{
      throw e;
    });
    return {success: true};

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

