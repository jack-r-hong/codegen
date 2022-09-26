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


type ReadManyBackstageExchangeRateBuyReqBody = {
  }

type ReadManyBackstageExchangeRateBuyReqQuery = {
      orderBy: string
      orderByField: string
      page: string
      take: string
}

type ReadManyBackstageExchangeRateBuyReqParams = {
}

type ReadManyBackstageExchangeRateBuyReqCookie = {
}

export interface ReadManyBackstageExchangeRateBuyRequest extends TypedRequest<
  ReadManyBackstageExchangeRateBuyReqBody,
  ReadManyBackstageExchangeRateBuyReqQuery,
  ReadManyBackstageExchangeRateBuyReqParams,
  ReadManyBackstageExchangeRateBuyReqCookie
>{
}

export type ReadManyBackstageExchangeRateBuyParams = {
      queryOrderBy: string
      queryOrderByField: string
      queryPage: number
      queryTake: number
}


export const ReadManyBackstageExchangeRateBuyRequestConvert = (
    body: ReadManyBackstageExchangeRateBuyReqBody,
    query: ReadManyBackstageExchangeRateBuyReqQuery,
    path: ReadManyBackstageExchangeRateBuyReqParams,
    cookie: ReadManyBackstageExchangeRateBuyReqCookie,
): ReadManyBackstageExchangeRateBuyParams => {
  return {
            queryOrderBy: query.orderBy,
            queryOrderByField: query.orderByField,
          queryPage: parseInt(query.page),
          queryTake: parseInt(query.take),
  };
};
type CreateOneBackstageExchangeRateBuyReqBody = {
  bouns: string,
des: string,
dollars: string,
point: string,
type: string,
}

type CreateOneBackstageExchangeRateBuyReqQuery = {
}

type CreateOneBackstageExchangeRateBuyReqParams = {
}

type CreateOneBackstageExchangeRateBuyReqCookie = {
}

export interface CreateOneBackstageExchangeRateBuyRequest extends TypedRequest<
  CreateOneBackstageExchangeRateBuyReqBody,
  CreateOneBackstageExchangeRateBuyReqQuery,
  CreateOneBackstageExchangeRateBuyReqParams,
  CreateOneBackstageExchangeRateBuyReqCookie
>{
}

export type CreateOneBackstageExchangeRateBuyParams = {
bodyBouns: number,
bodyDes: string,
bodyDollars: number,
bodyPoint: number,
bodyType: number,
}


export const CreateOneBackstageExchangeRateBuyRequestConvert = (
    body: CreateOneBackstageExchangeRateBuyReqBody,
    query: CreateOneBackstageExchangeRateBuyReqQuery,
    path: CreateOneBackstageExchangeRateBuyReqParams,
    cookie: CreateOneBackstageExchangeRateBuyReqCookie,
): CreateOneBackstageExchangeRateBuyParams => {
  return {
    bodyBouns: parseInt(body.bouns),
    bodyDes: body.des,
    bodyDollars: parseInt(body.dollars),
    bodyPoint: parseInt(body.point),
    bodyType: parseInt(body.type),
  };
};
type DeleteOneBackstageExchangeRateBuyReqBody = {
  }

type DeleteOneBackstageExchangeRateBuyReqQuery = {
}

type DeleteOneBackstageExchangeRateBuyReqParams = {
      id: string
,
}

type DeleteOneBackstageExchangeRateBuyReqCookie = {
}

export interface DeleteOneBackstageExchangeRateBuyRequest extends TypedRequest<
  DeleteOneBackstageExchangeRateBuyReqBody,
  DeleteOneBackstageExchangeRateBuyReqQuery,
  DeleteOneBackstageExchangeRateBuyReqParams,
  DeleteOneBackstageExchangeRateBuyReqCookie
>{
}

export type DeleteOneBackstageExchangeRateBuyParams = {
      pathId: number
}


export const DeleteOneBackstageExchangeRateBuyRequestConvert = (
    body: DeleteOneBackstageExchangeRateBuyReqBody,
    query: DeleteOneBackstageExchangeRateBuyReqQuery,
    path: DeleteOneBackstageExchangeRateBuyReqParams,
    cookie: DeleteOneBackstageExchangeRateBuyReqCookie,
): DeleteOneBackstageExchangeRateBuyParams => {
  return {
          pathId: parseInt(path.id),
  };
};
type UpdateOneBackstageExchangeRateBuyReqBody = {
  bouns: string,
des: string,
dollars: string,
point: string,
}

type UpdateOneBackstageExchangeRateBuyReqQuery = {
}

type UpdateOneBackstageExchangeRateBuyReqParams = {
      id: string
,
}

type UpdateOneBackstageExchangeRateBuyReqCookie = {
}

export interface UpdateOneBackstageExchangeRateBuyRequest extends TypedRequest<
  UpdateOneBackstageExchangeRateBuyReqBody,
  UpdateOneBackstageExchangeRateBuyReqQuery,
  UpdateOneBackstageExchangeRateBuyReqParams,
  UpdateOneBackstageExchangeRateBuyReqCookie
>{
}

export type UpdateOneBackstageExchangeRateBuyParams = {
      pathId: number
bodyBouns: number,
bodyDes: string,
bodyDollars: number,
bodyPoint: number,
}


export const UpdateOneBackstageExchangeRateBuyRequestConvert = (
    body: UpdateOneBackstageExchangeRateBuyReqBody,
    query: UpdateOneBackstageExchangeRateBuyReqQuery,
    path: UpdateOneBackstageExchangeRateBuyReqParams,
    cookie: UpdateOneBackstageExchangeRateBuyReqCookie,
): UpdateOneBackstageExchangeRateBuyParams => {
  return {
    pathId: parseInt(path.id),
    bodyBouns: parseInt(body.bouns),
    bodyDes: body.des,
    bodyDollars: parseInt(body.dollars),
    bodyPoint: parseInt(body.point),
  };
};


