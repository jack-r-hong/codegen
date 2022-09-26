import {Service, Inject} from 'typedi';
import {ExchangeRateSellModel} from './exchangeRateSell.model';
import * as requestTypes from './exchangeRateSell.parameters';
import {errors} from '../../errors';
// custom begin import

// custom end import


@Service()
export class ExchangeRateSellService {
  @Inject()
  private exchangeRateSellModel!: ExchangeRateSellModel;

  async readManyBackstageExchangeRateSell(
      param :requestTypes.ReadManyBackstageExchangeRateSellParams,
      session: Express.Request['session'],
  ) {
    // custom begin readManyBackstageExchangeRateSell

    // custom end readManyBackstageExchangeRateSell

    const res = await this.exchangeRateSellModel.readManyBackstageExchangeRateSell(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin readManyBackstageExchangeRateSell2

    // custom end readManyBackstageExchangeRateSell2
    return res;
  }
  async createOneBackstageExchangeRateSell(
      param :requestTypes.CreateOneBackstageExchangeRateSellParams,
      session: Express.Request['session'],
  ) {
    // custom begin createOneBackstageExchangeRateSell

    // custom end createOneBackstageExchangeRateSell

    const res = await this.exchangeRateSellModel.createOneBackstageExchangeRateSell(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin createOneBackstageExchangeRateSell2

    // custom end createOneBackstageExchangeRateSell2
    return res;
  }
  async deleteOneBackstageExchangeRateSell(
      param :requestTypes.DeleteOneBackstageExchangeRateSellParams,
      session: Express.Request['session'],
  ) {
    // custom begin deleteOneBackstageExchangeRateSell

    // custom end deleteOneBackstageExchangeRateSell

    const res = await this.exchangeRateSellModel.deleteOneBackstageExchangeRateSell(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin deleteOneBackstageExchangeRateSell2

    // custom end deleteOneBackstageExchangeRateSell2
    return res;
  }
  async updateOneBackstageExchangeRateSell(
      param :requestTypes.UpdateOneBackstageExchangeRateSellParams,
      session: Express.Request['session'],
  ) {
    // custom begin updateOneBackstageExchangeRateSell

    // custom end updateOneBackstageExchangeRateSell

    const res = await this.exchangeRateSellModel.updateOneBackstageExchangeRateSell(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin updateOneBackstageExchangeRateSell2

    // custom end updateOneBackstageExchangeRateSell2
    return res;
  }
}

