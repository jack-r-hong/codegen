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
bonusPoint: string,
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
bodyBonusPoint: number,
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
    bodyBonusPoint: parseInt(body.bonusPoint),
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
    bodyState: typeof body.state === 'number' ? body.state : undefined,
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
      agentShow: string
,
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
      pathAgentShow: string
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
            pathAgentShow: path.agentShow,
  };
};
type GetExchangeRateBuyReqBody = {
  }

type GetExchangeRateBuyReqQuery = {
}

type GetExchangeRateBuyReqParams = {
}

type GetExchangeRateBuyReqCookie = {
}

export interface GetExchangeRateBuyRequest extends TypedRequest<
  GetExchangeRateBuyReqBody,
  GetExchangeRateBuyReqQuery,
  GetExchangeRateBuyReqParams,
  GetExchangeRateBuyReqCookie
>{
}

export type GetExchangeRateBuyParams = {
}


export const GetExchangeRateBuyRequestConvert = (
    body: GetExchangeRateBuyReqBody,
    query: GetExchangeRateBuyReqQuery,
    path: GetExchangeRateBuyReqParams,
    cookie: GetExchangeRateBuyReqCookie,
): GetExchangeRateBuyParams => {
  return {
  };
};
type GetExchangeRateSellReqBody = {
  }

type GetExchangeRateSellReqQuery = {
}

type GetExchangeRateSellReqParams = {
}

type GetExchangeRateSellReqCookie = {
}

export interface GetExchangeRateSellRequest extends TypedRequest<
  GetExchangeRateSellReqBody,
  GetExchangeRateSellReqQuery,
  GetExchangeRateSellReqParams,
  GetExchangeRateSellReqCookie
>{
}

export type GetExchangeRateSellParams = {
}


export const GetExchangeRateSellRequestConvert = (
    body: GetExchangeRateSellReqBody,
    query: GetExchangeRateSellReqQuery,
    path: GetExchangeRateSellReqParams,
    cookie: GetExchangeRateSellReqCookie,
): GetExchangeRateSellParams => {
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
      start_time: string
      end_time: string
      state: string
      bos: string
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
      queryState: string
      queryBos: number
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
            queryState: query.state,
          queryBos: parseInt(query.bos),
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
    bodyState: typeof body.state === 'number' ? body.state : undefined,
  };
};


