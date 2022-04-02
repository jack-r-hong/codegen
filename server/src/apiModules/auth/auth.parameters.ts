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
}    type CreateOneAuthReqBody = {
          level: string,
          role: string,
    }

    type CreateOneAuthReqQuery = {
    }

    type CreateOneAuthReqParams = {
    }

    export interface CreateOneAuthRequest extends TypedRequest<
      CreateOneAuthReqBody,
      CreateOneAuthReqQuery,
      CreateOneAuthReqParams
    >{
    }

    export type CreateOneAuthParams = {
          bodyLevel: number,
          bodyRole: number,
    }

    export const CreateOneAuthRequestConvert = (
    body: CreateOneAuthReqBody,
    query: CreateOneAuthReqQuery,
    path: CreateOneAuthReqParams,
    ): CreateOneAuthParams => {
        return {
                bodyLevel: parseInt(body.level),
                bodyRole: parseInt(body.role),
        };
    };
    type DeleteOneAuthReqBody = {
    }

    type DeleteOneAuthReqQuery = {
    }

    type DeleteOneAuthReqParams = {
          id: string
    }

    export interface DeleteOneAuthRequest extends TypedRequest<
      DeleteOneAuthReqBody,
      DeleteOneAuthReqQuery,
      DeleteOneAuthReqParams
    >{
    }

    export type DeleteOneAuthParams = {
        pathId: number
    }

    export const DeleteOneAuthRequestConvert = (
    body: DeleteOneAuthReqBody,
    query: DeleteOneAuthReqQuery,
    path: DeleteOneAuthReqParams,
    ): DeleteOneAuthParams => {
      return {
            pathId: parseInt(path.id),
      };
    };
    type UpdateOneAuthReqBody = {
          level: string,
          role: string,
    }

    type UpdateOneAuthReqQuery = {
    }

    type UpdateOneAuthReqParams = {
          id: string
    }

    export interface UpdateOneAuthRequest extends TypedRequest<
      UpdateOneAuthReqBody,
      UpdateOneAuthReqQuery,
      UpdateOneAuthReqParams
    >{
    }

    export type UpdateOneAuthParams = {
        pathId: number
          bodyLevel: number,
          bodyRole: number,
    }

    export const UpdateOneAuthRequestConvert = (
    body: UpdateOneAuthReqBody,
    query: UpdateOneAuthReqQuery,
    path: UpdateOneAuthReqParams,
    ): UpdateOneAuthParams => {
        return {
            pathId: parseInt(path.id),
                bodyLevel: parseInt(body.level),
                bodyRole: parseInt(body.role),
        };
    };
    type ReadManyAuthReqBody = {
    }

    type ReadManyAuthReqQuery = {
    }

    type ReadManyAuthReqParams = {
    }

    export interface ReadManyAuthRequest extends TypedRequest<
      ReadManyAuthReqBody,
      ReadManyAuthReqQuery,
      ReadManyAuthReqParams
    >{
    }

    export type ReadManyAuthParams = {
    }

    export const ReadManyAuthRequestConvert = (
    body: ReadManyAuthReqBody,
    query: ReadManyAuthReqQuery,
    path: ReadManyAuthReqParams,
    ): ReadManyAuthParams => {
      return {
      };
    };


