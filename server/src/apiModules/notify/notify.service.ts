import {Service, Inject} from 'typedi';
import {NotifyModel} from './notify.model';
import * as requestTypes from './notify.parameters';
import {errors} from '../../errors';
// custom begin import

// custom end import


@Service()
export class NotifyService {
  @Inject()
  private notifyModel!: NotifyModel;

  async readManyNotify(
      param :requestTypes.ReadManyNotifyParams,
      session: Express.Request['session'],
  ) {
    // custom begin readManyNotify

    // custom end readManyNotify
    if (!session.userInfo) throw new errors.AuthenticationFailedError;
    param.cookieJsessionid = session.userInfo.id;

    const res = await this.notifyModel.readManyNotify(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin readManyNotify2

    // custom end readManyNotify2
    return res;
  }
  async createOneNotify(
      param :requestTypes.CreateOneNotifyParams,
      session: Express.Request['session'],
  ) {
    // custom begin createOneNotify

    // custom end createOneNotify

    const res = await this.notifyModel.createOneNotify(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin createOneNotify2

    // custom end createOneNotify2
    return res;
  }
  async updateManyNotify(
      param :requestTypes.UpdateManyNotifyParams,
      session: Express.Request['session'],
  ) {
    // custom begin updateManyNotify

    // custom end updateManyNotify

    const res = await this.notifyModel.updateManyNotify(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin updateManyNotify2

    // custom end updateManyNotify2
    return res;
  }
}

