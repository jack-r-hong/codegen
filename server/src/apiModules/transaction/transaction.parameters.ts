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


type CreateTransactionReqBody = {
  account: string,
bos: string,
point: string,
twd: string,
}

type CreateTransactionReqQuery = {
}

type CreateTransactionReqParams = {
}

type CreateTransactionReqCookie = {
}

export interface CreateTransactionRequest extends TypedRequest<
  CreateTransactionReqBody,
  CreateTransactionReqQuery,
  CreateTransactionReqParams,
  CreateTransactionReqCookie
>{
}

export type CreateTransactionParams = {
bodyAccount: string,
bodyBos: number,
bodyPoint: number,
bodyTwd: number,
}


export const CreateTransactionRequestConvert = (
    body: CreateTransactionReqBody,
    query: CreateTransactionReqQuery,
    path: CreateTransactionReqParams,
    cookie: CreateTransactionReqCookie,
): CreateTransactionParams => {
  return {
    bodyAccount: body.account,
    bodyBos: parseInt(body.bos),
    bodyPoint: parseInt(body.point),
    bodyTwd: parseInt(body.twd),
  };
};
type UpdateTransactionStateReqBody = {
  state: string|undefined,
}

type UpdateTransactionStateReqQuery = {
}

type UpdateTransactionStateReqParams = {
}

type UpdateTransactionStateReqCookie = {
}

export interface UpdateTransactionStateRequest extends TypedRequest<
  UpdateTransactionStateReqBody,
  UpdateTransactionStateReqQuery,
  UpdateTransactionStateReqParams,
  UpdateTransactionStateReqCookie
>{
}

export type UpdateTransactionStateParams = {
bodyState: number|undefined,
}


export const UpdateTransactionStateRequestConvert = (
    body: UpdateTransactionStateReqBody,
    query: UpdateTransactionStateReqQuery,
    path: UpdateTransactionStateReqParams,
    cookie: UpdateTransactionStateReqCookie,
): UpdateTransactionStateParams => {
  return {
    bodyState: body.state? parseInt(body.state):undefined,
  };
};
type GetExchangeRateReqBody = {
  }

type GetExchangeRateReqQuery = {
}

type GetExchangeRateReqParams = {
}

type GetExchangeRateReqCookie = {
}

export interface GetExchangeRateRequest extends TypedRequest<
  GetExchangeRateReqBody,
  GetExchangeRateReqQuery,
  GetExchangeRateReqParams,
  GetExchangeRateReqCookie
>{
}

export type GetExchangeRateParams = {
}


export const GetExchangeRateRequestConvert = (
    body: GetExchangeRateReqBody,
    query: GetExchangeRateReqQuery,
    path: GetExchangeRateReqParams,
    cookie: GetExchangeRateReqCookie,
): GetExchangeRateParams => {
  return {
  };
};
type ReadMyTransactionReqBody = {
  }

type ReadMyTransactionReqQuery = {
      orderBy: string
      orderByField: string
      page: string
      take: string
}

type ReadMyTransactionReqParams = {
}

type ReadMyTransactionReqCookie = {
}

export interface ReadMyTransactionRequest extends TypedRequest<
  ReadMyTransactionReqBody,
  ReadMyTransactionReqQuery,
  ReadMyTransactionReqParams,
  ReadMyTransactionReqCookie
>{
}

export type ReadMyTransactionParams = {
      queryOrderBy: string
      queryOrderByField: string
      queryPage: number
      queryTake: number
}


export const ReadMyTransactionRequestConvert = (
    body: ReadMyTransactionReqBody,
    query: ReadMyTransactionReqQuery,
    path: ReadMyTransactionReqParams,
    cookie: ReadMyTransactionReqCookie,
): ReadMyTransactionParams => {
  return {
            queryOrderBy: query.orderBy,
            queryOrderByField: query.orderByField,
          queryPage: parseInt(query.page),
          queryTake: parseInt(query.take),
  };
};
type ReadPendingTransactionReqBody = {
  }

type ReadPendingTransactionReqQuery = {
      orderBy: string
      orderByField: string
      page: string
      take: string
}

type ReadPendingTransactionReqParams = {
}

type ReadPendingTransactionReqCookie = {
}

export interface ReadPendingTransactionRequest extends TypedRequest<
  ReadPendingTransactionReqBody,
  ReadPendingTransactionReqQuery,
  ReadPendingTransactionReqParams,
  ReadPendingTransactionReqCookie
>{
}

export type ReadPendingTransactionParams = {
      queryOrderBy: string
      queryOrderByField: string
      queryPage: number
      queryTake: number
}


export const ReadPendingTransactionRequestConvert = (
    body: ReadPendingTransactionReqBody,
    query: ReadPendingTransactionReqQuery,
    path: ReadPendingTransactionReqParams,
    cookie: ReadPendingTransactionReqCookie,
): ReadPendingTransactionParams => {
  return {
            queryOrderBy: query.orderBy,
            queryOrderByField: query.orderByField,
          queryPage: parseInt(query.page),
          queryTake: parseInt(query.take),
  };
};
type ReadOneTransactionReqBody = {
  }

type ReadOneTransactionReqQuery = {
}

type ReadOneTransactionReqParams = {
      id: string
,
}

type ReadOneTransactionReqCookie = {
}

export interface ReadOneTransactionRequest extends TypedRequest<
  ReadOneTransactionReqBody,
  ReadOneTransactionReqQuery,
  ReadOneTransactionReqParams,
  ReadOneTransactionReqCookie
>{
}

export type ReadOneTransactionParams = {
      pathId: string
}


export const ReadOneTransactionRequestConvert = (
    body: ReadOneTransactionReqBody,
    query: ReadOneTransactionReqQuery,
    path: ReadOneTransactionReqParams,
    cookie: ReadOneTransactionReqCookie,
): ReadOneTransactionParams => {
  return {
            pathId: path.id,
  };
};


