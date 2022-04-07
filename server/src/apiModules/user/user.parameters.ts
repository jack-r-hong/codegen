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
type CreateOneUserReqBody = {
  authLevel: string|null,
email: string,
password: string,
phone: string|null,
userStatus: string|null,
username: string,
}

type CreateOneUserReqQuery = {
}

type CreateOneUserReqParams = {
}

export interface CreateOneUserRequest extends TypedRequest<
  CreateOneUserReqBody,
  CreateOneUserReqQuery,
  CreateOneUserReqParams
>{
}

export type CreateOneUserParams = {
bodyAuthLevel: number|null,
bodyEmail: string,
bodyPassword: string,
bodyPhone: string|null,
bodyUserStatus: number|null,
bodyUsername: string,
}
export const CreateOneUserRequestConvert = (
    body: CreateOneUserReqBody,
    query: CreateOneUserReqQuery,
    path: CreateOneUserReqParams,
): CreateOneUserParams => {
  return {
    bodyAuthLevel: body.authLevel? parseInt(body.authLevel):null,
    bodyEmail: body.email,
    bodyPassword: body.password,
    bodyPhone: body.phone,
    bodyUserStatus: body.userStatus? parseInt(body.userStatus):null,
    bodyUsername: body.username,
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
  authLevel: string|null,
email: string,
password: string,
phone: string|null,
userStatus: string|null,
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
bodyAuthLevel: number|null,
bodyEmail: string,
bodyPassword: string,
bodyPhone: string|null,
bodyUserStatus: number|null,
bodyUsername: string,
}
export const UpdateOneUserRequestConvert = (
    body: UpdateOneUserReqBody,
    query: UpdateOneUserReqQuery,
    path: UpdateOneUserReqParams,
): UpdateOneUserParams => {
  return {
    pathId: path.id,
    bodyAuthLevel: body.authLevel? parseInt(body.authLevel):null,
    bodyEmail: body.email,
    bodyPassword: body.password,
    bodyPhone: body.phone,
    bodyUserStatus: body.userStatus? parseInt(body.userStatus):null,
    bodyUsername: body.username,
  };
};
type CreateManyUserReqBody = {
          dataList: {
                authLevel: string,
                email: string,
                password: string,
                phone: string,
                userStatus: string,
                username: string,
        }[],
}

type CreateManyUserReqQuery = {
}

type CreateManyUserReqParams = {
}

export interface CreateManyUserRequest extends TypedRequest<
  CreateManyUserReqBody,
  CreateManyUserReqQuery,
  CreateManyUserReqParams
>{
}

export type CreateManyUserParams = {
        bodyDataList: {
            bodyAuthLevel: number|null,
            bodyEmail: string,
            bodyPassword: string,
            bodyPhone: string|null,
            bodyUserStatus: number|null,
            bodyUsername: string,
        }[],
}
export const CreateManyUserRequestConvert = (
    body: CreateManyUserReqBody,
    query: CreateManyUserReqQuery,
    path: CreateManyUserReqParams,
): CreateManyUserParams => {
  return {
    bodyDataList: body.dataList.map((body :any) => {
      return {
        bodyAuthLevel: body.authLevel? parseInt(body.authLevel):null,
        bodyEmail: body.email,
        bodyPassword: body.password,
        bodyPhone: body.phone,
        bodyUserStatus: body.userStatus? parseInt(body.userStatus):null,
        bodyUsername: body.username,
      };
    }),
  };
};


