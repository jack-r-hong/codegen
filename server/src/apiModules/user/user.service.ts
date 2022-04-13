import {Service, Inject} from 'typedi';
import {UserModel} from './user.model';
import * as requestTypes from './user.parameters';
import {errors} from '../../errors';
// custom begin import
import bcrypt from 'bcrypt';

// custom end import


@Service()
export class UserService {
  @Inject()
  private userModel!: UserModel;

  async googleLogin(
      param :requestTypes.GoogleLoginParams,
      session: Express.Request['session'],
  ) {
    // custom begin googleLogin
    const user = await this.userModel.googleLogin(param, '').catch((e) =>{
      throw e;
    });
    if (user) {
      const {id, userStatus, auth, username, googleId, email} = user;
      if (googleId) {
        session.userInfo = {
          id,
          authRole: auth?.role!,
          userStatus,
        };
      }
      return {
        isBind: googleId? true: false,
        username,
        email,
      };
    } else {
      throw new errors.LoginFailError;
    }

    // custom end googleLogin
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
      const {id, auth, userStatus, password, googleId, email, username} = res;
      const match = await bcrypt.compare(param.bodyPassword, password);
      if (match) {
        session.userInfo = {
          id,
          authRole: auth?.role!,
          userStatus,
        };
        return {
          isBind: googleId? true: false,
          username,
          email,
        };
      }
    }
    throw new errors.LoginFailError;

    // custom end loginUser
  }
  async logoutUser(
      param :requestTypes.LogoutUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin logoutUser

    // custom end logoutUser
  }
  async registerUser(
      param :requestTypes.RegisterUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin registerUser
    const saltRounds = 10;
    const myPlaintextPassword = param.bodyPassword;
    const {hash, salt} = await new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) throw err;
        bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
          if (err) throw err;
          resolve({hash, salt});
        });
      });
    });
    const res = await this.userModel.registerUser(param, {
      password: hash,
      salt: salt,
    }).catch((e) =>{
      throw e;
    });
    return {
      email: res.email,
      username: res.username,
    };

    // custom end registerUser
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
    return res;
  }
}

