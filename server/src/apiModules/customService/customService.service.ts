import {Service, Inject} from 'typedi';
import {CustomServiceModel} from './customService.model';
import * as requestTypes from './customService.parameters';
import {errors} from '../../errors';
// custom begin import

// custom end import


@Service()
export class CustomServiceService {
  @Inject()
  private customServiceModel!: CustomServiceModel;
  // custom begin Inject

  // custom end Inject

  async getOneBackstageUser(
      param :requestTypes.GetOneBackstageUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin getOneBackstageUser

    // custom end getOneBackstageUser
  }
}

