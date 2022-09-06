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


type GetUserVerifyPhotoReqBody = {
  }

type GetUserVerifyPhotoReqQuery = {
}

type GetUserVerifyPhotoReqParams = {
}

type GetUserVerifyPhotoReqCookie = {
}

export interface GetUserVerifyPhotoRequest extends TypedRequest<
  GetUserVerifyPhotoReqBody,
  GetUserVerifyPhotoReqQuery,
  GetUserVerifyPhotoReqParams,
  GetUserVerifyPhotoReqCookie
>{
}

export type GetUserVerifyPhotoParams = {
}


export const GetUserVerifyPhotoRequestConvert = (
    body: GetUserVerifyPhotoReqBody,
    query: GetUserVerifyPhotoReqQuery,
    path: GetUserVerifyPhotoReqParams,
    cookie: GetUserVerifyPhotoReqCookie,
): GetUserVerifyPhotoParams => {
  return {
  };
};
type UploadManyVerifyPhotoReqBody = {
  }

type UploadManyVerifyPhotoReqQuery = {
      types: string[]
}

type UploadManyVerifyPhotoReqParams = {
}

type UploadManyVerifyPhotoReqCookie = {
}

export interface UploadManyVerifyPhotoRequest extends TypedRequest<
  UploadManyVerifyPhotoReqBody,
  UploadManyVerifyPhotoReqQuery,
  UploadManyVerifyPhotoReqParams,
  UploadManyVerifyPhotoReqCookie
>{
}

export type UploadManyVerifyPhotoParams = {
      queryTypes: number[]
}


export const UploadManyVerifyPhotoRequestConvert = (
    body: UploadManyVerifyPhotoReqBody,
    query: UploadManyVerifyPhotoReqQuery,
    path: UploadManyVerifyPhotoReqParams,
    cookie: UploadManyVerifyPhotoReqCookie,
): UploadManyVerifyPhotoParams => {
  return {
    queryTypes: typeof query.types === 'string'?
    [parseInt(query.types)] :
  query.types.map((e) => parseInt(e)),
  };
};


