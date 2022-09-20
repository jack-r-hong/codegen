// eslint-disable-next-line no-unused-vars
import {Schema, CustomValidator} from 'express-validator';
import * as sessions from '../../sessions';
// custom begin import

// custom end import



export const readManyBackstagePayManageValidator: Schema = {
  'page': {
    in: 'query',
    isInt: true,
    notEmpty: true,
  },
  'take': {
    in: 'query',
    isInt: true,
    notEmpty: true,
  },
  'type': {
    in: 'query',
    isInt: true,
    notEmpty: true,
  },
  'userId': {
    in: 'query',
    isString: true,
  },
};
export const careateBackstagePayManageValidator: Schema = {
  'type': {
    in: 'body',
    isInt: true,
  },
  'userId': {
    in: 'body',
    isString: true,
  },
};
export const deleteQrCodeValidator: Schema = {
  'id': {
    in: 'params',
    isInt: true,
    notEmpty: true,
  },
};
export const uploadManyQrCodeValidator: Schema = {
  'id': {
    in: 'params',
    isInt: true,
    notEmpty: true,
  },
};
export const deleteOneBackstagePayManageValidator: Schema = {
  'id': {
    in: 'params',
    isInt: true,
    notEmpty: true,
  },
};
export const updateBackstagePayManageValidator: Schema = {
  'id': {
    in: 'params',
    isInt: true,
    notEmpty: true,
  },
  'remark': {
    in: 'body',
    isString: true,
  },
  'status': {
    in: 'body',
    isInt: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
};
