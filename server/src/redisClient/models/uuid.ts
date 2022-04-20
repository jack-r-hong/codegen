import {RedisClientType} from 'redis';
import {Service} from 'typedi';
import {ModelBase} from './index';
import {v4 as uuid} from 'uuid';

@Service()
export class UUId implements ModelBase {
  client!: RedisClientType;

  async set(data: string) {
    const uid = uuid();
    const result = await this.client.set(uid, data);
    return {uid, result};
  }

  async get(key: string) {
    return await this.client.get(key);
  }

  async del(key: string) {
    return await this.client.del(key);
  }
}
