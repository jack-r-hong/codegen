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
    /**
     const res = await this.userModel.loginUser(param, null).catch((e) =>{
      throw e;
    });
    if (res !== null) {
      const {id, userStatus, password, email, name} = res;
      const match = await bcrypt.compare(param.bodyPassword, password);
      if (match) {
        session.userInfo = {
          id,
          userStatus,
        };
        return {
          name,
          email,
        };
      }
    }
    throw new errors.LoginFailError;*/
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
}

