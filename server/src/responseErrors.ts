class ResponsError extends Error {
  status: number;
  code: number;
  constructor(name: string, message: string, status: number, code: number) {
    super(message);
    this.name = name;
    this.status = status??500;
    this.code = code??0;
  }
}

export const BankIdNotFound = new ResponsError(
    'BankIdNotFound',
    'Bank id not found',
    400,
    -3001,
);
export const CaptchaIncorrect = new ResponsError(
    'CaptchaIncorrect',
    'Captcha Incorrect',
    401,
    -1005,
);
export const CheckPasswordIncorrect = new ResponsError(
    'CheckPasswordIncorrect',
    'check password incorrect',
    403,
    -1003,
);
export const CreateTransationDollarsLessZero = new ResponsError(
    'CreateTransationDollarsLessZero',
    'Dollars or points less than zero.',
    400,
    -3003,
);
export const GsPayDepositError = new ResponsError(
    'GsPayDepositError',
    'Dollars or points less than zero.',
    400,
    -3004,
);
export const GsPayOrderNotFound = new ResponsError(
    'GsPayOrderNotFound',
    'post gspay: order not found.',
    404,
    -3005,
);
export const LoginFailed = new ResponsError(
    'LoginFailed',
    'Login failed',
    403,
    -1004,
);
export const PhoneConfilct = new ResponsError(
    'PhoneConfilct',
    'Phone is confilct',
    409,
    -1007,
);
export const PhoneNotFound = new ResponsError(
    'PhoneNotFound',
    'Phone not found',
    404,
    -1001,
);
export const RegisterReferralCode = new ResponsError(
    'RegisterReferralCode',
    'Referral code no map to the user',
    401,
    -1006,
);
export const TransactionOrderNotFound = new ResponsError(
    'TransactionOrderNotFound',
    'Transaction order not found.',
    404,
    -3006,
);
export const TransactionQRCodeNotFound = new ResponsError(
    'TransactionQRCodeNotFound',
    'Transaction QR Code Not Found',
    404,
    -3006,
);
export const TransactionUpdateStateAppeal = new ResponsError(
    'TransactionUpdateStateAppeal',
    'The order is appeal.',
    403,
    -3008,
);
export const TransactionUpdateStateError = new ResponsError(
    'TransactionUpdateStateError',
    'The user is not authorized to update the order.',
    403,
    -3007,
);
export const TransactionUpdateStateTimeout = new ResponsError(
    'TransactionUpdateStateTimeout',
    'The order already timeout.',
    403,
    -3008,
);
export const TransationUserIsNotAuthorized = new ResponsError(
    'TransationUserIsNotAuthorized',
    'User is not authorized',
    403,
    -3002,
);
export const UserNotAuthorized = new ResponsError(
    'UserNotAuthorized',
    'User is not authorized',
    403,
    -1008,
);
export const VerificationCodeIncorrect = new ResponsError(
    'VerificationCodeIncorrect',
    'verification code incorrect',
    403,
    -1002,
);
