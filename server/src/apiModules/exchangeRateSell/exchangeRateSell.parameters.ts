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


type ReadManyBackstageExchangeRateSellReqBody = {
  }

type ReadManyBackstageExchangeRateSellReqQuery = {
      orderBy: string
      orderByField: string
      page: string
      take: string
}

type ReadManyBackstageExchangeRateSellReqParams = {
}

type ReadManyBackstageExchangeRateSellReqCookie = {
}

export interface ReadManyBackstageExchangeRateSellRequest extends TypedRequest<
  ReadManyBackstageExchangeRateSellReqBody,
  ReadManyBackstageExchangeRateSellReqQuery,
  ReadManyBackstageExchangeRateSellReqParams,
  ReadManyBackstageExchangeRateSellReqCookie
>{
}

export type ReadManyBackstageExchangeRateSellParams = {
      queryOrderBy: string
      queryOrderByField: string
      queryPage: number
      queryTake: number
}


export const ReadManyBackstageExchangeRateSellRequestConvert = (
    body: ReadManyBackstageExchangeRateSellReqBody,
    query: ReadManyBackstageExchangeRateSellReqQuery,
    path: ReadManyBackstageExchangeRateSellReqParams,
    cookie: ReadManyBackstageExchangeRateSellReqCookie,
): ReadManyBackstageExchangeRateSellParams => {
  return {
            queryOrderBy: query.orderBy,
            queryOrderByField: query.orderByField,
          queryPage: parseInt(query.page),
          queryTake: parseInt(query.take),
  };
};
type CreateOneBackstageExchangeRateSellReqBody = {
            des: string,
          rangeLower: number,
          rangeUpper: number,
          rate: number,
          type: number,
}

type CreateOneBackstageExchangeRateSellReqQuery = {
}

type CreateOneBackstageExchangeRateSellReqParams = {
}

type CreateOneBackstageExchangeRateSellReqCookie = {
}

export interface CreateOneBackstageExchangeRateSellRequest extends TypedRequest<
  CreateOneBackstageExchangeRateSellReqBody,
  CreateOneBackstageExchangeRateSellReqQuery,
  CreateOneBackstageExchangeRateSellReqParams,
  CreateOneBackstageExchangeRateSellReqCookie
>{
}

export type CreateOneBackstageExchangeRateSellParams = {
bodyDes: string,
bodyRangeLower: number,
bodyRangeUpper: number,
bodyRate: number,
bodyType: number,
}


export const CreateOneBackstageExchangeRateSellRequestConvert = (
    body: CreateOneBackstageExchangeRateSellReqBody,
    query: CreateOneBackstageExchangeRateSellReqQuery,
    path: CreateOneBackstageExchangeRateSellReqParams,
    cookie: CreateOneBackstageExchangeRateSellReqCookie,
): CreateOneBackstageExchangeRateSellParams => {
  return {
    bodyDes: body.des,
    bodyRangeLower: body.rangeLower,
    bodyRangeUpper: body.rangeUpper,
    bodyRate: body.rate,
    bodyType: body.type,
  };
};
type DeleteOneBackstageExchangeRateSellReqBody = {
  }

type DeleteOneBackstageExchangeRateSellReqQuery = {
}

type DeleteOneBackstageExchangeRateSellReqParams = {
      id: string
,
}

type DeleteOneBackstageExchangeRateSellReqCookie = {
}

export interface DeleteOneBackstageExchangeRateSellRequest extends TypedRequest<
  DeleteOneBackstageExchangeRateSellReqBody,
  DeleteOneBackstageExchangeRateSellReqQuery,
  DeleteOneBackstageExchangeRateSellReqParams,
  DeleteOneBackstageExchangeRateSellReqCookie
>{
}

export type DeleteOneBackstageExchangeRateSellParams = {
      pathId: number
}


export const DeleteOneBackstageExchangeRateSellRequestConvert = (
    body: DeleteOneBackstageExchangeRateSellReqBody,
    query: DeleteOneBackstageExchangeRateSellReqQuery,
    path: DeleteOneBackstageExchangeRateSellReqParams,
    cookie: DeleteOneBackstageExchangeRateSellReqCookie,
): DeleteOneBackstageExchangeRateSellParams => {
  return {
          pathId: parseInt(path.id),
  };
};
type UpdateOneBackstageExchangeRateSellReqBody = {
            des: string,
          rangeLower: number,
          rangeUpper: number,
          rate: number,
}

type UpdateOneBackstageExchangeRateSellReqQuery = {
}

type UpdateOneBackstageExchangeRateSellReqParams = {
      id: string
,
}

type UpdateOneBackstageExchangeRateSellReqCookie = {
}

export interface UpdateOneBackstageExchangeRateSellRequest extends TypedRequest<
  UpdateOneBackstageExchangeRateSellReqBody,
  UpdateOneBackstageExchangeRateSellReqQuery,
  UpdateOneBackstageExchangeRateSellReqParams,
  UpdateOneBackstageExchangeRateSellReqCookie
>{
}

export type UpdateOneBackstageExchangeRateSellParams = {
      pathId: number
bodyDes: string,
bodyRangeLower: number,
bodyRangeUpper: number,
bodyRate: number,
}


export const UpdateOneBackstageExchangeRateSellRequestConvert = (
    body: UpdateOneBackstageExchangeRateSellReqBody,
    query: UpdateOneBackstageExchangeRateSellReqQuery,
    path: UpdateOneBackstageExchangeRateSellReqParams,
    cookie: UpdateOneBackstageExchangeRateSellReqCookie,
): UpdateOneBackstageExchangeRateSellParams => {
  return {
    pathId: parseInt(path.id),
    bodyDes: body.des,
    bodyRangeLower: body.rangeLower,
    bodyRangeUpper: body.rangeUpper,
    bodyRate: body.rate,
  };
};


