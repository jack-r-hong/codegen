// eslint-disable-next-line no-unused-vars
import {Schema, CustomValidator} from 'express-validator';
import * as sessions from '../../sessions';
// custom begin import

// custom end import



export const getBackstageBankAccountResonValidator: Schema = {
};
export const createBackstageBankAccountsResonValidator: Schema = {
  'des': {
    in: 'body',
    isString: true,
  },
};
export const deleteBackstageBankAccountResonValidator: Schema = {
  'resonId': {
    in: 'params',
    isInt: true,
    notEmpty: true,
  },
};
export const updateBackstageBankAccountResonValidator: Schema = {
  'resonId': {
    in: 'params',
    isInt: true,
    notEmpty: true,
  },
  'des': {
    in: 'body',
    isString: true,
  },
};
export const getBackstageBankAccountsValidator: Schema = {
  'userId': {
    in: 'params',
    isString: true,
    notEmpty: true,
  },
};
export const putBackstageBankAccountsValidator: Schema = {
  'userId': {
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
optional: {
  options: {
    nullable: true,
  },
},
  },
  'dataList.*.code': {
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'dataList.*.codeResonId': {
    isInt: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
  'dataList.*.name': {
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'dataList.*.nameResonId': {
    isInt: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
  'dataList.*.photo': {
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'dataList.*.photoResonId': {
    isInt: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
  'dataList.*.verifyId': {
    isInt: true,
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
  'status': {
    in: 'query',
    optional: {
      options: {
        nullable: true,
      },
    },
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
  'id': {
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
