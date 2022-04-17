import {RedisClientType} from 'redis';
import {Service} from 'typedi';
import {ModelBase} from './index';

@Service()
export class Queue implements ModelBase {
  client!: RedisClientType;
  key: string = 'Q';

  setKey(prefixKey: string) {
    return prefixKey + this.key;
  }

  async set(data: string) : Promise<string | null> {
    return await this.client.set(this.key, data);
  }

  async get(): Promise<string[]> {
    return await this.client.lRange(this.key, 0, 2);
  }
}
