import {Request} from 'express';
import {Query, ParamsDictionary} from 'express-serve-static-core';

interface TypedRequest<
  T,
  U extends Query,
  P extends ParamsDictionary,
  C
> extends Request {
  body: T,
  query: U,
  params: P,
  cookies: C
}


type ReadOneBackstageUserReqBody = {
  }

type ReadOneBackstageUserReqQuery = {
}

type ReadOneBackstageUserReqParams = {
      id: string
,
}

type ReadOneBackstageUserReqCookie = {
}

export interface ReadOneBackstageUserRequest extends TypedRequest<
  ReadOneBackstageUserReqBody,
  ReadOneBackstageUserReqQuery,
  ReadOneBackstageUserReqParams,
  ReadOneBackstageUserReqCookie
>{
}

export type ReadOneBackstageUserParams = {
      pathId: string
}


export const ReadOneBackstageUserRequestConvert = (
    body: ReadOneBackstageUserReqBody,
    query: ReadOneBackstageUserReqQuery,
    path: ReadOneBackstageUserReqParams,
    cookie: ReadOneBackstageUserReqCookie,
): ReadOneBackstageUserParams => {
  return {
            pathId: path.id,
  };
};
type UpdateOneBackstageUserReqBody = {
  }

type UpdateOneBackstageUserReqQuery = {
}

type UpdateOneBackstageUserReqParams = {
      id: string
,
}

type UpdateOneBackstageUserReqCookie = {
}

export interface UpdateOneBackstageUserRequest extends TypedRequest<
  UpdateOneBackstageUserReqBody,
  UpdateOneBackstageUserReqQuery,
  UpdateOneBackstageUserReqParams,
  UpdateOneBackstageUserReqCookie
>{
}

export type UpdateOneBackstageUserParams = {
      pathId: string
}


export const UpdateOneBackstageUserRequestConvert = (
    body: UpdateOneBackstageUserReqBody,
    query: UpdateOneBackstageUserReqQuery,
    path: UpdateOneBackstageUserReqParams,
    cookie: UpdateOneBackstageUserReqCookie,
): UpdateOneBackstageUserParams => {
  return {
            pathId: path.id,
  };
};
type ReadManyUserBackstageReqBody = {
  }

type ReadManyUserBackstageReqQuery = {
      orderBy: string
      orderByField: string
      page: string
      take: string
}

type ReadManyUserBackstageReqParams = {
}

type ReadManyUserBackstageReqCookie = {
}

export interface ReadManyUserBackstageRequest extends TypedRequest<
  ReadManyUserBackstageReqBody,
  ReadManyUserBackstageReqQuery,
  ReadManyUserBackstageReqParams,
  ReadManyUserBackstageReqCookie
>{
}

export type ReadManyUserBackstageParams = {
      queryOrderBy: string
      queryOrderByField: string
      queryPage: number
      queryTake: number
}


export const ReadManyUserBackstageRequestConvert = (
    body: ReadManyUserBackstageReqBody,
    query: ReadManyUserBackstageReqQuery,
    path: ReadManyUserBackstageReqParams,
    cookie: ReadManyUserBackstageReqCookie,
): ReadManyUserBackstageParams => {
  return {
            queryOrderBy: query.orderBy,
            queryOrderByField: query.orderByField,
          queryPage: parseInt(query.page),
          queryTake: parseInt(query.take),
  };
};
type CaptchaReqBody = {
  }

type CaptchaReqQuery = {
}

type CaptchaReqParams = {
}

type CaptchaReqCookie = {
}

export interface CaptchaRequest extends TypedRequest<
  CaptchaReqBody,
  CaptchaReqQuery,
  CaptchaReqParams,
  CaptchaReqCookie
>{
}

export type CaptchaParams = {
}


export const CaptchaRequestConvert = (
    body: CaptchaReqBody,
    query: CaptchaReqQuery,
    path: CaptchaReqParams,
    cookie: CaptchaReqCookie,
): CaptchaParams => {
  return {
  };
};
type LoginUserReqBody = {
  password: string,
phone: string,
phonePrefix: string,
}

type LoginUserReqQuery = {
}

type LoginUserReqParams = {
}

type LoginUserReqCookie = {
}

export interface LoginUserRequest extends TypedRequest<
  LoginUserReqBody,
  LoginUserReqQuery,
  LoginUserReqParams,
  LoginUserReqCookie
>{
}

export type LoginUserParams = {
bodyPassword: string,
bodyPhone: string,
bodyPhonePrefix: string,
}


export const LoginUserRequestConvert = (
    body: LoginUserReqBody,
    query: LoginUserReqQuery,
    path: LoginUserReqParams,
    cookie: LoginUserReqCookie,
): LoginUserParams => {
  return {
    bodyPassword: body.password,
    bodyPhone: body.phone,
    bodyPhonePrefix: body.phonePrefix,
  };
};
type PostRealVerifyReqBody = {
  address: string,
area: string,
        bankAccounts: {
                account: string,
                code: string,
                name: string,
        }[],
birthdate: string,
city: string,
country: string,
email: string,
idCard: string,
idCardDate: string,
idCardPosiition: string,
idCardType: string,
name: string,
}

type PostRealVerifyReqQuery = {
}

type PostRealVerifyReqParams = {
}

type PostRealVerifyReqCookie = {
}

export interface PostRealVerifyRequest extends TypedRequest<
  PostRealVerifyReqBody,
  PostRealVerifyReqQuery,
  PostRealVerifyReqParams,
  PostRealVerifyReqCookie
>{
}

export type PostRealVerifyParams = {
bodyAddress: string,
bodyArea: string,
        bodyBankAccounts: {
            bodyAccount: number,
            bodyCode: number,
            bodyName: string,
        }[],
bodyBirthdate: string,
bodyCity: string,
bodyCountry: string,
bodyEmail: string,
bodyIdCard: string,
bodyIdCardDate: string,
bodyIdCardPosiition: string,
bodyIdCardType: number,
bodyName: string,
}


export const PostRealVerifyRequestConvert = (
    body: PostRealVerifyReqBody,
    query: PostRealVerifyReqQuery,
    path: PostRealVerifyReqParams,
    cookie: PostRealVerifyReqCookie,
): PostRealVerifyParams => {
  return {
    bodyAddress: body.address,
    bodyArea: body.area,
    bodyBankAccounts: body.bankAccounts.map((body :any) => {
      return {
        bodyAccount: parseInt(body.account),
        bodyCode: parseInt(body.code),
        bodyName: body.name,
      };
    }),
    bodyBirthdate: body.birthdate,
    bodyCity: body.city,
    bodyCountry: body.country,
    bodyEmail: body.email,
    bodyIdCard: body.idCard,
    bodyIdCardDate: body.idCardDate,
    bodyIdCardPosiition: body.idCardPosiition,
    bodyIdCardType: parseInt(body.idCardType),
    bodyName: body.name,
  };
};
type PutRealVerifyReqBody = {
  address: string,
area: string,
birthdate: string,
city: string,
country: string,
email: string,
idCard: string,
idCardDate: string,
idCardPosiition: string,
idCardType: string,
name: string,
}

type PutRealVerifyReqQuery = {
}

type PutRealVerifyReqParams = {
}

type PutRealVerifyReqCookie = {
}

export interface PutRealVerifyRequest extends TypedRequest<
  PutRealVerifyReqBody,
  PutRealVerifyReqQuery,
  PutRealVerifyReqParams,
  PutRealVerifyReqCookie
>{
}

export type PutRealVerifyParams = {
bodyAddress: string,
bodyArea: string,
bodyBirthdate: string,
bodyCity: string,
bodyCountry: string,
bodyEmail: string,
bodyIdCard: string,
bodyIdCardDate: string,
bodyIdCardPosiition: string,
bodyIdCardType: number,
bodyName: string,
}


export const PutRealVerifyRequestConvert = (
    body: PutRealVerifyReqBody,
    query: PutRealVerifyReqQuery,
    path: PutRealVerifyReqParams,
    cookie: PutRealVerifyReqCookie,
): PutRealVerifyParams => {
  return {
    bodyAddress: body.address,
    bodyArea: body.area,
    bodyBirthdate: body.birthdate,
    bodyCity: body.city,
    bodyCountry: body.country,
    bodyEmail: body.email,
    bodyIdCard: body.idCard,
    bodyIdCardDate: body.idCardDate,
    bodyIdCardPosiition: body.idCardPosiition,
    bodyIdCardType: parseInt(body.idCardType),
    bodyName: body.name,
  };
};
type RegisterUserReqBody = {
  captcha: string,
password: string,
passwordCheck: string,
phone: string,
phonePrefix: string,
}

type RegisterUserReqQuery = {
}

type RegisterUserReqParams = {
}

type RegisterUserReqCookie = {
}

export interface RegisterUserRequest extends TypedRequest<
  RegisterUserReqBody,
  RegisterUserReqQuery,
  RegisterUserReqParams,
  RegisterUserReqCookie
>{
}

export type RegisterUserParams = {
bodyCaptcha: string,
bodyPassword: string,
bodyPasswordCheck: string,
bodyPhone: string,
bodyPhonePrefix: string,
}


export const RegisterUserRequestConvert = (
    body: RegisterUserReqBody,
    query: RegisterUserReqQuery,
    path: RegisterUserReqParams,
    cookie: RegisterUserReqCookie,
): RegisterUserParams => {
  return {
    bodyCaptcha: body.captcha,
    bodyPassword: body.password,
    bodyPasswordCheck: body.passwordCheck,
    bodyPhone: body.phone,
    bodyPhonePrefix: body.phonePrefix,
  };
};
type SendPhoneCheckReqBody = {
  }

type SendPhoneCheckReqQuery = {
}

type SendPhoneCheckReqParams = {
}

type SendPhoneCheckReqCookie = {
}

export interface SendPhoneCheckRequest extends TypedRequest<
  SendPhoneCheckReqBody,
  SendPhoneCheckReqQuery,
  SendPhoneCheckReqParams,
  SendPhoneCheckReqCookie
>{
}

export type SendPhoneCheckParams = {
}


export const SendPhoneCheckRequestConvert = (
    body: SendPhoneCheckReqBody,
    query: SendPhoneCheckReqQuery,
    path: SendPhoneCheckReqParams,
    cookie: SendPhoneCheckReqCookie,
): SendPhoneCheckParams => {
  return {
  };
};
type PhoneCheckReqBody = {
  verify: string,
}

type PhoneCheckReqQuery = {
}

type PhoneCheckReqParams = {
}

type PhoneCheckReqCookie = {
}

export interface PhoneCheckRequest extends TypedRequest<
  PhoneCheckReqBody,
  PhoneCheckReqQuery,
  PhoneCheckReqParams,
  PhoneCheckReqCookie
>{
}

export type PhoneCheckParams = {
bodyVerify: string,
}


export const PhoneCheckRequestConvert = (
    body: PhoneCheckReqBody,
    query: PhoneCheckReqQuery,
    path: PhoneCheckReqParams,
    cookie: PhoneCheckReqCookie,
): PhoneCheckParams => {
  return {
    bodyVerify: body.verify,
  };
};
type UpdateOneyUserReqBody = {
  }

type UpdateOneyUserReqQuery = {
}

type UpdateOneyUserReqParams = {
      id: string
,
}

type UpdateOneyUserReqCookie = {
}

export interface UpdateOneyUserRequest extends TypedRequest<
  UpdateOneyUserReqBody,
  UpdateOneyUserReqQuery,
  UpdateOneyUserReqParams,
  UpdateOneyUserReqCookie
>{
}

export type UpdateOneyUserParams = {
      pathId: string
}


export const UpdateOneyUserRequestConvert = (
    body: UpdateOneyUserReqBody,
    query: UpdateOneyUserReqQuery,
    path: UpdateOneyUserReqParams,
    cookie: UpdateOneyUserReqCookie,
): UpdateOneyUserParams => {
  return {
            pathId: path.id,
  };
};


