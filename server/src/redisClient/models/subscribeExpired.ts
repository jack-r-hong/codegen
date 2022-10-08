import {RedisClientType} from 'redis';
import {Service} from 'typedi';
import {ModelBase} from './index';

@Service()
export class SubscribeExpired implements ModelBase {
  client!: RedisClientType;

  async sub(cb: (key: string) => void) {
    const subscriber = this.client.duplicate();

    await subscriber.connect();

    subscriber.subscribe('__keyevent@0__:expired', cb);

    return subscriber;
  }
  /**
 *
 * @param key
 * @param expire - unit secoend
 */

  async setExpirKey(key: string, expire: number) {
    this.client.set(key, 'redis notify-keyspace-events : expired');
    this.client.expire(key, expire);
  }

  async del(key: string) {
    return await this.client.del(key);
  }

  async close() {
    return await this.client;
  }

  async subscriberQuit(subscriber: RedisClientType) {
    await subscriber.unsubscribe();
    await subscriber.quit();
  }
}
