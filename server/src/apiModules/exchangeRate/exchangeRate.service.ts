import {Service, Inject} from 'typedi';
import {ExchangeRateModel} from './exchangeRate.model';
import * as requestTypes from './exchangeRate.parameters';
import {errors} from '../../errors';
// custom begin import

// custom end import


@Service()
export class ExchangeRateService {
  @Inject()
  private exchangeRateModel!: ExchangeRateModel;

  async readManyBackstageExchangeRate(
      param :requestTypes.ReadManyBackstageExchangeRateParams,
      session: Express.Request['session'],
  ) {
    // custom begin readManyBackstageExchangeRate

    // custom end readManyBackstageExchangeRate

    const res = await this.exchangeRateModel.readManyBackstageExchangeRate(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin readManyBackstageExchangeRate2

    // custom end readManyBackstageExchangeRate2
    return res;
  }
  async createOneBackstageExchangeRate(
      param :requestTypes.CreateOneBackstageExchangeRateParams,
      session: Express.Request['session'],
  ) {
    // custom begin createOneBackstageExchangeRate

    // custom end createOneBackstageExchangeRate

    const res = await this.exchangeRateModel.createOneBackstageExchangeRate(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin createOneBackstageExchangeRate2

    // custom end createOneBackstageExchangeRate2
    return res;
  }
  async deleteOneBackstageExchangeRate(
      param :requestTypes.DeleteOneBackstageExchangeRateParams,
      session: Express.Request['session'],
  ) {
    // custom begin deleteOneBackstageExchangeRate

    // custom end deleteOneBackstageExchangeRate

    const res = await this.exchangeRateModel.deleteOneBackstageExchangeRate(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin deleteOneBackstageExchangeRate2

    // custom end deleteOneBackstageExchangeRate2
    return res;
  }
  async updateOneBackstageExchangeRate(
      param :requestTypes.UpdateOneBackstageExchangeRateParams,
      session: Express.Request['session'],
  ) {
    // custom begin updateOneBackstageExchangeRate

    // custom end updateOneBackstageExchangeRate

    const res = await this.exchangeRateModel.updateOneBackstageExchangeRate(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin updateOneBackstageExchangeRate2

    // custom end updateOneBackstageExchangeRate2
    return res;
  }
}

