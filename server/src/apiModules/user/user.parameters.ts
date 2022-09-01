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
  email: string|null,
password: string,
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
bodyEmail: string|null,
bodyPassword: string,
}


export const LoginUserRequestConvert = (
    body: LoginUserReqBody,
    query: LoginUserReqQuery,
    path: LoginUserReqParams,
    cookie: LoginUserReqCookie,
): LoginUserParams => {
  return {
    bodyEmail: body.email,
    bodyPassword: body.password,
  };
};
type LogoutUserReqBody = {
  }

type LogoutUserReqQuery = {
}

type LogoutUserReqParams = {
}

type LogoutUserReqCookie = {
}

export interface LogoutUserRequest extends TypedRequest<
  LogoutUserReqBody,
  LogoutUserReqQuery,
  LogoutUserReqParams,
  LogoutUserReqCookie
>{
}

export type LogoutUserParams = {
}


export const LogoutUserRequestConvert = (
    body: LogoutUserReqBody,
    query: LogoutUserReqQuery,
    path: LogoutUserReqParams,
    cookie: LogoutUserReqCookie,
): LogoutUserParams => {
  return {
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
type DeleteOneUserReqBody = {
  }

type DeleteOneUserReqQuery = {
}

type DeleteOneUserReqParams = {
      id: string
,
}

type DeleteOneUserReqCookie = {
}

export interface DeleteOneUserRequest extends TypedRequest<
  DeleteOneUserReqBody,
  DeleteOneUserReqQuery,
  DeleteOneUserReqParams,
  DeleteOneUserReqCookie
>{
}

export type DeleteOneUserParams = {
      pathId: string
}


export const DeleteOneUserRequestConvert = (
    body: DeleteOneUserReqBody,
    query: DeleteOneUserReqQuery,
    path: DeleteOneUserReqParams,
    cookie: DeleteOneUserReqCookie,
): DeleteOneUserParams => {
  return {
            pathId: path.id,
  };
};
type ReadOneUserReqBody = {
  }

type ReadOneUserReqQuery = {
}

type ReadOneUserReqParams = {
      id: string
,
}

type ReadOneUserReqCookie = {
}

export interface ReadOneUserRequest extends TypedRequest<
  ReadOneUserReqBody,
  ReadOneUserReqQuery,
  ReadOneUserReqParams,
  ReadOneUserReqCookie
>{
}

export type ReadOneUserParams = {
      pathId: string
}


export const ReadOneUserRequestConvert = (
    body: ReadOneUserReqBody,
    query: ReadOneUserReqQuery,
    path: ReadOneUserReqParams,
    cookie: ReadOneUserReqCookie,
): ReadOneUserParams => {
  return {
            pathId: path.id,
  };
};
type UpdateOneUserReqBody = {
  email: string|null,
name: string|null,
password: string,
phone: string,
userStatus: string|undefined,
}

type UpdateOneUserReqQuery = {
}

type UpdateOneUserReqParams = {
      id: string
,
}

type UpdateOneUserReqCookie = {
}

export interface UpdateOneUserRequest extends TypedRequest<
  UpdateOneUserReqBody,
  UpdateOneUserReqQuery,
  UpdateOneUserReqParams,
  UpdateOneUserReqCookie
>{
}

export type UpdateOneUserParams = {
      pathId: string
bodyEmail: string|null,
bodyName: string|null,
bodyPassword: string,
bodyPhone: string,
bodyUserStatus: number|undefined,
}


export const UpdateOneUserRequestConvert = (
    body: UpdateOneUserReqBody,
    query: UpdateOneUserReqQuery,
    path: UpdateOneUserReqParams,
    cookie: UpdateOneUserReqCookie,
): UpdateOneUserParams => {
  return {
      pathId: path.id,
    bodyEmail: body.email,
    bodyName: body.name,
    bodyPassword: body.password,
    bodyPhone: body.phone,
    bodyUserStatus: body.userStatus? parseInt(body.userStatus):undefined,
  };
};
type ReadManyUserReqBody = {
  }

type ReadManyUserReqQuery = {
}

type ReadManyUserReqParams = {
}

type ReadManyUserReqCookie = {
}

export interface ReadManyUserRequest extends TypedRequest<
  ReadManyUserReqBody,
  ReadManyUserReqQuery,
  ReadManyUserReqParams,
  ReadManyUserReqCookie
>{
}

export type ReadManyUserParams = {
}


export const ReadManyUserRequestConvert = (
    body: ReadManyUserReqBody,
    query: ReadManyUserReqQuery,
    path: ReadManyUserReqParams,
    cookie: ReadManyUserReqCookie,
): ReadManyUserParams => {
  return {
  };
};


