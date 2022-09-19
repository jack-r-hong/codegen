import {RedisClient} from '../index';
import {ModelBase} from './index';
import {Service} from 'typedi';
import {UserId} from './userId';
import {Mixin} from 'ts-mixer';
import {Queue} from './queue';

class WebSocketBase extends RedisClient {

}

@Service()
export class WSClientIdModel extends
  Mixin(UserId, WebSocketBase) {
  constructor() {
    super();
  }
}

@Service()
export class WSClientQueueModel extends
  Mixin(Queue, WebSocketBase) {
  constructor() {
    super();
  }

  override key: string = super.setKey('psm');
}
