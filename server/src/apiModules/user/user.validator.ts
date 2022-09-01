// eslint-disable-next-line no-unused-vars
import {Schema, CustomValidator} from 'express-validator';
import * as sessions from '../../sessions';
// custom begin import

// custom end import
export const captchaValidator: Schema = {
};
export const loginUserValidator: Schema = {
  email: {
    in: 'body',
    optional: {
      options: {
        nullable: true,
      },
    },
    isEmail: true,
  },
  password: {
    in: 'body',
    isStrongPassword: true,
    isLength: {
      options: {
        max: 30,
        min: 8,
      },

    },
  },
};
export const logoutUserValidator: Schema = {
};
export const registerUserValidator: Schema = {
  captcha: {
    in: 'body',
  },
  password: {
    in: 'body',
    isStrongPassword: true,
    isLength: {
      options: {
        max: 30,
        min: 8,
      },

    },
  },
  passwordCheck: {
    in: 'body',
    isStrongPassword: true,
    isLength: {
      options: {
        max: 30,
        min: 8,
      },

    },
  },
  phone: {
    in: 'body',
    isMobilePhone: true,
  },
  phonePrefix: {
    in: 'body',
  },
};
export const sendPhoneCheckValidator: Schema = {
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
export const phoneCheckValidator: Schema = {
  verify: {
    in: 'body',
  },
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
export const deleteOneUserValidator: Schema = {
  id: {
    in: 'params',
    notEmpty: true,
  },
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
export const readOneUserValidator: Schema = {
  id: {
    in: 'params',
    notEmpty: true,
  },
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
export const updateOneUserValidator: Schema = {
  id: {
    in: 'params',
    notEmpty: true,
  },
  email: {
    in: 'body',
    optional: {
      options: {
        nullable: true,
      },
    },
    isEmail: true,
  },
  name: {
    in: 'body',
    optional: {
      options: {
        nullable: true,
      },
    },
    isLength: {
      options: {
        max: 30,
        min: 3,
      },

    },
  },
  password: {
    in: 'body',
    isStrongPassword: true,
    isLength: {
      options: {
        max: 30,
        min: 8,
      },

    },
  },
  phone: {
    in: 'body',
    isMobilePhone: true,
  },
  userStatus: {
    in: 'body',
    isInt: true,
    optional: {
      options: {
        nullable: true,
      },
    },
    matches: {
      options: /^(1|2|3)/,
    },
  },
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
