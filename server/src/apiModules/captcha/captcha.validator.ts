// eslint-disable-next-line no-unused-vars
import {Schema, CustomValidator} from 'express-validator';
import * as sessions from '../../sessions';
// custom begin import

// custom end import
export const readManyUserValidator: Schema = {
  JSESSIONID: {
    in: 'cookies',
    custom: {
      options: (value, {req, location, path}) => {
        sessions.cookieAuthSessionVerify(req['session'].userInfo);
        return true;
      },
    },
  },
};
