// eslint-disable-next-line no-unused-vars
import {Schema, CustomValidator} from 'express-validator';
import * as sessions from '../../sessions';
// custom begin import

// custom end import
export const captchaValidator: Schema = {
};
export const loginUserValidator: Schema = {
  password: {
    in: 'body',
    isLength: {
      options: {
        max: 30,
        min: 8,
      },

    },
  },
  phone: {
    in: 'body',
  },
  phonePrefix: {
    in: 'body',
  },
};
export const registerUserValidator: Schema = {
  captcha: {
    in: 'body',
  },
  password: {
    in: 'body',
    isLength: {
      options: {
        max: 30,
        min: 8,
      },

    },
  },
  passwordCheck: {
    in: 'body',
    isLength: {
      options: {
        max: 30,
        min: 8,
      },

    },
  },
  phone: {
    in: 'body',
  },
  phonePrefix: {
    in: 'body',
  },
};
export const sendPhoneCheckValidator: Schema = {
};
export const phoneCheckValidator: Schema = {
  verify: {
    in: 'body',
  },
};
