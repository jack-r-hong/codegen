// eslint-disable-next-line no-unused-vars
import {Schema, CustomValidator} from 'express-validator';
import * as sessions from '../../sessions';
// custom begin import

// custom end import



export const readManyBackstageUserLevelValidator: Schema = {
};
export const createOneBackstageUserLevelValidator: Schema = {
  'id': {
    in: 'params',
    isInt: true,
    notEmpty: true,
  },
  'des': {
    in: 'body',
    isString: true,
  },
  'level': {
    in: 'body',
    isInt: true,
  },
};
export const deleteOneBackstageUserLevelValidator: Schema = {
  'id': {
    in: 'params',
    isInt: true,
    notEmpty: true,
  },
};
export const updateOneBackstageUserLevelValidator: Schema = {
  'id': {
    in: 'params',
    isInt: true,
    notEmpty: true,
  },
  'des': {
    in: 'body',
    isString: true,
  },
  'level': {
    in: 'body',
    isInt: true,
  },
};
