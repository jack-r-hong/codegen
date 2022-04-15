import {Service, Inject} from 'typedi';
import {AuthModel} from './auth.model';
import * as requestTypes from './auth.parameters';
import {errors} from '../../errors';
// custom begin import

// custom end import


@Service()
export class AuthService {
  @Inject()
  private authModel!: AuthModel;

  async createOneAuth(
      param :requestTypes.CreateOneAuthParams,
      session: Express.Request['session'],
  ) {
    // custom begin createOneAuth

    // custom end createOneAuth
    
    const res = await this.authModel.createOneAuth(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
  async deleteOneAuth(
      param :requestTypes.DeleteOneAuthParams,
      session: Express.Request['session'],
  ) {
    // custom begin deleteOneAuth

    // custom end deleteOneAuth
    
    const res = await this.authModel.deleteOneAuth(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
  async updateOneAuth(
      param :requestTypes.UpdateOneAuthParams,
      session: Express.Request['session'],
  ) {
    // custom begin updateOneAuth

    // custom end updateOneAuth
    
    const res = await this.authModel.updateOneAuth(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
  async readManyAuth(
      param :requestTypes.ReadManyAuthParams,
      session: Express.Request['session'],
  ) {
    // custom begin readManyAuth

    // custom end readManyAuth
    
    const res = await this.authModel.readManyAuth(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
}

