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


type TransactionServiceTokenReqBody = {
            transactionId: string,
}

type TransactionServiceTokenReqQuery = {
}

type TransactionServiceTokenReqParams = {
}

type TransactionServiceTokenReqCookie = {
}

export interface TransactionServiceTokenRequest extends TypedRequest<
  TransactionServiceTokenReqBody,
  TransactionServiceTokenReqQuery,
  TransactionServiceTokenReqParams,
  TransactionServiceTokenReqCookie
>{
}

export type TransactionServiceTokenParams = {
bodyTransactionId: string,
}


export const TransactionServiceTokenRequestConvert = (
    body: TransactionServiceTokenReqBody,
    query: TransactionServiceTokenReqQuery,
    path: TransactionServiceTokenReqParams,
    cookie: TransactionServiceTokenReqCookie,
): TransactionServiceTokenParams => {
  return {
    bodyTransactionId: body.transactionId,
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
type UserTokenReqBody = {
            userId: string,
}

type UserTokenReqQuery = {
}

type UserTokenReqParams = {
}

type UserTokenReqCookie = {
}

export interface UserTokenRequest extends TypedRequest<
  UserTokenReqBody,
  UserTokenReqQuery,
  UserTokenReqParams,
  UserTokenReqCookie
>{
}

export type UserTokenParams = {
bodyUserId: string,
}


export const UserTokenRequestConvert = (
    body: UserTokenReqBody,
    query: UserTokenReqQuery,
    path: UserTokenReqParams,
    cookie: UserTokenReqCookie,
): UserTokenParams => {
  return {
    bodyUserId: body.userId,
  };
};


