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


