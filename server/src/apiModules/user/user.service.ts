import {Service, Inject} from 'typedi';
import {UserModel} from './user.model';
import * as requestTypes from './user.parameters';
import {errors} from '../../errors';
// custom begin import
import bcrypt from 'bcrypt';
import svgCaptcha from 'svg-captcha';

// custom end import


@Service()
export class UserService {
  @Inject()
  private userModel!: UserModel;

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

