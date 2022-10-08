import {RedisClient} from '../index';
import {ModelBase} from './index';
import {Service, Container} from 'typedi';
import {UserId} from './userId';
import {Mixin} from 'ts-mixer';
import {Queue} from './queue';
import {SubscribeExpired} from './subscribeExpired';

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

@Service()
export class WSClientTransactionModel extends
  Mixin(Queue, WebSocketBase) {
  constructor() {
    super();
  }

  override key: string = super.setKey('wsct');
}

@Service()
export class WSClientServiceModel extends
  Mixin(Queue, WebSocketBase) {
  constructor() {
    super();
  }

  override key: string = super.setKey('wscts');
}

@Service()
export class SubscribeExpiredeModel extends
  Mixin(SubscribeExpired, WebSocketBase) {
  constructor() {
    super();
    this.client.configSet('notify-keyspace-events', 'Ex');
  }
}
