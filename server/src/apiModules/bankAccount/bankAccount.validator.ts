// eslint-disable-next-line no-unused-vars
import {Schema, CustomValidator} from 'express-validator';
import * as sessions from '../../sessions';
// custom begin import

// custom end import



export const getBackstageBankAccountsValidator: Schema = {
  userId: {
    in: 'params',
    isString: true,
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
export const putBackstageBankAccountsValidator: Schema = {
  userId: {
    in: 'params',
    isString: true,
    notEmpty: true,
  },
  'dataList': {
    in: 'body',
    isArray: true,
  },
  'dataList.*.account': {
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'dataList.*.accountResonId': {
    isInt: true,
  },
  'dataList.*.code': {
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'dataList.*.codeResonId': {
    isInt: true,
  },
  'dataList.*.name': {
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'dataList.*.nameResonId': {
    isInt: true,
  },
  'dataList.*.photo': {
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'dataList.*.photoResonId': {
    isInt: true,
  },
  'dataList.*.verifyId': {
    isInt: true,
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
export const createBankAccountsValidator: Schema = {
  'data': {
    in: 'body',
    isArray: true,
  },
  'data.*.account': {
    isInt: true,
  },
  'data.*.code': {
    isInt: true,
  },
  'data.*.name': {
    isString: true,
  },
  'data.*.order': {
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
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
