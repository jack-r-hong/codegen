// eslint-disable-next-line no-unused-vars
import {Schema, CustomValidator} from 'express-validator';
import * as sessions from '../../sessions';
// custom begin import

// custom end import



export const getUserVerifyPhotoValidator: Schema = {
};
export const uploadManyVerifyPhotoValidator: Schema = {
  types: {
    in: 'query',
    notEmpty: true,
  },
};
