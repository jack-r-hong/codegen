import {Service, Inject} from 'typedi';
import {CaptchaModel} from './captcha.model';
import * as requestTypes from './captcha.parameters';
import {errors} from '../../errors';
// custom begin import

// custom end import


@Service()
export class CaptchaService {
  @Inject()
  private captchaModel!: CaptchaModel;

  async readManyUser(
      param :requestTypes.ReadManyUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin readManyUser

    // custom end readManyUser

    const res = await this.captchaModel.readManyUser(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin readManyUser2

    // custom end readManyUser2
    return res;
  }
}

