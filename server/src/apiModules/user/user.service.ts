import {Service} from 'typedi';
export {Container} from 'typedi';
import {UserModel} from './user.model';
import * as requestTypes from './user.parameters';
import {errors} from '../../errors';
// custom begin import
import {GoogleApiOperation} from '../../googleApiClient';
const googleApi = GoogleApiOperation.getInstance();
import {EventEmitter} from 'events';
const ee = new EventEmitter();

// custom end import


@Service()
export class UserService {
  constructor(
        private userModel: UserModel,
  ) {}
  async oauthcallback(
      param :requestTypes.OauthcallbackParams,
  ) {
    // custom begin oauthcallback
    ee.emit('foo');
    return googleApi.getUserInfo(param.queryCode);

    // custom end oauthcallback
  }
  async createOneUser(
      param :requestTypes.CreateOneUserParams,
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
  async googleLogin(
      param :requestTypes.GoogleLoginParams,
  ) {
    // custom begin googleLogin

    // custom end googleLogin
  }
  async loginUser(
      param :requestTypes.LoginUserParams,
  ) {
    // custom begin loginUser

    // custom end loginUser
  }
  async logoutUser(
      param :requestTypes.LogoutUserParams,
  ) {
    // custom begin logoutUser

    // custom end logoutUser
  }
  async deleteOneUser(
      param :requestTypes.DeleteOneUserParams,
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

