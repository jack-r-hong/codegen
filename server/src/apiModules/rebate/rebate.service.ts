import {Service, Inject} from 'typedi';
import {RebateModel} from './rebate.model';
import * as requestTypes from './rebate.parameters';
import {errors} from '../../errors';
// custom begin import

// custom end import


@Service()
export class RebateService {
  @Inject()
  private rebateModel!: RebateModel;
  // custom begin Inject

  // custom end Inject

}

