import {RedisClientType} from 'redis';
import {Service} from 'typedi';
import {ModelBase} from './index';

@Service()
export class Queue implements ModelBase {
  client!: RedisClientType;
  key: string = 'q';

  setKey(prefixKey: string) {
    return prefixKey + this.key;
  }

  getKey(): string {
    return this.key;
  }

  async push(data: string, key? :string) {
    return await this.client.lPush(this.getKey() + `${key??'t'}`, data);
  }

  async rPush(data: string, key? :string) {
    return await this.client.rPush(this.getKey() + `${key??'t'}`, data);
  }

  async get(count = -1, key? :string) {
    return await this.client.lRange(this.getKey() + `${key??'t'}`, 0, count);
  }

  async move(newQueueKey: string, count: number) {
    const res = [];
    for (const _i of Array(count)) {
      res.push(
          await this.client.lMove( this.key, newQueueKey, 'RIGHT', 'RIGHT'),
      );
      // await this.client.lMove( this.key, newQueueKey, 'RIGHT', 'RIGHT');
    }
    return res;
  }

  async sub( cb: any, key?: string) {
    const subscriber = this.client.duplicate();

    await subscriber.connect();

    await subscriber.subscribe(this.key + 'Sub' + `${key??'t'}`, cb);

    return subscriber;
  }

  async pub(data: string, key?: string) {
    const result = await this.client.publish(this.key + 'Sub'+ `${key??'t'}`, data);

    return {result};
  }

  async del() {
    return await this.client.del(this.key);
  }

  async close() {
    return await this.client;
  }

  async subscriberQuit(subscriber: RedisClientType) {
    if (subscriber) {
      await subscriber.unsubscribe().catch((e) => {});
      await subscriber.quit().catch((e) => {});
    }
  }
}
