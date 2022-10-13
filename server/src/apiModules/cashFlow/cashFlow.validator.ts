// eslint-disable-next-line no-unused-vars
import {Schema, CustomValidator} from 'express-validator';
import * as sessions from '../../sessions';
// custom begin import

// custom end import



export const customPageValidator: Schema = {
};
export const notifyGrantValidator: Schema = {
  'Amount': {
    in: 'body',
    isInt: true,
  },
  'Fee': {
    in: 'body',
    isInt: true,
  },
  'MemberOrderNo': {
    in: 'body',
    isString: true,
  },
  'OrderNo': {
    in: 'body',
    isString: true,
  },
  'Sign': {
    in: 'body',
    isString: true,
  },
  'Status': {
    in: 'body',
    isString: true,
  },
};
export const notifyPaidValidator: Schema = {
  'Account': {
    in: 'body',
    isString: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
  'Amount': {
    in: 'body',
    isString: true,
  },
  'Bank': {
    in: 'body',
    isString: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
  'MemberOrderNo': {
    in: 'body',
    isString: true,
  },
  'OrderNo': {
    in: 'body',
    isString: true,
  },
  'Sign': {
    in: 'body',
    isString: true,
  },
  'Status': {
    in: 'body',
    isString: true,
  },
};
export const notifyTakeNumberValidator: Schema = {
  'Amount': {
    in: 'body',
    isString: true,
  },
  'BankName': {
    in: 'body',
    isString: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
  'DueTime': {
    in: 'body',
    isString: true,
  },
  'MemberOrderNo': {
    in: 'body',
    isString: true,
  },
  'OrderNo': {
    in: 'body',
    isString: true,
  },
  'PaymentInfo': {
    in: 'body',
    isString: true,
  },
  'Sign': {
    in: 'body',
    isString: true,
  },
  'Status': {
    in: 'body',
    isString: true,
  },
};
export const takeNumberSuccessValidator: Schema = {
};
