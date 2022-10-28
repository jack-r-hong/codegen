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


type GetOneCustomServiceTransactionReqBody = {
  }

type GetOneCustomServiceTransactionReqQuery = {
}

type GetOneCustomServiceTransactionReqParams = {
      id: string
,
}

type GetOneCustomServiceTransactionReqCookie = {
}

export interface GetOneCustomServiceTransactionRequest extends TypedRequest<
  GetOneCustomServiceTransactionReqBody,
  GetOneCustomServiceTransactionReqQuery,
  GetOneCustomServiceTransactionReqParams,
  GetOneCustomServiceTransactionReqCookie
>{
}

export type GetOneCustomServiceTransactionParams = {
      pathId: string
}


export const GetOneCustomServiceTransactionRequestConvert = (
    body: GetOneCustomServiceTransactionReqBody,
    query: GetOneCustomServiceTransactionReqQuery,
    path: GetOneCustomServiceTransactionReqParams,
    cookie: GetOneCustomServiceTransactionReqCookie,
): GetOneCustomServiceTransactionParams => {
  return {
            pathId: path.id,
  };
};
type CreateTransactionReqBody = {
            bankId: number|undefined,
          bos: number,
          buyOptionId: number|undefined,
          code: string|undefined,
          image: string|undefined,
          payMethod: number,
          point: number|undefined,
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
bodyBankId: number|undefined,
bodyBos: number,
bodyBuyOptionId: number|undefined,
bodyCode: string|undefined,
bodyImage: string|undefined,
bodyPayMethod: number,
bodyPoint: number|undefined,
}


export const CreateTransactionRequestConvert = (
    body: CreateTransactionReqBody,
    query: CreateTransactionReqQuery,
    path: CreateTransactionReqParams,
    cookie: CreateTransactionReqCookie,
): CreateTransactionParams => {
  return {
    bodyBankId: typeof body.bankId === 'number' ? body.bankId : undefined,
    bodyBos: body.bos,
    bodyBuyOptionId: typeof body.buyOptionId === 'number' ? body.buyOptionId : undefined,
    bodyCode: body.code,
    bodyImage: body.image,
    bodyPayMethod: body.payMethod,
    bodyPoint: typeof body.point === 'number' ? body.point : undefined,
  };
};
type GetTransactionCalculationReqBody = {
            bos: number,
          buyOptionId: number|undefined,
          payMethod: number,
          point: number|undefined,
}

type GetTransactionCalculationReqQuery = {
}

type GetTransactionCalculationReqParams = {
}

type GetTransactionCalculationReqCookie = {
}

export interface GetTransactionCalculationRequest extends TypedRequest<
  GetTransactionCalculationReqBody,
  GetTransactionCalculationReqQuery,
  GetTransactionCalculationReqParams,
  GetTransactionCalculationReqCookie
>{
}

export type GetTransactionCalculationParams = {
bodyBos: number,
bodyBuyOptionId: number|undefined,
bodyPayMethod: number,
bodyPoint: number|undefined,
}


export const GetTransactionCalculationRequestConvert = (
    body: GetTransactionCalculationReqBody,
    query: GetTransactionCalculationReqQuery,
    path: GetTransactionCalculationReqParams,
    cookie: GetTransactionCalculationReqCookie,
): GetTransactionCalculationParams => {
  return {
    bodyBos: body.bos,
    bodyBuyOptionId: typeof body.buyOptionId === 'number' ? body.buyOptionId : undefined,
    bodyPayMethod: body.payMethod,
    bodyPoint: typeof body.point === 'number' ? body.point : undefined,
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
type PostGSPayDepositReqBody = {
            transactionId: string,
          type: number,
}

type PostGSPayDepositReqQuery = {
}

type PostGSPayDepositReqParams = {
}

type PostGSPayDepositReqCookie = {
}

export interface PostGSPayDepositRequest extends TypedRequest<
  PostGSPayDepositReqBody,
  PostGSPayDepositReqQuery,
  PostGSPayDepositReqParams,
  PostGSPayDepositReqCookie
>{
}

export type PostGSPayDepositParams = {
bodyTransactionId: string,
bodyType: number,
}


export const PostGSPayDepositRequestConvert = (
    body: PostGSPayDepositReqBody,
    query: PostGSPayDepositReqQuery,
    path: PostGSPayDepositReqParams,
    cookie: PostGSPayDepositReqCookie,
): PostGSPayDepositParams => {
  return {
    bodyTransactionId: body.transactionId,
    bodyType: body.type,
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
            state: number|undefined,
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


