import {Service} from 'typedi';
export {Container} from 'typedi';
import {UserModel} from './user.model';
import * as requestTypes from './user.parameters';
import {errors} from '../../errors';
// custom begin import

// custom end import


@Service()
export class UserService {
  constructor(
        private userModel: UserModel,
  ) {}
  async createOneUser(
      param :requestTypes.CreateOneUserRequest,
  ) {
    const res = await this.userModel.createOneUser(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
  async loginUser(
      param :requestTypes.LoginUserRequest,
  ) {
    // custom begin loginUser

    // custom end loginUser
  }
  async logoutUser(
      param :requestTypes.LogoutUserRequest,
  ) {
    // custom begin logoutUser

    // custom end logoutUser
  }
  async deleteOneUser(
      param :requestTypes.DeleteOneUserRequest,
  ) {
    const res = await this.userModel.deleteOneUser(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
  async readOneUser(
      param :requestTypes.ReadOneUserRequest,
  ) {
    const res = await this.userModel.readOneUser(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
  async updateOneUser(
      param :requestTypes.UpdateOneUserRequest,
  ) {
    const res = await this.userModel.updateOneUser(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
  async createManyUser(
      param :requestTypes.CreateManyUserRequest[],
  ) {
    const res = await this.userModel.createManyUser(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
}

