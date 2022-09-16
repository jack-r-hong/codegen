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


type GetAdminFromIdReqBody = {
  id: string,
}

type GetAdminFromIdReqQuery = {
}

type GetAdminFromIdReqParams = {
}

type GetAdminFromIdReqCookie = {
}

export interface GetAdminFromIdRequest extends TypedRequest<
  GetAdminFromIdReqBody,
  GetAdminFromIdReqQuery,
  GetAdminFromIdReqParams,
  GetAdminFromIdReqCookie
>{
}

export type GetAdminFromIdParams = {
bodyId: string,
}


export const GetAdminFromIdRequestConvert = (
    body: GetAdminFromIdReqBody,
    query: GetAdminFromIdReqQuery,
    path: GetAdminFromIdReqParams,
    cookie: GetAdminFromIdReqCookie,
): GetAdminFromIdParams => {
  return {
    bodyId: body.id,
  };
};
type AdminLoginReqBody = {
  account: string,
password: string,
}

type AdminLoginReqQuery = {
}

type AdminLoginReqParams = {
}

type AdminLoginReqCookie = {
}

export interface AdminLoginRequest extends TypedRequest<
  AdminLoginReqBody,
  AdminLoginReqQuery,
  AdminLoginReqParams,
  AdminLoginReqCookie
>{
}

export type AdminLoginParams = {
bodyAccount: string,
bodyPassword: string,
}


export const AdminLoginRequestConvert = (
    body: AdminLoginReqBody,
    query: AdminLoginReqQuery,
    path: AdminLoginReqParams,
    cookie: AdminLoginReqCookie,
): AdminLoginParams => {
  return {
    bodyAccount: body.account,
    bodyPassword: body.password,
  };
};
type AdminRegisterReqBody = {
  account: string,
password: string,
}

type AdminRegisterReqQuery = {
}

type AdminRegisterReqParams = {
}

type AdminRegisterReqCookie = {
}

export interface AdminRegisterRequest extends TypedRequest<
  AdminRegisterReqBody,
  AdminRegisterReqQuery,
  AdminRegisterReqParams,
  AdminRegisterReqCookie
>{
}

export type AdminRegisterParams = {
bodyAccount: string,
bodyPassword: string,
}


export const AdminRegisterRequestConvert = (
    body: AdminRegisterReqBody,
    query: AdminRegisterReqQuery,
    path: AdminRegisterReqParams,
    cookie: AdminRegisterReqCookie,
): AdminRegisterParams => {
  return {
    bodyAccount: body.account,
    bodyPassword: body.password,
  };
};


