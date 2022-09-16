// eslint-disable-next-line no-unused-vars
import {Schema, CustomValidator} from 'express-validator';
import * as sessions from '../../sessions';
// custom begin import

// custom end import



export const getAdminFromIdValidator: Schema = {
  'id': {
    in: 'body',
    isString: true,
  },
};
export const adminLoginValidator: Schema = {
  'account': {
    in: 'body',
    isString: true,
  },
  'password': {
    in: 'body',
    isString: true,
  },
};
export const adminRegisterValidator: Schema = {
  'account': {
    in: 'body',
    isString: true,
  },
  'password': {
    in: 'body',
    isString: true,
  },
};
