import {Service, Inject} from 'typedi';
import {BackstageAdminModel} from './backstageAdmin.model';
import * as requestTypes from './backstageAdmin.parameters';
import {errors} from '../../errors';
// custom begin import
import bcrypt from 'bcrypt';

// custom end import


@Service()
export class BackstageAdminService {
  @Inject()
  private backstageAdminModel!: BackstageAdminModel;
  // custom begin Inject

  // custom end Inject

  async getAdminFromId(
      param :requestTypes.GetAdminFromIdParams,
      session: Express.Request['session'],
  ) {
    // custom begin getAdminFromId
    const res = await this.backstageAdminModel.getAdminFromId(param, null)
        .catch((e) =>{
          throw e;
        });
    return res;

    // custom end getAdminFromId
  }
  async adminLogin(
      param :requestTypes.AdminLoginParams,
      session: Express.Request['session'],
  ) {
    // custom begin adminLogin
    const res = await this.backstageAdminModel.adminLogin(param, null)
        .catch((e) =>{
          throw e;
        });
    if (res !== null) {
      const {id, status, password} = res;
      const match = await bcrypt.compare(param.bodyPassword, password);
      if (match) {
        return {
          id,
          status,
        };
      }
    }
    throw new errors.LoginFailError;

    // custom end adminLogin
  }
  async adminRegister(
      param :requestTypes.AdminRegisterParams,
      session: Express.Request['session'],
  ) {
    // custom begin adminRegister
    const saltRounds = 10;
    const myPlaintextPassword = param.bodyPassword;
    const {hash, salt} = await new Promise<{hash: string, salt: string}>(
        (resolve, reject) => {
          bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) throw err;
            bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
              if (err) throw err;
              resolve({hash, salt});
            });
          });
        },
    );
    await this.backstageAdminModel.adminRegister(param, {
      password: hash,
      salt: salt,
    }).catch((e) =>{
      throw e;
    });
    return {success: true};

    // custom end adminRegister
  }
}

