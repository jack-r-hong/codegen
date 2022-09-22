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


type ServiceTokenReqBody = {
  userId: string,
}

type ServiceTokenReqQuery = {
}

type ServiceTokenReqParams = {
}

type ServiceTokenReqCookie = {
}

export interface ServiceTokenRequest extends TypedRequest<
  ServiceTokenReqBody,
  ServiceTokenReqQuery,
  ServiceTokenReqParams,
  ServiceTokenReqCookie
>{
}

export type ServiceTokenParams = {
bodyUserId: string,
}


export const ServiceTokenRequestConvert = (
    body: ServiceTokenReqBody,
    query: ServiceTokenReqQuery,
    path: ServiceTokenReqParams,
    cookie: ServiceTokenReqCookie,
): ServiceTokenParams => {
  return {
    bodyUserId: body.userId,
  };
};
type TransactionTokenReqBody = {
  transactionId: string,
}

type TransactionTokenReqQuery = {
}

type TransactionTokenReqParams = {
}

type TransactionTokenReqCookie = {
}

export interface TransactionTokenRequest extends TypedRequest<
  TransactionTokenReqBody,
  TransactionTokenReqQuery,
  TransactionTokenReqParams,
  TransactionTokenReqCookie
>{
}

export type TransactionTokenParams = {
bodyTransactionId: string,
}


export const TransactionTokenRequestConvert = (
    body: TransactionTokenReqBody,
    query: TransactionTokenReqQuery,
    path: TransactionTokenReqParams,
    cookie: TransactionTokenReqCookie,
): TransactionTokenParams => {
  return {
    bodyTransactionId: body.transactionId,
  };
};


