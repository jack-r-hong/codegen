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


type GetMyBankAccountsReqBody = {
  }

type GetMyBankAccountsReqQuery = {
      status: string
}

type GetMyBankAccountsReqParams = {
}

type GetMyBankAccountsReqCookie = {
}

export interface GetMyBankAccountsRequest extends TypedRequest<
  GetMyBankAccountsReqBody,
  GetMyBankAccountsReqQuery,
  GetMyBankAccountsReqParams,
  GetMyBankAccountsReqCookie
>{
}

export type GetMyBankAccountsParams = {
      queryStatus: number
}


export const GetMyBankAccountsRequestConvert = (
    body: GetMyBankAccountsReqBody,
    query: GetMyBankAccountsReqQuery,
    path: GetMyBankAccountsReqParams,
    cookie: GetMyBankAccountsReqCookie,
): GetMyBankAccountsParams => {
  return {
          queryStatus: parseInt(query.status),
  };
};
type ReadOneBankAccountReqBody = {
  }

type ReadOneBankAccountReqQuery = {
}

type ReadOneBankAccountReqParams = {
      id: string
,
}

type ReadOneBankAccountReqCookie = {
}

export interface ReadOneBankAccountRequest extends TypedRequest<
  ReadOneBankAccountReqBody,
  ReadOneBankAccountReqQuery,
  ReadOneBankAccountReqParams,
  ReadOneBankAccountReqCookie
>{
}

export type ReadOneBankAccountParams = {
      pathId: number
}


export const ReadOneBankAccountRequestConvert = (
    body: ReadOneBankAccountReqBody,
    query: ReadOneBankAccountReqQuery,
    path: ReadOneBankAccountReqParams,
    cookie: ReadOneBankAccountReqCookie,
): ReadOneBankAccountParams => {
  return {
          pathId: parseInt(path.id),
  };
};


