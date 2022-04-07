// eslint-disable-next-line no-unused-vars
import {Schema, CustomValidator} from 'express-validator';
import * as sessions from '../../sessions';
// custom begin import

// custom end import
export const readOnePhotoValidator: Schema = {
  id: {
    in: 'params',
    isInt: true,
    notEmpty: true,
  },
};
export const updateOnePhotoValidator: Schema = {
  id: {
    in: 'params',
    isInt: true,
    notEmpty: true,
  },
  afterLevel: {
    in: 'body',
    isInt: true,
    optional: {
      options: {
        nullable: true,
      },
    },
    matches: {
      options: /^(1|2|3)/,
    },
  },
  beforeLevel: {
    in: 'body',
    isInt: true,
    optional: {
      options: {
        nullable: true,
      },
    },
    matches: {
      options: /^(1|2|3)/,
    },
  },
  filePath2: {
    in: 'body',
    optional: {
      options: {
        nullable: true,
      },
    },
  },
  process: {
    in: 'body',
    isInt: true,
    optional: {
      options: {
        nullable: true,
      },
    },
    matches: {
      options: /^(1|2|3)/,
    },
  },
  status: {
    in: 'body',
    isInt: true,
    optional: {
      options: {
        nullable: true,
      },
    },
    matches: {
      options: /^(1|2|3|4)/,
    },
  },
};
export const deleteManyPhotoValidator: Schema = {
  id: {
    in: 'query',
    notEmpty: true,
  },
};
export const readManyPhotoValidator: Schema = {
  orderBy: {
    in: 'query',
  },
  orderByField: {
    in: 'query',
  },
};
export const uploadManyPhotoValidator: Schema = {
};
export const updateManyPhotoValidator: Schema = {
  dataList: {
    in: 'body',
  },
  whereField: {
    in: 'body',
  },
};
