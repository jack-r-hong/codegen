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


type ReadManyUserReqBody = {
  }

type ReadManyUserReqQuery = {
}

type ReadManyUserReqParams = {
}

type ReadManyUserReqCookie = {
}

export interface ReadManyUserRequest extends TypedRequest<
  ReadManyUserReqBody,
  ReadManyUserReqQuery,
  ReadManyUserReqParams,
  ReadManyUserReqCookie
>{
}

export type ReadManyUserParams = {
}


export const ReadManyUserRequestConvert = (
    body: ReadManyUserReqBody,
    query: ReadManyUserReqQuery,
    path: ReadManyUserReqParams,
    cookie: ReadManyUserReqCookie,
): ReadManyUserParams => {
  return {
  };
};


