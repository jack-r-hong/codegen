// eslint-disable-next-line no-unused-vars
import {Schema, CustomValidator} from 'express-validator';
import * as sessions from '../../sessions';
// custom begin import

// custom end import



export const createTransactionValidator: Schema = {
  'bankId': {
    in: 'body',
    isInt: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
  'bos': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2)/,
    },
  },
  'buyOptionId': {
    in: 'body',
    isInt: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
  'code': {
    in: 'body',
    isString: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
  'image': {
    in: 'body',
    isString: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
  'payMethod': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3|4|5)/,
    },
  },
  'point': {
    in: 'body',
    isInt: true,
optional: {
  options: {
    nullable: true,
  },
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
export const updateTransactionStateValidator: Schema = {
  'state': {
    in: 'body',
    isInt: true,
optional: {
  options: {
    nullable: true,
  },
},
    matches: {
      options: /^(1|2|3|4|99)/,
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
export const getTransactionCalculationValidator: Schema = {
  'bos': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2)/,
    },
  },
  'buyOptionId': {
    in: 'body',
    isInt: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
  'payMethod': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3|4|5)/,
    },
  },
  'point': {
    in: 'body',
    isInt: true,
optional: {
  options: {
    nullable: true,
  },
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
export const getExchangeRateBuyValidator: Schema = {
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
export const getExchangeRateSellValidator: Schema = {
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
export const postGSPayDepositValidator: Schema = {
  'transactionId': {
    in: 'body',
    isString: true,
  },
  'type': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(3|4)/,
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
export const readMyTransactionValidator: Schema = {
  'orderBy': {
    in: 'query',
    isString: true,
  },
  'orderByField': {
    in: 'query',
    isString: true,
  },
  'page': {
    in: 'query',
    isInt: true,
  },
  'take': {
    in: 'query',
    isInt: true,
  },
  'start_time': {
    in: 'query',
    isString: true,
    matches: {
      options: /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
    },
  },
  'end_time': {
    in: 'query',
    isString: true,
    matches: {
      options: /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
    },
  },
  'state': {
    in: 'query',
    isString: true,
    matches: {
      options: /^(failed|all|pending|processing|completed)/,
    },
  },
  'bos': {
    in: 'query',
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
export const getPayPhotoValidator: Schema = {
  'type': {
    in: 'query',
    isInt: true,
    notEmpty: true,
    matches: {
      options: /^(1|2)/,
    },
  },
  'transactionId': {
    in: 'query',
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
export const readOneTransactionValidator: Schema = {
  'id': {
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
export const updateTransactionValidator: Schema = {
  'id': {
    in: 'params',
    isString: true,
    notEmpty: true,
  },
  'state': {
    in: 'body',
    isInt: true,
optional: {
  options: {
    nullable: true,
  },
},
    matches: {
      options: /^(1|2|3|4|99)/,
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
