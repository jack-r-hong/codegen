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
export const expiredKeyClient = new RedisClient(
    Object.assign(defaultOptions, {'legacyMode': false}),
).client;
expiredKeyClient.configSet('notify-keyspace-events', 'Ex');


const pub=createClient(defaultOptions);
pub.connect();
pub.configSet('notify-keyspace-events', 'Ex');

const sub=pub.duplicate();
sub.connect().then(() => {
  sub.subscribe('__keyevent@0__:expired', (key) => {
    console.log('key=> ', key);
  });
  TestKey();
});

function TestKey() {
  pub.set('testing', 'redis notify-keyspace-events : expired');
  pub.expire('testing', 1);
}


// const CONF = {db: 3};
// let sub: any;
// // .: Activate "notify-keyspace-events" for expired type events
// const pub = createClient(defaultOptions);
// pub.sendCommand(['set', 'notify-keyspace-events', 'Ex']);
// SubscribeExpired(1, 1);
// function SubscribeExpired(e, r) {
//   sub = createClient(defaultOptions);
//   const expired_subKey = '__keyevent@'+CONF.db+'__:expired';
//   sub.subscribe(expired_subKey, function() {
//     console.log(' [i] Subscribed to "'+expired_subKey+'" event channel : '+r);
//     sub.on('message', function(chan: any, msg: any) {
//       console.log('[expired]', msg);
//     });
//     TestKey();
//   });
// }
// // .: For example (create a key & set to expire in 10 seconds)
// function TestKey() {
//   pub.set('testing', 'redis notify-keyspace-events : expired');
//   pub.expire('testing', 10);
// }

// async function test() {
//   await redisClient.connect().catch(console.error);

//   await redisClient.set('key', 'value');
//   const value = await redisClient.get('key');

//   console.log(value);
//   console.log(await redisClient.sendCommand(['SET', 'key', 'value', 'NX']));
// }
// test().then();

