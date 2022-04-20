import {RedisClientType} from 'redis';
import {Service} from 'typedi';
import {ModelBase} from './index';

@Service()
export class UserId implements ModelBase {
  client!: RedisClientType;

  async sub(userId: string, cb: any) {
    const subscriber = this.client.duplicate();

    await subscriber.connect();

    await subscriber.subscribe(userId, cb);

    // return {};
  }

  async pub(userId: string, data: string) {
    const result = await this.client.publish(userId, data);

    return {result};
  }

  async get(key: string) {
    return await this.client.get(key);
  }

  async del(key: string) {
    return await this.client.del(key);
  }
}
