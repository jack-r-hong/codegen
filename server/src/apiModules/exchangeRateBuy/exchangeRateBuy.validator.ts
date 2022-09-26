// eslint-disable-next-line no-unused-vars
import {Schema, CustomValidator} from 'express-validator';
import * as sessions from '../../sessions';
// custom begin import

// custom end import



export const readManyBackstageExchangeRateBuyValidator: Schema = {
  'orderBy': {
    in: 'query',
    isString: true,
  },
  'orderByField': {
    in: 'query',
    isString: true,
  },
  'page': {
    in: 'query',
    isInt: true,
  },
  'take': {
    in: 'query',
    isInt: true,
  },
};
export const createOneBackstageExchangeRateBuyValidator: Schema = {
  'bouns': {
    in: 'body',
    isInt: true,
  },
  'des': {
    in: 'body',
    isString: true,
  },
  'dollars': {
    in: 'body',
    isInt: true,
  },
  'point': {
    in: 'body',
    isInt: true,
  },
  'type': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2)/,
    },
  },
};
export const deleteOneBackstageExchangeRateBuyValidator: Schema = {
  'id': {
    in: 'params',
    isInt: true,
    notEmpty: true,
  },
};
export const updateOneBackstageExchangeRateBuyValidator: Schema = {
  'id': {
    in: 'params',
    isInt: true,
    notEmpty: true,
  },
  'bouns': {
    in: 'body',
    isInt: true,
  },
  'des': {
    in: 'body',
    isString: true,
  },
  'dollars': {
    in: 'body',
    isInt: true,
  },
  'point': {
    in: 'body',
    isInt: true,
  },
};
