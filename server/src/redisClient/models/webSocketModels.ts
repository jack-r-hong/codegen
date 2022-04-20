import {RedisClient} from '../index';
import {ModelBase} from './index';
import {Service} from 'typedi';
import {UUId} from './uuid';
import {Mixin} from 'ts-mixer';

class WebSocketBase extends RedisClient implements ModelBase {

}

@Service()
export class WSClientIdModel extends
  Mixin(UUId, WebSocketBase) {
  constructor() {
    super();
  }
}

