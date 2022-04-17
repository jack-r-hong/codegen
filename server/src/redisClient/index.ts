import {createClient, RedisClientOptions} from 'redis';

const defaultOptions: RedisClientOptions = {
  socket: {
    port: 6379,
    host: process.env['REDIS_HOSTNAME'],
  },
  password: 'root',
};

export class RedisClient {
  client;

  constructor(options: RedisClientOptions = defaultOptions ) {
    const client = createClient(
        options,
    );

    client.on('error', (err) => console.log('Redis Client Error', err));


    this.client = client;
    this.connect().then(() => {});
  }

  async connect() {
    await this.client.connect();
    await this.client.ping();
  }
}


export const redisSessionClient = new RedisClient(
    Object.assign(defaultOptions, {'legacyMode': true}),
).client;

export const redisLimiterClient = new RedisClient(
    Object.assign(defaultOptions, {'legacyMode': false}),
).client;


// async function test() {
//   await redisClient.connect().catch(console.error);

//   await redisClient.set('key', 'value');
//   const value = await redisClient.get('key');

//   console.log(value);
//   console.log(await redisClient.sendCommand(['SET', 'key', 'value', 'NX']));
// }
// test().then();

