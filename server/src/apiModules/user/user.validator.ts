// eslint-disable-next-line no-unused-vars
import {Schema, CustomValidator} from 'express-validator';
import * as sessions from '../../sessions';
// custom begin import

// custom end import
export const googleLoginValidator: Schema = {
  email: {
    in: 'body',
    isEmail: true,
  },
  id: {
    in: 'body',
  },
  name: {
    in: 'body',
  },
};
export const createOneUserValidator: Schema = {
  authLevel: {
    in: 'body',
    isInt: true,
  },
  email: {
    in: 'body',
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
  phone: {
    in: 'body',
    optional: {
      options: {
        nullable: true,
      },
    },
    isMobilePhone: true,
  },
  userStatus: {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  username: {
    in: 'body',
    isLength: {
      options: {
        max: 30,
        min: 3,
      },

    },
  },
  cookieAuth: {
    in: 'cookies',
    custom: {
      options: (value, {req, location, path}) => {
        sessions.cookieAuthSessionVerify(req['session'].cookieAuth);
        return true;
      },
    },
  },
};
export const loginUserValidator: Schema = {
  email: {
    in: 'body',
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
export const deleteOneUserValidator: Schema = {
  id: {
    in: 'params',
    notEmpty: true,
  },
  cookieAuth: {
    in: 'cookies',
    custom: {
      options: (value, {req, location, path}) => {
        sessions.cookieAuthSessionVerify(req['session'].cookieAuth);
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
  cookieAuth: {
    in: 'cookies',
    custom: {
      options: (value, {req, location, path}) => {
        sessions.cookieAuthSessionVerify(req['session'].cookieAuth);
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
  authLevel: {
    in: 'body',
    isInt: true,
  },
  email: {
    in: 'body',
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
  phone: {
    in: 'body',
    optional: {
      options: {
        nullable: true,
      },
    },
    isMobilePhone: true,
  },
  userStatus: {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  username: {
    in: 'body',
    isLength: {
      options: {
        max: 30,
        min: 3,
      },

    },
  },
  cookieAuth: {
    in: 'cookies',
    custom: {
      options: (value, {req, location, path}) => {
        sessions.cookieAuthSessionVerify(req['session'].cookieAuth);
        return true;
      },
    },
  },
};
export const createManyUserValidator: Schema = {
  dataList: {
    in: 'body',
  },
  cookieAuth: {
    in: 'cookies',
    custom: {
      options: (value, {req, location, path}) => {
        sessions.cookieAuthSessionVerify(req['session'].cookieAuth);
        return true;
      },
    },
  },
};
