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
}    type CreateOneUserReqBody = {
          authLevel: string,
          email: string,
          password: string,
          phone: string,
          userStatus: string,
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
          bodyAuthLevel: number,
          bodyEmail: string,
          bodyPassword: string,
          bodyPhone: string,
          bodyUserStatus: number,
          bodyUsername: string,
    }

    export const CreateOneUserRequestConvert = (
    body: CreateOneUserReqBody,
    query: CreateOneUserReqQuery,
    path: CreateOneUserReqParams,
    ): CreateOneUserParams => {
        return {
                bodyAuthLevel: parseInt(body.authLevel),
                bodyEmail: body.email,
                bodyPassword: body.password,
                bodyPhone: body.phone,
                bodyUserStatus: parseInt(body.userStatus),
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
    }

    export interface DeleteOneUserRequest extends TypedRequest<
      DeleteOneUserReqBody,
      DeleteOneUserReqQuery,
      DeleteOneUserReqParams
    >{
    }

    export type DeleteOneUserParams = {
        pathId: number
    }

    export const DeleteOneUserRequestConvert = (
    body: DeleteOneUserReqBody,
    query: DeleteOneUserReqQuery,
    path: DeleteOneUserReqParams,
    ): DeleteOneUserParams => {
      return {
            pathId: parseInt(path.id),
      };
    };
    type ReadOneUserReqBody = {
    }

    type ReadOneUserReqQuery = {
    }

    type ReadOneUserReqParams = {
          id: string
    }

    export interface ReadOneUserRequest extends TypedRequest<
      ReadOneUserReqBody,
      ReadOneUserReqQuery,
      ReadOneUserReqParams
    >{
    }

    export type ReadOneUserParams = {
        pathId: number
    }

    export const ReadOneUserRequestConvert = (
    body: ReadOneUserReqBody,
    query: ReadOneUserReqQuery,
    path: ReadOneUserReqParams,
    ): ReadOneUserParams => {
      return {
            pathId: parseInt(path.id),
      };
    };
    type UpdateOneUserReqBody = {
          authLevel: string,
          email: string,
          password: string,
          phone: string,
          userStatus: string,
          username: string,
    }

    type UpdateOneUserReqQuery = {
    }

    type UpdateOneUserReqParams = {
          id: string
    }

    export interface UpdateOneUserRequest extends TypedRequest<
      UpdateOneUserReqBody,
      UpdateOneUserReqQuery,
      UpdateOneUserReqParams
    >{
    }

    export type UpdateOneUserParams = {
        pathId: number
          bodyAuthLevel: number,
          bodyEmail: string,
          bodyPassword: string,
          bodyPhone: string,
          bodyUserStatus: number,
          bodyUsername: string,
    }

    export const UpdateOneUserRequestConvert = (
    body: UpdateOneUserReqBody,
    query: UpdateOneUserReqQuery,
    path: UpdateOneUserReqParams,
    ): UpdateOneUserParams => {
        return {
            pathId: parseInt(path.id),
                bodyAuthLevel: parseInt(body.authLevel),
                bodyEmail: body.email,
                bodyPassword: body.password,
                bodyPhone: body.phone,
                bodyUserStatus: parseInt(body.userStatus),
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
              bodyAuthLevel: number,
              bodyEmail: string,
              bodyPassword: string,
              bodyPhone: string,
              bodyUserStatus: number,
              bodyUsername: string,
          }[],
    }

    export const CreateManyUserRequestConvert = (
    body: CreateManyUserReqBody,
    query: CreateManyUserReqQuery,
    path: CreateManyUserReqParams,
    ): CreateManyUserParams => {
        return {
              bodyDataList: body.dataList.map((e :any) => {
                return {
                      bodyAuthLevel: parseInt(e.authLevel),
                      bodyEmail: e.email,
                      bodyPassword: e.password,
                      bodyPhone: e.phone,
                      bodyUserStatus: parseInt(e.userStatus),
                      bodyUsername: e.username,
                };
              }),
        };
    };


