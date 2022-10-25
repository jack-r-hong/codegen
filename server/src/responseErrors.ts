export class ResponsError extends Error {
  status: number;
  code: number;
  cnMsg: string;
  constructor(
      name: string,
      message: string,
      status: number,
      code: number,
      cnMsg: string,
  ) {
    super(message);
    this.name = name;
    this.status = status??500;
    this.code = code??0;
    this.cnMsg = cnMsg;
  }
}

export const BadRequest = new ResponsError(
    'BadRequest',
    'server error',
    400,
    -4002,
    '參數錯誤',
);
export const BankIdNotFound = new ResponsError(
    'BankIdNotFound',
    'Bank id not found',
    404,
    -3001,
    '找不到使用銀行資料',
);
export const CaptchaIncorrect = new ResponsError(
    'CaptchaIncorrect',
    'Captcha Incorrect',
    401,
    -1005,
    '圖形驗證失敗',
);
export const CheckPasswordIncorrect = new ResponsError(
    'CheckPasswordIncorrect',
    'check password incorrect',
    403,
    -1003,
    '兩次密碼不相符',
);
export const CreateTransationDollarsLessZero = new ResponsError(
    'CreateTransationDollarsLessZero',
    'Dollars or points less than zero.',
    400,
    -3003,
    '該交易訂單的點數或金額小於或等於零。',
);
export const GsPayDepositError = new ResponsError(
    'GsPayDepositError',
    'Dollars or points less than zero.',
    400,
    -3004,
    '第三方支付取號失敗。',
);
export const GsPayOrderNotFound = new ResponsError(
    'GsPayOrderNotFound',
    'post gspay: order not found.',
    404,
    -3005,
    '該交易單號與第三方支付訂單不匹配，請重新申請交易。',
);
export const LoginFailed = new ResponsError(
    'LoginFailed',
    'Login failed',
    403,
    -1004,
    '帳號或密碼錯誤',
);
export const NotFoundGetRealVerify = new ResponsError(
    'NotFoundGetRealVerify',
    'Not found user real verify',
    404,
    -1010,
    '沒有找到使用者認證資料。',
);
export const NotFoundReadOneBackstageUser = new ResponsError(
    'NotFoundReadOneBackstageUser',
    'Not found user',
    404,
    -1011,
    '沒有找到使用者資料',
);
export const NotFoundUserVerifyPhoto = new ResponsError(
    'NotFoundUserVerifyPhoto',
    'Not found user verify photo',
    404,
    -1012,
    '找不到使用者圖片',
);
export const PhoneConfilct = new ResponsError(
    'PhoneConfilct',
    'Phone is confilct',
    409,
    -1007,
    '電話號碼重複',
);
export const PhoneNotFound = new ResponsError(
    'PhoneNotFound',
    'Phone not found',
    404,
    -1001,
    '此電話未註冊',
);
export const RegisterReferralCode = new ResponsError(
    'RegisterReferralCode',
    'Referral code no map to the user',
    401,
    -1006,
    '此邀請碼未有對應使用者，請重新輸入或不輸入',
);
export const ServerError = new ResponsError(
    'ServerError',
    'server error',
    500,
    -4001,
    '伺服器錯誤',
);
export const TransactionOrderNotFound = new ResponsError(
    'TransactionOrderNotFound',
    'Transaction order not found.',
    404,
    -3006,
    '找不到該訂單',
);
export const TransactionQRCodeNotFound = new ResponsError(
    'TransactionQRCodeNotFound',
    'Transaction QR Code Not Found',
    404,
    -3006,
    '找不到付款QRcode。',
);
export const TransactionUpdateStateAppeal = new ResponsError(
    'TransactionUpdateStateAppeal',
    'The order is appeal.',
    403,
    -3008,
    '訂單申訴中。',
);
export const TransactionUpdateStateError = new ResponsError(
    'TransactionUpdateStateError',
    'The user is not authorized to update the order.',
    403,
    -3007,
    '該使用者無權限更新訂單狀態。',
);
export const TransactionUpdateStateTimeout = new ResponsError(
    'TransactionUpdateStateTimeout',
    'The order already timeout.',
    403,
    -3008,
    '此訂單已經過期。',
);
export const TransationUserIsNotAuthorized = new ResponsError(
    'TransationUserIsNotAuthorized',
    'User is not authorized',
    403,
    -3002,
    '使用者尚未完成實名驗證，請完成驗證後再次操作。',
);
export const UserCookieExpired = new ResponsError(
    'UserCookieExpired',
    'cookies expired',
    401,
    -1009,
    '認證過期請重新登入。',
);
export const UserNotAuthorized = new ResponsError(
    'UserNotAuthorized',
    'User is not authorized',
    403,
    -1008,
    '使用者未經認證，請重新登入。',
);
export const VerificationCodeIncorrect = new ResponsError(
    'VerificationCodeIncorrect',
    'verification code incorrect',
    403,
    -1002,
    '驗證碼錯誤',
);
