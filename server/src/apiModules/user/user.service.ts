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

    // custom end loginUser
  }
  async logoutUser(
      param :requestTypes.LogoutUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin logoutUser
    session.destroy((err) => {
      if (err) throw errors.AuthenticationFailedError;
    });

    // custom end logoutUser
  }
  async registerUser(
      param :requestTypes.RegisterUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin registerUser
    const {bodyPassword, bodyPhone, bodyPhonePrefix,
      bodyPasswordCheck, bodyCaptcha} = param;
    if (bodyPassword !== bodyPasswordCheck) {

    }

    if (bodyCaptcha !== session.captcha) {

    }

    session.userRegister = {
      phone: bodyPhone,
      phonePrefix: bodyPhonePrefix,
      password: bodyPassword,
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
      session.userRegister.verify = '1234';
    }
    // custom end sendPhoneCheck
  }
  async phoneCheck(
      param :requestTypes.PhoneCheckParams,
      session: Express.Request['session'],
  ) {
    // custom begin phoneCheck
    if (!session.userRegister) {
      return;
    }

    if (param.bodyVerify &&
      param.bodyVerify !== session.userRegister.verify) {
      return;
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
    return {

      // email: res.email,
      // username: res.name,
    };


    // custom end phoneCheck
  }
  async deleteOneUser(
      param :requestTypes.DeleteOneUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin deleteOneUser

    // custom end deleteOneUser

    const res = await this.userModel.deleteOneUser(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin deleteOneUser2

    // custom end deleteOneUser2
    return res;
  }
  async readOneUser(
      param :requestTypes.ReadOneUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin readOneUser

    // custom end readOneUser

    const res = await this.userModel.readOneUser(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin readOneUser2

    // custom end readOneUser2
    return res;
  }
  async updateOneUser(
      param :requestTypes.UpdateOneUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin updateOneUser

    // custom end updateOneUser

    const res = await this.userModel.updateOneUser(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin updateOneUser2

    // custom end updateOneUser2
    return res;
  }
  async readManyUser(
      param :requestTypes.ReadManyUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin readManyUser

    // custom end readManyUser

    const res = await this.userModel.readManyUser(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin readManyUser2

    // custom end readManyUser2
    return res;
  }
}

