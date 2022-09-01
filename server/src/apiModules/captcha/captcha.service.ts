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

}

