
// eslint-disable-next-line no-unused-vars
import session, {Session} from 'express-session';
import redisStore from 'connect-redis';
import {redisSessionClient as redisClient} from './redisClient';
import {errors} from './errors';

export type UserInfo = {
    id: string;
    userStatus: number;
    authRole: number;
}

export enum GoogleLoginTokenStatus{
  // eslint-disable-next-line no-unused-vars
  Wait = 1,
  // eslint-disable-next-line no-unused-vars
  End = 2
}

export type GoogleLoginToken = {
  id: string;
  status: GoogleLoginTokenStatus;
  data: string
}

declare module 'express-session' {
 // eslint-disable-next-line no-unused-vars
  interface Session {
    userInfo?: UserInfo,
    googleLoginToken?: GoogleLoginToken
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
    maxAge: 100000,
  },
});

export const cookieAuthSessionVerify = (
    userInfo: UserInfo,
) => {
  if (!userInfo) {
    throw new errors.AuthenticationFailedError('AuthenticationFailed');
  }
  return true;
};
