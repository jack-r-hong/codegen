// eslint-disable-next-line no-unused-vars
import {Schema, CustomValidator} from 'express-validator';
import * as sessions from '../../sessions';
// custom begin import

// custom end import
export const readManyTransactionValidator: Schema = {
  userId: {
    in: 'query',
    notEmpty: true,
  },
  JSESSIONID: {
    in: 'cookies',
    custom: {
      options: (value, {req, location, path}) => {
        sessions.cookieAuthSessionVerify(req['session']);
        return true;
      },
    },
  },
};
export const createTransactionValidator: Schema = {
  account: {
    in: 'body',
  },
  bos: {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2)/,
    },
  },
  point: {
    in: 'body',
    isInt: true,
  },
  twd: {
    in: 'body',
    isInt: true,
  },
  JSESSIONID: {
    in: 'cookies',
    custom: {
      options: (value, {req, location, path}) => {
        sessions.cookieAuthSessionVerify(req['session']);
        return true;
      },
    },
  },
};
export const updateTransactionStateValidator: Schema = {
  state: {
    in: 'body',
    isInt: true,
    optional: {
      options: {
        nullable: true,
      },
    },
    matches: {
      options: /^(0|1|2|3|4)/,
    },
  },
  JSESSIONID: {
    in: 'cookies',
    custom: {
      options: (value, {req, location, path}) => {
        sessions.cookieAuthSessionVerify(req['session']);
        return true;
      },
    },
  },
};
export const readMyTransactionValidator: Schema = {
  orderBy: {
    in: 'query',
  },
  orderByField: {
    in: 'query',
  },
  page: {
    in: 'query',
    isInt: true,
  },
  take: {
    in: 'query',
    isInt: true,
  },
  JSESSIONID: {
    in: 'cookies',
    custom: {
      options: (value, {req, location, path}) => {
        sessions.cookieAuthSessionVerify(req['session']);
        return true;
      },
    },
  },
};
export const readPendingTransactionValidator: Schema = {
  orderBy: {
    in: 'query',
  },
  orderByField: {
    in: 'query',
  },
  page: {
    in: 'query',
    isInt: true,
  },
  take: {
    in: 'query',
    isInt: true,
  },
  JSESSIONID: {
    in: 'cookies',
    custom: {
      options: (value, {req, location, path}) => {
        sessions.cookieAuthSessionVerify(req['session']);
        return true;
      },
    },
  },
};
export const readOneTransactionValidator: Schema = {
  id: {
    in: 'params',
    notEmpty: true,
  },
  JSESSIONID: {
    in: 'cookies',
    custom: {
      options: (value, {req, location, path}) => {
        sessions.cookieAuthSessionVerify(req['session']);
        return true;
      },
    },
  },
};