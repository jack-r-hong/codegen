import {Service, Inject} from 'typedi';
import {TransactionSettingModel} from './transactionSetting.model';
import * as requestTypes from './transactionSetting.parameters';
import {errors} from '../../errors';
// custom begin import

// custom end import


@Service()
export class TransactionSettingService {
  @Inject()
  private transactionSettingModel!: TransactionSettingModel;
  // custom begin Inject

  // custom end Inject

  async getAllSetting(
      param :requestTypes.GetAllSettingParams,
      session: Express.Request['session'],
  ) {
    // custom begin getAllSetting
    const res = await this.transactionSettingModel.getAllSetting(param, {});
    return res.reduce((a, v) => ({...a, [v.key.replace(v.key[0]!, v.key[0]!.toLocaleLowerCase())]:
       v.val}), {});

    // custom end getAllSetting
  }
  async updateSetting(
      param :requestTypes.UpdateSettingParams,
      session: Express.Request['session'],
  ) {
    // custom begin updateSetting
    const res = await this.transactionSettingModel.updateSetting(param, {});
    return res.reduce((a, v) => ({...a, [v.key.replace(v.key[0]!, v.key[0]!.toLocaleLowerCase())]:
      v.val}), {});

    // custom end updateSetting
  }
}

