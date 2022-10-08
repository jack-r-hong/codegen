import {Service, Inject} from 'typedi';
import {UserLevelModel} from './userLevel.model';
import * as requestTypes from './userLevel.parameters';
import {errors} from '../../errors';
// custom begin import

// custom end import


@Service()
export class UserLevelService {
  @Inject()
  private userLevelModel!: UserLevelModel;
  // custom begin Inject

  // custom end Inject

  async readManyBackstageUserLevel(
      param :requestTypes.ReadManyBackstageUserLevelParams,
      session: Express.Request['session'],
  ) {
    // custom begin readManyBackstageUserLevel

    // custom end readManyBackstageUserLevel

    const res = await this.userLevelModel.readManyBackstageUserLevel(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin readManyBackstageUserLevel2

    // custom end readManyBackstageUserLevel2
    return res;
  }
  async createOneBackstageUserLevel(
      param :requestTypes.CreateOneBackstageUserLevelParams,
      session: Express.Request['session'],
  ) {
    // custom begin createOneBackstageUserLevel

    // custom end createOneBackstageUserLevel

    const res = await this.userLevelModel.createOneBackstageUserLevel(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin createOneBackstageUserLevel2

    // custom end createOneBackstageUserLevel2
    return res;
  }
  async deleteOneBackstageUserLevel(
      param :requestTypes.DeleteOneBackstageUserLevelParams,
      session: Express.Request['session'],
  ) {
    // custom begin deleteOneBackstageUserLevel

    // custom end deleteOneBackstageUserLevel

    const res = await this.userLevelModel.deleteOneBackstageUserLevel(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin deleteOneBackstageUserLevel2

    // custom end deleteOneBackstageUserLevel2
    return res;
  }
  async updateOneBackstageUserLevel(
      param :requestTypes.UpdateOneBackstageUserLevelParams,
      session: Express.Request['session'],
  ) {
    // custom begin updateOneBackstageUserLevel

    // custom end updateOneBackstageUserLevel

    const res = await this.userLevelModel.updateOneBackstageUserLevel(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin updateOneBackstageUserLevel2

    // custom end updateOneBackstageUserLevel2
    return res;
  }
}

