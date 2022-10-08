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


type ReadManyBackstageUserLevelReqBody = {
  }

type ReadManyBackstageUserLevelReqQuery = {
}

type ReadManyBackstageUserLevelReqParams = {
}

type ReadManyBackstageUserLevelReqCookie = {
}

export interface ReadManyBackstageUserLevelRequest extends TypedRequest<
  ReadManyBackstageUserLevelReqBody,
  ReadManyBackstageUserLevelReqQuery,
  ReadManyBackstageUserLevelReqParams,
  ReadManyBackstageUserLevelReqCookie
>{
}

export type ReadManyBackstageUserLevelParams = {
}


export const ReadManyBackstageUserLevelRequestConvert = (
    body: ReadManyBackstageUserLevelReqBody,
    query: ReadManyBackstageUserLevelReqQuery,
    path: ReadManyBackstageUserLevelReqParams,
    cookie: ReadManyBackstageUserLevelReqCookie,
): ReadManyBackstageUserLevelParams => {
  return {
  };
};
type CreateOneBackstageUserLevelReqBody = {
  des: string,
level: string,
}

type CreateOneBackstageUserLevelReqQuery = {
}

type CreateOneBackstageUserLevelReqParams = {
      id: string
,
}

type CreateOneBackstageUserLevelReqCookie = {
}

export interface CreateOneBackstageUserLevelRequest extends TypedRequest<
  CreateOneBackstageUserLevelReqBody,
  CreateOneBackstageUserLevelReqQuery,
  CreateOneBackstageUserLevelReqParams,
  CreateOneBackstageUserLevelReqCookie
>{
}

export type CreateOneBackstageUserLevelParams = {
      pathId: number
bodyDes: string,
bodyLevel: number,
}


export const CreateOneBackstageUserLevelRequestConvert = (
    body: CreateOneBackstageUserLevelReqBody,
    query: CreateOneBackstageUserLevelReqQuery,
    path: CreateOneBackstageUserLevelReqParams,
    cookie: CreateOneBackstageUserLevelReqCookie,
): CreateOneBackstageUserLevelParams => {
  return {
    pathId: parseInt(path.id),
    bodyDes: body.des,
    bodyLevel: parseInt(body.level),
  };
};
type DeleteOneBackstageUserLevelReqBody = {
  }

type DeleteOneBackstageUserLevelReqQuery = {
}

type DeleteOneBackstageUserLevelReqParams = {
      id: string
,
}

type DeleteOneBackstageUserLevelReqCookie = {
}

export interface DeleteOneBackstageUserLevelRequest extends TypedRequest<
  DeleteOneBackstageUserLevelReqBody,
  DeleteOneBackstageUserLevelReqQuery,
  DeleteOneBackstageUserLevelReqParams,
  DeleteOneBackstageUserLevelReqCookie
>{
}

export type DeleteOneBackstageUserLevelParams = {
      pathId: number
}


export const DeleteOneBackstageUserLevelRequestConvert = (
    body: DeleteOneBackstageUserLevelReqBody,
    query: DeleteOneBackstageUserLevelReqQuery,
    path: DeleteOneBackstageUserLevelReqParams,
    cookie: DeleteOneBackstageUserLevelReqCookie,
): DeleteOneBackstageUserLevelParams => {
  return {
          pathId: parseInt(path.id),
  };
};
type UpdateOneBackstageUserLevelReqBody = {
  des: string,
level: string,
}

type UpdateOneBackstageUserLevelReqQuery = {
}

type UpdateOneBackstageUserLevelReqParams = {
      id: string
,
}

type UpdateOneBackstageUserLevelReqCookie = {
}

export interface UpdateOneBackstageUserLevelRequest extends TypedRequest<
  UpdateOneBackstageUserLevelReqBody,
  UpdateOneBackstageUserLevelReqQuery,
  UpdateOneBackstageUserLevelReqParams,
  UpdateOneBackstageUserLevelReqCookie
>{
}

export type UpdateOneBackstageUserLevelParams = {
      pathId: number
bodyDes: string,
bodyLevel: number,
}


export const UpdateOneBackstageUserLevelRequestConvert = (
    body: UpdateOneBackstageUserLevelReqBody,
    query: UpdateOneBackstageUserLevelReqQuery,
    path: UpdateOneBackstageUserLevelReqParams,
    cookie: UpdateOneBackstageUserLevelReqCookie,
): UpdateOneBackstageUserLevelParams => {
  return {
    pathId: parseInt(path.id),
    bodyDes: body.des,
    bodyLevel: parseInt(body.level),
  };
};


