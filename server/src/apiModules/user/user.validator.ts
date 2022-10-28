// eslint-disable-next-line no-unused-vars
import {Schema, CustomValidator} from 'express-validator';
import * as sessions from '../../sessions';
// custom begin import

// custom end import



export const getUserBackstageAgentsValidator: Schema = {
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
export const readBackstageUserResonValidator: Schema = {
};
export const createBackstageUserResonValidator: Schema = {
  'des': {
    in: 'body',
    isString: true,
  },
};
export const deleteBackstageUserResonValidator: Schema = {
  'resonId': {
    in: 'params',
    isInt: true,
    notEmpty: true,
  },
};
export const updateBackstageUserResonValidator: Schema = {
  'resonId': {
    in: 'params',
    isInt: true,
    notEmpty: true,
  },
  'des': {
    in: 'body',
    isString: true,
  },
};
export const updateBackstageUserValidator: Schema = {
  'id': {
    in: 'params',
    isString: true,
    notEmpty: true,
  },
  'address': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'addressResonId': {
    in: 'body',
    isInt: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
  'area': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'areaResonId': {
    in: 'body',
    isInt: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
  'birthdate': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'birthdateResonId': {
    in: 'body',
    isInt: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
  'city': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'cityResonId': {
    in: 'body',
    isInt: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
  'country': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'countryResonId': {
    in: 'body',
    isInt: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
  'gameUid': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'gameUidResonId': {
    in: 'body',
    isInt: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
  'idCard': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'idCardDate': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'idCardDateResonId': {
    in: 'body',
    isInt: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
  'idCardPhoto': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'idCardPhotoResonId': {
    in: 'body',
    isInt: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
  'idCardPosiition': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'idCardPosiitionResonId': {
    in: 'body',
    isInt: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
  'idCardResonId': {
    in: 'body',
    isInt: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
  'idCardType': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'idCardTypeResonId': {
    in: 'body',
    isInt: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
  'lineId': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'lineIdResonId': {
    in: 'body',
    isInt: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
  'name': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'nameResonId': {
    in: 'body',
    isInt: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
  'selfie': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'selfieResonId': {
    in: 'body',
    isInt: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
};
export const readOneBackstageUserValidator: Schema = {
  'id': {
    in: 'params',
    isString: true,
    notEmpty: true,
  },
};
export const UpdateUserStatusOrRemarkOrRebateValidator: Schema = {
  'id': {
    in: 'params',
    isString: true,
    notEmpty: true,
  },
  'level': {
    in: 'body',
    isInt: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
  'rebate': {
    in: 'body',
    optional: {
  options: {
    nullable: true,
  },
},
matches: {
  options: /^\d{1,2}.\d{2}$/,
},
  },
  'remark': {
    in: 'body',
    isString: true,
optional: {
  options: {
    nullable: true,
  },
},
  },
};
export const readBackstageUserTransactionValidator: Schema = {
  'id': {
    in: 'params',
    isString: true,
    notEmpty: true,
  },
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
  'start_time': {
    in: 'query',
    isString: true,
    matches: {
      options: /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
    },
  },
  'end_time': {
    in: 'query',
    isString: true,
    matches: {
      options: /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
    },
  },
};
export const getManyUserBackstageValidator: Schema = {
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
export const captchaValidator: Schema = {
};
export const getOneCustomServiceUserValidator: Schema = {
  'id': {
    in: 'params',
    isString: true,
    notEmpty: true,
  },
};
export const forgetPasswordPhoneCheckValidator: Schema = {
  'phone': {
    in: 'body',
    isString: true,
  },
  'phonePrefix': {
    in: 'body',
    isString: true,
  },
};
export const forgetPasswordPhoneCheckVerifyValidator: Schema = {
  'verify': {
    in: 'body',
    isString: true,
  },
};
export const forgetPasswordResetValidator: Schema = {
  'password': {
    in: 'body',
    isString: true,
    isLength: {
      options: {
        max: 30,
        min: 8,
      },

    },
  },
  'passwordCheck': {
    in: 'body',
    isString: true,
    isLength: {
      options: {
        max: 30,
        min: 8,
      },

    },
  },
};
export const loginUserValidator: Schema = {
  'password': {
    in: 'body',
    isString: true,
    isLength: {
      options: {
        max: 30,
        min: 8,
      },

    },
  },
  'phone': {
    in: 'body',
    isString: true,
  },
  'phonePrefix': {
    in: 'body',
    isString: true,
  },
};
export const logoutUserValidator: Schema = {
};
export const getRealVerifyValidator: Schema = {
  'JSESSIONID': {
    in: 'cookies',
    custom: {
      options: (value, {req, location, path}) => {
        sessions.cookieAuthSessionVerify(req['session']);
        return true;
      },
    },
  },
};
export const postRealVerifyValidator: Schema = {
  'address': {
    in: 'body',
    isString: true,
  },
  'area': {
    in: 'body',
    isString: true,
  },
  'bankAccounts': {
    in: 'body',
    isArray: true,
  },
  'bankAccounts.*.account': {
    isInt: true,
  },
  'bankAccounts.*.code': {
    isInt: true,
  },
  'bankAccounts.*.name': {
    isString: true,
  },
  'bankAccounts.*.order': {
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'birthdate': {
    in: 'body',
    isString: true,
  },
  'city': {
    in: 'body',
    isString: true,
  },
  'country': {
    in: 'body',
    isString: true,
  },
  'gameUid': {
    in: 'body',
    isString: true,
  },
  'idCard': {
    in: 'body',
    isString: true,
  },
  'idCardDate': {
    in: 'body',
    isString: true,
  },
  'idCardPosiition': {
    in: 'body',
    isString: true,
  },
  'idCardType': {
    in: 'body',
    isInt: true,
    matches: {
      options: /^(1|2|3)/,
    },
  },
  'lineId': {
    in: 'body',
    isString: true,
  },
  'linePay': {
    in: 'body',
    isString: true,
  },
  'name': {
    in: 'body',
    isString: true,
    isLength: {
      options: {
        max: 30,
        min: 1,
      },

    },
  },
  'JSESSIONID': {
    in: 'cookies',
    custom: {
      options: (value, {req, location, path}) => {
        sessions.cookieAuthSessionVerify(req['session']);
        return true;
      },
    },
  },
};
export const registerUserValidator: Schema = {
  'captcha': {
    in: 'body',
    isString: true,
  },
  'password': {
    in: 'body',
    isString: true,
    isLength: {
      options: {
        max: 30,
        min: 8,
      },

    },
  },
  'passwordCheck': {
    in: 'body',
    isString: true,
    isLength: {
      options: {
        max: 30,
        min: 8,
      },

    },
  },
  'phone': {
    in: 'body',
    isString: true,
  },
  'phoneCaptcha': {
    in: 'body',
    isString: true,
  },
  'promoteCode': {
    in: 'body',
    isString: true,
  },
};
export const phoneCheckValidator: Schema = {
  'phone': {
    in: 'body',
    isString: true,
  },
};
export const getUserMyStatusValidator: Schema = {
  'JSESSIONID': {
    in: 'cookies',
    custom: {
      options: (value, {req, location, path}) => {
        sessions.cookieAuthSessionVerify(req['session']);
        return true;
      },
    },
  },
};
export const updateOneyUserValidator: Schema = {
  'id': {
    in: 'params',
    isString: true,
    notEmpty: true,
  },
  'JSESSIONID': {
    in: 'cookies',
    custom: {
      options: (value, {req, location, path}) => {
        sessions.cookieAuthSessionVerify(req['session']);
        return true;
      },
    },
  },
};
