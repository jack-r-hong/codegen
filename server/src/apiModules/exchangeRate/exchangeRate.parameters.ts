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


type ReadManyBackstageExchangeRateReqBody = {
  }

type ReadManyBackstageExchangeRateReqQuery = {
}

type ReadManyBackstageExchangeRateReqParams = {
}

type ReadManyBackstageExchangeRateReqCookie = {
}

export interface ReadManyBackstageExchangeRateRequest extends TypedRequest<
  ReadManyBackstageExchangeRateReqBody,
  ReadManyBackstageExchangeRateReqQuery,
  ReadManyBackstageExchangeRateReqParams,
  ReadManyBackstageExchangeRateReqCookie
>{
}

export type ReadManyBackstageExchangeRateParams = {
}


export const ReadManyBackstageExchangeRateRequestConvert = (
    body: ReadManyBackstageExchangeRateReqBody,
    query: ReadManyBackstageExchangeRateReqQuery,
    path: ReadManyBackstageExchangeRateReqParams,
    cookie: ReadManyBackstageExchangeRateReqCookie,
): ReadManyBackstageExchangeRateParams => {
  return {
  };
};
type CreateOneBackstageExchangeRateReqBody = {
  bos: string,
bouns: string,
des: string,
rangeLower: string,
rangeUpper: string,
rate: string,
type: string,
}

type CreateOneBackstageExchangeRateReqQuery = {
}

type CreateOneBackstageExchangeRateReqParams = {
}

type CreateOneBackstageExchangeRateReqCookie = {
}

export interface CreateOneBackstageExchangeRateRequest extends TypedRequest<
  CreateOneBackstageExchangeRateReqBody,
  CreateOneBackstageExchangeRateReqQuery,
  CreateOneBackstageExchangeRateReqParams,
  CreateOneBackstageExchangeRateReqCookie
>{
}

export type CreateOneBackstageExchangeRateParams = {
bodyBos: number,
bodyBouns: number,
bodyDes: string,
bodyRangeLower: number,
bodyRangeUpper: number,
bodyRate: number,
bodyType: number,
}


export const CreateOneBackstageExchangeRateRequestConvert = (
    body: CreateOneBackstageExchangeRateReqBody,
    query: CreateOneBackstageExchangeRateReqQuery,
    path: CreateOneBackstageExchangeRateReqParams,
    cookie: CreateOneBackstageExchangeRateReqCookie,
): CreateOneBackstageExchangeRateParams => {
  return {
    bodyBos: parseInt(body.bos),
    bodyBouns: parseInt(body.bouns),
    bodyDes: body.des,
    bodyRangeLower: parseInt(body.rangeLower),
    bodyRangeUpper: parseInt(body.rangeUpper),
    bodyRate: parseInt(body.rate),
    bodyType: parseInt(body.type),
  };
};
type DeleteOneBackstageExchangeRateReqBody = {
  }

type DeleteOneBackstageExchangeRateReqQuery = {
}

type DeleteOneBackstageExchangeRateReqParams = {
      id: string
,
}

type DeleteOneBackstageExchangeRateReqCookie = {
}

export interface DeleteOneBackstageExchangeRateRequest extends TypedRequest<
  DeleteOneBackstageExchangeRateReqBody,
  DeleteOneBackstageExchangeRateReqQuery,
  DeleteOneBackstageExchangeRateReqParams,
  DeleteOneBackstageExchangeRateReqCookie
>{
}

export type DeleteOneBackstageExchangeRateParams = {
      pathId: number
}


export const DeleteOneBackstageExchangeRateRequestConvert = (
    body: DeleteOneBackstageExchangeRateReqBody,
    query: DeleteOneBackstageExchangeRateReqQuery,
    path: DeleteOneBackstageExchangeRateReqParams,
    cookie: DeleteOneBackstageExchangeRateReqCookie,
): DeleteOneBackstageExchangeRateParams => {
  return {
          pathId: parseInt(path.id),
  };
};
type UpdateOneBackstageExchangeRateReqBody = {
  bouns: string,
des: string,
rangeLower: string,
rangeUpper: string,
rate: string,
}

type UpdateOneBackstageExchangeRateReqQuery = {
}

type UpdateOneBackstageExchangeRateReqParams = {
      id: string
,
}

type UpdateOneBackstageExchangeRateReqCookie = {
}

export interface UpdateOneBackstageExchangeRateRequest extends TypedRequest<
  UpdateOneBackstageExchangeRateReqBody,
  UpdateOneBackstageExchangeRateReqQuery,
  UpdateOneBackstageExchangeRateReqParams,
  UpdateOneBackstageExchangeRateReqCookie
>{
}

export type UpdateOneBackstageExchangeRateParams = {
      pathId: number
bodyBouns: number,
bodyDes: string,
bodyRangeLower: number,
bodyRangeUpper: number,
bodyRate: number,
}


export const UpdateOneBackstageExchangeRateRequestConvert = (
    body: UpdateOneBackstageExchangeRateReqBody,
    query: UpdateOneBackstageExchangeRateReqQuery,
    path: UpdateOneBackstageExchangeRateReqParams,
    cookie: UpdateOneBackstageExchangeRateReqCookie,
): UpdateOneBackstageExchangeRateParams => {
  return {
    pathId: parseInt(path.id),
    bodyBouns: parseInt(body.bouns),
    bodyDes: body.des,
    bodyRangeLower: parseInt(body.rangeLower),
    bodyRangeUpper: parseInt(body.rangeUpper),
    bodyRate: parseInt(body.rate),
  };
};


