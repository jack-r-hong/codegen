// eslint-disable-next-line no-unused-vars
import {Schema, CustomValidator} from 'express-validator';
import * as sessions from '../../sessions';
// custom begin import

// custom end import



export const readManyBackstageExchangeRateSellValidator: Schema = {
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
export const createOneBackstageExchangeRateSellValidator: Schema = {
  'des': {
    in: 'body',
    isString: true,
  },
  'rangeLower': {
    in: 'body',
    isInt: true,
  },
  'rangeUpper': {
    in: 'body',
    isInt: true,
  },
  'rate': {
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
export const deleteOneBackstageExchangeRateSellValidator: Schema = {
  'id': {
    in: 'params',
    isInt: true,
    notEmpty: true,
  },
};
export const updateOneBackstageExchangeRateSellValidator: Schema = {
  'id': {
    in: 'params',
    isInt: true,
    notEmpty: true,
  },
  'des': {
    in: 'body',
    isString: true,
  },
  'rangeLower': {
    in: 'body',
    isInt: true,
  },
  'rangeUpper': {
    in: 'body',
    isInt: true,
  },
  'rate': {
    in: 'body',
    isInt: true,
  },
};
