// eslint-disable-next-line no-unused-vars
import {Schema, CustomValidator} from 'express-validator';
import * as sessions from '../../sessions';
// custom begin import

// custom end import



export const getMyBankAccountsValidator: Schema = {
  status: {
    in: 'query',
    isInt: true,
    matches: {
      options: /^(1|2)/,
    },
  },
  'JSESSIONID': {
    in: 'cookies',
    custom: {
      options: (value, {req, location, path}) => {
        sessions.cookieAuthSessionVerify(req['session']);
        return true;
      },
    },
  },
};
export const readOneBankAccountValidator: Schema = {
  id: {
    in: 'params',
    isInt: true,
    notEmpty: true,
  },
  'JSESSIONID': {
    in: 'cookies',
    custom: {
      options: (value, {req, location, path}) => {
        sessions.cookieAuthSessionVerify(req['session']);
        return true;
      },
    },
  },
};
