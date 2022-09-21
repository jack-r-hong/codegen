
// eslint-disable-next-line no-unused-vars
import session, {Session} from 'express-session';
import redisStore from 'connect-redis';
import {redisSessionClient as redisClient} from './redisClient';
import {errors} from './errors';

export type UserInfo = {
    id: string;
    userStatus: number;
}

type UserRegister = {
  phonePrefix: string,
  phone: string,
  verify: string,
}

type Transaction = {
  id: string,
  process: number,
  requestUserId: string,
  receiveUserId: string,
  bos: number,
}

declare module 'express-session' {
 // eslint-disable-next-line no-unused-vars
  interface Session {
    userInfo?: UserInfo,
    captcha?: String,
    userRegister?: UserRegister
    transaction?: Transaction
  }
}

const RedisStore = redisStore(session);

export const cookieAuthSession = session({
  secret: process.env['TOKEN_SECRET'] as string,
  store: new RedisStore({client: redisClient}),
  resave: false,
  saveUninitialized: true,
  name: 'JSESSIONID',
  cookie: {
    sameSite: 'none',
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 60 * 1000,
  },
});

export const cookieAuthSessionVerify = (
    session: Session,
) => {
  if (!session.userInfo) {
    throw new errors.AuthenticationFailedError('AuthenticationFailed');
  }
  return true;
};
