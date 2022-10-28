// eslint-disable-next-line no-unused-vars
import {Schema, CustomValidator} from 'express-validator';
import * as sessions from '../../sessions';
// custom begin import

// custom end import



export const getOneBackstageUserValidator: Schema = {
  'id': {
    in: 'params',
    isString: true,
    notEmpty: true,
  },
};
