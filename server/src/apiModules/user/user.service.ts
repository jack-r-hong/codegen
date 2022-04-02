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
      param :requestTypes.CreateOneUserParams,
  ) {
    const res = await this.userModel.createOneUser(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
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
    const res = await this.userModel.createManyUser(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
}

