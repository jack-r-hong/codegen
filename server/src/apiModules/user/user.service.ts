import {Service, Inject} from 'typedi';
import {UserModel} from './user.model';
import * as requestTypes from './user.parameters';
import {errors} from '../../errors';
// custom begin import

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
    const user = await this.userModel.googleLogin(param, '');
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
  async createOneUser(
      param :requestTypes.CreateOneUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin createOneUser

    // custom end createOneUser
    const res = await this.userModel.createOneUser(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
  async loginUser(
      param :requestTypes.LoginUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin loginUser

    // custom end loginUser
  }
  async logoutUser(
      param :requestTypes.LogoutUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin logoutUser

    // custom end logoutUser
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
  async createManyUser(
      param :requestTypes.CreateManyUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin createManyUser

    // custom end createManyUser
    const res = await this.userModel.createManyUser(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
}

