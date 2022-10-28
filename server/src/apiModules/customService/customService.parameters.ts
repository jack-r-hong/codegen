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


type GetOneBackstageUserReqBody = {
  }

type GetOneBackstageUserReqQuery = {
}

type GetOneBackstageUserReqParams = {
      id: string
,
}

type GetOneBackstageUserReqCookie = {
}

export interface GetOneBackstageUserRequest extends TypedRequest<
  GetOneBackstageUserReqBody,
  GetOneBackstageUserReqQuery,
  GetOneBackstageUserReqParams,
  GetOneBackstageUserReqCookie
>{
}

export type GetOneBackstageUserParams = {
      pathId: string
}


export const GetOneBackstageUserRequestConvert = (
    body: GetOneBackstageUserReqBody,
    query: GetOneBackstageUserReqQuery,
    path: GetOneBackstageUserReqParams,
    cookie: GetOneBackstageUserReqCookie,
): GetOneBackstageUserParams => {
  return {
            pathId: path.id,
  };
};


