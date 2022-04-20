// eslint-disable-next-line no-unused-vars
import {Schema, CustomValidator} from 'express-validator';
import * as sessions from '../../sessions';
// custom begin import

// custom end import
export const readManyNotifyValidator: Schema = {
};
export const createOneNotifyValidator: Schema = {
  event: {
    in: 'body',
  },
  msg: {
    in: 'body',
  },
  ownerId: {
    in: 'body',
  },
  read: {
    in: 'body',
  },
};
export const updateManyNotifyValidator: Schema = {
  dataList: {
    in: 'body',
  },
  whereField: {
    in: 'body',
  },
};
