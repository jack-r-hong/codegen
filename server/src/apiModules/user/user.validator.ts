// eslint-disable-next-line no-unused-vars
import {Schema, CustomValidator} from 'express-validator';
import * as sessions from '../../sessions';
// custom begin import

// custom end import



export const readBackstageUserResonValidator: Schema = {
};
export const createBackstageUserResonValidator: Schema = {
  'des': {
    in: 'body',
    isString: true,
  },
};
export const deleteBackstageUserResonValidator: Schema = {
  resonId: {
    in: 'params',
    isInt: true,
    notEmpty: true,
  },
};
export const updateBackstageUserResonValidator: Schema = {
  resonId: {
    in: 'params',
    isInt: true,
    notEmpty: true,
  },
  'des': {
    in: 'body',
    isString: true,
  },
};
export const updateBackstageUserValidator: Schema = {
  id: {
    in: 'params',
    isString: true,
    notEmpty: true,
  },
  'address': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'birthdate': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'certificate': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'country': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'email': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'idCardDate': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'idCardPhoto': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'idCardPosiition': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'idCardType': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'name': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'selfie': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'sign': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'userVerifyResonDes': {
    in: 'body',
    isArray: true,
  },
  'userVerifyResonDes.*.field': {
    isString: true,
  },
  'userVerifyResonDes.*.userVerifyResonId': {
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
export const readOneBackstageUserValidator: Schema = {
  id: {
    in: 'params',
    isString: true,
    notEmpty: true,
  },
};
export const readManyUserBackstageValidator: Schema = {
  orderBy: {
    in: 'query',
    isString: true,
  },
  orderByField: {
    in: 'query',
    isString: true,
  },
  page: {
    in: 'query',
    isInt: true,
  },
  take: {
    in: 'query',
    isInt: true,
  },
};
export const captchaValidator: Schema = {
};
export const loginUserValidator: Schema = {
  'password': {
    in: 'body',
    isString: true,
    isLength: {
      options: {
        max: 30,
        min: 8,
      },

    },
  },
  'phone': {
    in: 'body',
    isString: true,
  },
  'phonePrefix': {
    in: 'body',
    isString: true,
  },
};
export const postRealVerifyValidator: Schema = {
  'address': {
    in: 'body',
    isString: true,
  },
  'area': {
    in: 'body',
    isString: true,
  },
  'bankAccounts': {
    in: 'body',
    isArray: true,
  },
  'bankAccounts.*.account': {
    isInt: true,
  },
  'bankAccounts.*.code': {
    isInt: true,
  },
  'bankAccounts.*.name': {
    isString: true,
  },
  'birthdate': {
    in: 'body',
    isString: true,
  },
  'city': {
    in: 'body',
    isString: true,
  },
  'country': {
    in: 'body',
    isString: true,
  },
  'email': {
    in: 'body',
    isString: true,
    isEmail: true,
  },
  'idCard': {
    in: 'body',
    isString: true,
  },
  'idCardDate': {
    in: 'body',
    isString: true,
  },
  'idCardPosiition': {
    in: 'body',
    isString: true,
  },
  'idCardType': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'name': {
    in: 'body',
    isString: true,
    isLength: {
      options: {
        max: 30,
        min: 3,
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
export const putRealVerifyValidator: Schema = {
  'address': {
    in: 'body',
    isString: true,
  },
  'area': {
    in: 'body',
    isString: true,
  },
  'birthdate': {
    in: 'body',
    isString: true,
  },
  'city': {
    in: 'body',
    isString: true,
  },
  'country': {
    in: 'body',
    isString: true,
  },
  'email': {
    in: 'body',
    isString: true,
    isEmail: true,
  },
  'idCard': {
    in: 'body',
    isString: true,
  },
  'idCardDate': {
    in: 'body',
    isString: true,
  },
  'idCardPosiition': {
    in: 'body',
    isString: true,
  },
  'idCardType': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'name': {
    in: 'body',
    isString: true,
    isLength: {
      options: {
        max: 30,
        min: 3,
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
export const registerUserValidator: Schema = {
  'captcha': {
    in: 'body',
    isString: true,
  },
  'password': {
    in: 'body',
    isString: true,
    isLength: {
      options: {
        max: 30,
        min: 8,
      },

    },
  },
  'passwordCheck': {
    in: 'body',
    isString: true,
    isLength: {
      options: {
        max: 30,
        min: 8,
      },

    },
  },
  'phone': {
    in: 'body',
    isString: true,
  },
  'phonePrefix': {
    in: 'body',
    isString: true,
  },
};
export const sendPhoneCheckValidator: Schema = {
};
export const phoneCheckValidator: Schema = {
  'verify': {
    in: 'body',
    isString: true,
  },
};
export const getUserMyStatusValidator: Schema = {
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
export const updateOneyUserValidator: Schema = {
  id: {
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
