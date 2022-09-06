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


type GetBankAccountReqBody = {
  }

type GetBankAccountReqQuery = {
      status: string
}

type GetBankAccountReqParams = {
}

type GetBankAccountReqCookie = {
}

export interface GetBankAccountRequest extends TypedRequest<
  GetBankAccountReqBody,
  GetBankAccountReqQuery,
  GetBankAccountReqParams,
  GetBankAccountReqCookie
>{
}

export type GetBankAccountParams = {
      queryStatus: number
}


export const GetBankAccountRequestConvert = (
    body: GetBankAccountReqBody,
    query: GetBankAccountReqQuery,
    path: GetBankAccountReqParams,
    cookie: GetBankAccountReqCookie,
): GetBankAccountParams => {
  return {
          queryStatus: parseInt(query.status),
  };
};


