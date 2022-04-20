import {RedisClient} from '../index';
import {ModelBase} from './index';
import {Service} from 'typedi';
import {UserId} from './userId';
import {Mixin} from 'ts-mixer';

class WebSocketBase extends RedisClient implements ModelBase {

}

@Service()
export class WSClientIdModel extends
  Mixin(UserId, WebSocketBase) {
  constructor() {
    super();
  }
}

