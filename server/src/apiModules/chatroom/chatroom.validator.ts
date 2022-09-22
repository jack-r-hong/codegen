// eslint-disable-next-line no-unused-vars
import {Schema, CustomValidator} from 'express-validator';
import * as sessions from '../../sessions';
// custom begin import

// custom end import



export const serviceTokenValidator: Schema = {
  'userId': {
    in: 'body',
    isString: true,
  },
};
export const transactionTokenValidator: Schema = {
  'transactionId': {
    in: 'body',
    isString: true,
  },
};
