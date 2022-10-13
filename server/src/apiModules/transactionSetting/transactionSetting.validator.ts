// eslint-disable-next-line no-unused-vars
import {Schema, CustomValidator} from 'express-validator';
import * as sessions from '../../sessions';
// custom begin import

// custom end import



export const getAllSettingValidator: Schema = {
};
export const updateSettingValidator: Schema = {
  'accumulatedReward': {
    in: 'body',
    isInt: true,
  },
  'atmHandlingFee': {
    in: 'body',
    isInt: true,
  },
  'barCodeHandlingFee': {
    in: 'body',
    isInt: true,
  },
  'firstReward': {
    in: 'body',
    isInt: true,
  },
  'serviceFee': {
    in: 'body',
    isInt: true,
  },
};
