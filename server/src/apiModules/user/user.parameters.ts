import {Request} from 'express';
import {Query, ParamsDictionary} from 'express-serve-static-core';

interface TypedRequest<
  T,
  U extends Query,
  P extends ParamsDictionary
> extends Request {
  body: T,
  query: U,
  params: P,
}


type GoogleLoginReqBody = {
  email: string,
id: string,
name: string,
}

type GoogleLoginReqQuery = {
}

type GoogleLoginReqParams = {
}

export interface GoogleLoginRequest extends TypedRequest<
  GoogleLoginReqBody,
  GoogleLoginReqQuery,
  GoogleLoginReqParams
>{
}

export type GoogleLoginParams = {
bodyEmail: string,
bodyId: string,
bodyName: string,
}

export const GoogleLoginRequestConvert = (
    body: GoogleLoginReqBody,
    query: GoogleLoginReqQuery,
    path: GoogleLoginReqParams,
): GoogleLoginParams => {
  return {
    bodyEmail: body.email,
    bodyId: body.id,
    bodyName: body.name,
  };
};
type LoginUserReqBody = {
  email: string,
password: string,
}

type LoginUserReqQuery = {
}

type LoginUserReqParams = {
}

export interface LoginUserRequest extends TypedRequest<
  LoginUserReqBody,
  LoginUserReqQuery,
  LoginUserReqParams
>{
}

export type LoginUserParams = {
bodyEmail: string,
bodyPassword: string,
}

export const LoginUserRequestConvert = (
    body: LoginUserReqBody,
    query: LoginUserReqQuery,
    path: LoginUserReqParams,
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

export interface LogoutUserRequest extends TypedRequest<
  LogoutUserReqBody,
  LogoutUserReqQuery,
  LogoutUserReqParams
>{
}

export type LogoutUserParams = {
}

export const LogoutUserRequestConvert = (
    body: LogoutUserReqBody,
    query: LogoutUserReqQuery,
    path: LogoutUserReqParams,
): LogoutUserParams => {
  return {
  };
};
type RegisterUserReqBody = {
  authLevel: string|undefined,
email: string,
password: string,
phone: string|null,
userStatus: string|undefined,
username: string,
}

type RegisterUserReqQuery = {
}

type RegisterUserReqParams = {
}

export interface RegisterUserRequest extends TypedRequest<
  RegisterUserReqBody,
  RegisterUserReqQuery,
  RegisterUserReqParams
>{
}

export type RegisterUserParams = {
bodyAuthLevel: number|undefined,
bodyEmail: string,
bodyPassword: string,
bodyPhone: string|null,
bodyUserStatus: number|undefined,
bodyUsername: string,
}

export const RegisterUserRequestConvert = (
    body: RegisterUserReqBody,
    query: RegisterUserReqQuery,
    path: RegisterUserReqParams,
): RegisterUserParams => {
  return {
    bodyAuthLevel: body.authLevel? parseInt(body.authLevel):undefined,
    bodyEmail: body.email,
    bodyPassword: body.password,
    bodyPhone: body.phone,
    bodyUserStatus: body.userStatus? parseInt(body.userStatus):undefined,
    bodyUsername: body.username,
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

export interface DeleteOneUserRequest extends TypedRequest<
  DeleteOneUserReqBody,
  DeleteOneUserReqQuery,
  DeleteOneUserReqParams
>{
}

export type DeleteOneUserParams = {
      pathId: string
}

export const DeleteOneUserRequestConvert = (
    body: DeleteOneUserReqBody,
    query: DeleteOneUserReqQuery,
    path: DeleteOneUserReqParams,
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

export interface ReadOneUserRequest extends TypedRequest<
  ReadOneUserReqBody,
  ReadOneUserReqQuery,
  ReadOneUserReqParams
>{
}

export type ReadOneUserParams = {
      pathId: string
}

export const ReadOneUserRequestConvert = (
    body: ReadOneUserReqBody,
    query: ReadOneUserReqQuery,
    path: ReadOneUserReqParams,
): ReadOneUserParams => {
  return {
    pathId: path.id,
  };
};
type UpdateOneUserReqBody = {
  authLevel: string|undefined,
email: string,
password: string,
phone: string|null,
userStatus: string|undefined,
username: string,
}

type UpdateOneUserReqQuery = {
}

type UpdateOneUserReqParams = {
      id: string
,
}

export interface UpdateOneUserRequest extends TypedRequest<
  UpdateOneUserReqBody,
  UpdateOneUserReqQuery,
  UpdateOneUserReqParams
>{
}

export type UpdateOneUserParams = {
      pathId: string
bodyAuthLevel: number|undefined,
bodyEmail: string,
bodyPassword: string,
bodyPhone: string|null,
bodyUserStatus: number|undefined,
bodyUsername: string,
}

export const UpdateOneUserRequestConvert = (
    body: UpdateOneUserReqBody,
    query: UpdateOneUserReqQuery,
    path: UpdateOneUserReqParams,
): UpdateOneUserParams => {
  return {
    pathId: path.id,
    bodyAuthLevel: body.authLevel? parseInt(body.authLevel):undefined,
    bodyEmail: body.email,
    bodyPassword: body.password,
    bodyPhone: body.phone,
    bodyUserStatus: body.userStatus? parseInt(body.userStatus):undefined,
    bodyUsername: body.username,
  };
};
type ReadManyUserReqBody = {
  }

type ReadManyUserReqQuery = {
}

type ReadManyUserReqParams = {
}

export interface ReadManyUserRequest extends TypedRequest<
  ReadManyUserReqBody,
  ReadManyUserReqQuery,
  ReadManyUserReqParams
>{
}

export type ReadManyUserParams = {
}

export const ReadManyUserRequestConvert = (
    body: ReadManyUserReqBody,
    query: ReadManyUserReqQuery,
    path: ReadManyUserReqParams,
): ReadManyUserParams => {
  return {
  };
};


