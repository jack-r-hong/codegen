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


type CreateOneAuthReqBody = {
  level: string|undefined,
role: string,
}

type CreateOneAuthReqQuery = {
}

type CreateOneAuthReqParams = {
}

type CreateOneAuthReqCookie = {
}

export interface CreateOneAuthRequest extends TypedRequest<
  CreateOneAuthReqBody,
  CreateOneAuthReqQuery,
  CreateOneAuthReqParams,
  CreateOneAuthReqCookie
>{
}

export type CreateOneAuthParams = {
bodyLevel: number|undefined,
bodyRole: number,
}

export const CreateOneAuthRequestConvert = (
    body: CreateOneAuthReqBody,
    query: CreateOneAuthReqQuery,
    path: CreateOneAuthReqParams,
    cookie: CreateOneAuthReqCookie,
): CreateOneAuthParams => {
  return {
    bodyLevel: body.level? parseInt(body.level):undefined,
    bodyRole: parseInt(body.role),
  };
};
type DeleteOneAuthReqBody = {
  }

type DeleteOneAuthReqQuery = {
}

type DeleteOneAuthReqParams = {
      id: string
,
}

type DeleteOneAuthReqCookie = {
}

export interface DeleteOneAuthRequest extends TypedRequest<
  DeleteOneAuthReqBody,
  DeleteOneAuthReqQuery,
  DeleteOneAuthReqParams,
  DeleteOneAuthReqCookie
>{
}

export type DeleteOneAuthParams = {
      pathId: number
}

export const DeleteOneAuthRequestConvert = (
    body: DeleteOneAuthReqBody,
    query: DeleteOneAuthReqQuery,
    path: DeleteOneAuthReqParams,
    cookie: DeleteOneAuthReqCookie,
): DeleteOneAuthParams => {
  return {
    pathId: parseInt(path.id),
  };
};
type UpdateOneAuthReqBody = {
  level: string|undefined,
role: string,
}

type UpdateOneAuthReqQuery = {
}

type UpdateOneAuthReqParams = {
      id: string
,
}

type UpdateOneAuthReqCookie = {
}

export interface UpdateOneAuthRequest extends TypedRequest<
  UpdateOneAuthReqBody,
  UpdateOneAuthReqQuery,
  UpdateOneAuthReqParams,
  UpdateOneAuthReqCookie
>{
}

export type UpdateOneAuthParams = {
      pathId: number
bodyLevel: number|undefined,
bodyRole: number,
}

export const UpdateOneAuthRequestConvert = (
    body: UpdateOneAuthReqBody,
    query: UpdateOneAuthReqQuery,
    path: UpdateOneAuthReqParams,
    cookie: UpdateOneAuthReqCookie,
): UpdateOneAuthParams => {
  return {
    pathId: parseInt(path.id),
    bodyLevel: body.level? parseInt(body.level):undefined,
    bodyRole: parseInt(body.role),
  };
};
type ReadManyAuthReqBody = {
  }

type ReadManyAuthReqQuery = {
}

type ReadManyAuthReqParams = {
}

type ReadManyAuthReqCookie = {
}

export interface ReadManyAuthRequest extends TypedRequest<
  ReadManyAuthReqBody,
  ReadManyAuthReqQuery,
  ReadManyAuthReqParams,
  ReadManyAuthReqCookie
>{
}

export type ReadManyAuthParams = {
}

export const ReadManyAuthRequestConvert = (
    body: ReadManyAuthReqBody,
    query: ReadManyAuthReqQuery,
    path: ReadManyAuthReqParams,
    cookie: ReadManyAuthReqCookie,
): ReadManyAuthParams => {
  return {
  };
};


