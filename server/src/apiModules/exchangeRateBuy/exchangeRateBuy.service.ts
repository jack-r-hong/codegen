import {Service, Inject} from 'typedi';
import {ExchangeRateBuyModel} from './exchangeRateBuy.model';
import * as requestTypes from './exchangeRateBuy.parameters';
import {errors} from '../../errors';
// custom begin import

// custom end import


@Service()
export class ExchangeRateBuyService {
  @Inject()
  private exchangeRateBuyModel!: ExchangeRateBuyModel;
  // custom begin Inject

  // custom end Inject

  async readManyBackstageExchangeRateBuy(
      param :requestTypes.ReadManyBackstageExchangeRateBuyParams,
      session: Express.Request['session'],
  ) {
    // custom begin readManyBackstageExchangeRateBuy

    // custom end readManyBackstageExchangeRateBuy

    const res = await this.exchangeRateBuyModel.readManyBackstageExchangeRateBuy(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin readManyBackstageExchangeRateBuy2

    // custom end readManyBackstageExchangeRateBuy2
    return res;
  }
  async createOneBackstageExchangeRateBuy(
      param :requestTypes.CreateOneBackstageExchangeRateBuyParams,
      session: Express.Request['session'],
  ) {
    // custom begin createOneBackstageExchangeRateBuy

    // custom end createOneBackstageExchangeRateBuy

    const res = await this.exchangeRateBuyModel.createOneBackstageExchangeRateBuy(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin createOneBackstageExchangeRateBuy2

    // custom end createOneBackstageExchangeRateBuy2
    return res;
  }
  async deleteOneBackstageExchangeRateBuy(
      param :requestTypes.DeleteOneBackstageExchangeRateBuyParams,
      session: Express.Request['session'],
  ) {
    // custom begin deleteOneBackstageExchangeRateBuy

    // custom end deleteOneBackstageExchangeRateBuy

    const res = await this.exchangeRateBuyModel.deleteOneBackstageExchangeRateBuy(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin deleteOneBackstageExchangeRateBuy2

    // custom end deleteOneBackstageExchangeRateBuy2
    return res;
  }
  async updateOneBackstageExchangeRateBuy(
      param :requestTypes.UpdateOneBackstageExchangeRateBuyParams,
      session: Express.Request['session'],
  ) {
    // custom begin updateOneBackstageExchangeRateBuy

    // custom end updateOneBackstageExchangeRateBuy

    const res = await this.exchangeRateBuyModel.updateOneBackstageExchangeRateBuy(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin updateOneBackstageExchangeRateBuy2

    // custom end updateOneBackstageExchangeRateBuy2
    return res;
  }
}

