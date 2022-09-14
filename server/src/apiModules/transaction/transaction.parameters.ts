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
bankId: string,
bos: string,
payMethod: string,
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
bodyBankId: number,
bodyBos: number,
bodyPayMethod: number,
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
    bodyBankId: parseInt(body.bankId),
    bodyBos: parseInt(body.bos),
    bodyPayMethod: parseInt(body.payMethod),
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
      bos: string
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
      queryBos: number
}


export const GetExchangeRateRequestConvert = (
    body: GetExchangeRateReqBody,
    query: GetExchangeRateReqQuery,
    path: GetExchangeRateReqParams,
    cookie: GetExchangeRateReqCookie,
): GetExchangeRateParams => {
  return {
          queryBos: parseInt(query.bos),
  };
};
type ReadMyTransactionReqBody = {
  }

type ReadMyTransactionReqQuery = {
      orderBy: string
      orderByField: string
      page: string
      take: string
      start_time: string
      end_time: string
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
      queryStartTime: string
      queryEndTime: string
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
            queryStartTime: query.start_time,
            queryEndTime: query.end_time,
  };
};
type GetPayPhotoReqBody = {
  }

type GetPayPhotoReqQuery = {
      type: string
      transactionId: string
}

type GetPayPhotoReqParams = {
}

type GetPayPhotoReqCookie = {
}

export interface GetPayPhotoRequest extends TypedRequest<
  GetPayPhotoReqBody,
  GetPayPhotoReqQuery,
  GetPayPhotoReqParams,
  GetPayPhotoReqCookie
>{
}

export type GetPayPhotoParams = {
      queryType: number
      queryTransactionId: string
}


export const GetPayPhotoRequestConvert = (
    body: GetPayPhotoReqBody,
    query: GetPayPhotoReqQuery,
    path: GetPayPhotoReqParams,
    cookie: GetPayPhotoReqCookie,
): GetPayPhotoParams => {
  return {
          queryType: parseInt(query.type),
            queryTransactionId: query.transactionId,
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
type UpdateTransactionReqBody = {
  state: string|undefined,
}

type UpdateTransactionReqQuery = {
}

type UpdateTransactionReqParams = {
      id: string
,
}

type UpdateTransactionReqCookie = {
}

export interface UpdateTransactionRequest extends TypedRequest<
  UpdateTransactionReqBody,
  UpdateTransactionReqQuery,
  UpdateTransactionReqParams,
  UpdateTransactionReqCookie
>{
}

export type UpdateTransactionParams = {
      pathId: string
bodyState: number|undefined,
}


export const UpdateTransactionRequestConvert = (
    body: UpdateTransactionReqBody,
    query: UpdateTransactionReqQuery,
    path: UpdateTransactionReqParams,
    cookie: UpdateTransactionReqCookie,
): UpdateTransactionParams => {
  return {
      pathId: path.id,
    bodyState: body.state? parseInt(body.state):undefined,
  };
};


