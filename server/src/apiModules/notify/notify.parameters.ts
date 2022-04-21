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


type ReadManyNotifyReqBody = {
  }

type ReadManyNotifyReqQuery = {
      orderBy: string
      orderByField: string
}

type ReadManyNotifyReqParams = {
}

type ReadManyNotifyReqCookie = {
      JSESSIONID: string
,
}

export interface ReadManyNotifyRequest extends TypedRequest<
  ReadManyNotifyReqBody,
  ReadManyNotifyReqQuery,
  ReadManyNotifyReqParams,
  ReadManyNotifyReqCookie
>{
}

export type ReadManyNotifyParams = {
      queryOrderBy: string
      queryOrderByField: string
      cookieJsessionid: string
}


export const ReadManyNotifyRequestConvert = (
    body: ReadManyNotifyReqBody,
    query: ReadManyNotifyReqQuery,
    path: ReadManyNotifyReqParams,
    cookie: ReadManyNotifyReqCookie,
): ReadManyNotifyParams => {
  return {
            queryOrderBy: query.orderBy,
            queryOrderByField: query.orderByField,
            cookieJsessionid: cookie.JSESSIONID,
  };
};
type CreateOneNotifyReqBody = {
  event: string,
msg: string,
ownerId: string,
read: string,
}

type CreateOneNotifyReqQuery = {
}

type CreateOneNotifyReqParams = {
}

type CreateOneNotifyReqCookie = {
}

export interface CreateOneNotifyRequest extends TypedRequest<
  CreateOneNotifyReqBody,
  CreateOneNotifyReqQuery,
  CreateOneNotifyReqParams,
  CreateOneNotifyReqCookie
>{
}

export type CreateOneNotifyParams = {
bodyEvent: string,
bodyMsg: string,
bodyOwnerId: string,
bodyRead: boolean,
}


export const CreateOneNotifyRequestConvert = (
    body: CreateOneNotifyReqBody,
    query: CreateOneNotifyReqQuery,
    path: CreateOneNotifyReqParams,
    cookie: CreateOneNotifyReqCookie,
): CreateOneNotifyParams => {
  return {
    bodyEvent: body.event,
    bodyMsg: body.msg,
    bodyOwnerId: body.ownerId,
    bodyRead: !!body.read,
  };
};
type UpdateManyNotifyReqBody = {
          dataList: {
                event: string,
                msg: string,
                ownerId: string,
                read: string,
        }[],
whereField: string,
}

type UpdateManyNotifyReqQuery = {
}

type UpdateManyNotifyReqParams = {
}

type UpdateManyNotifyReqCookie = {
}

export interface UpdateManyNotifyRequest extends TypedRequest<
  UpdateManyNotifyReqBody,
  UpdateManyNotifyReqQuery,
  UpdateManyNotifyReqParams,
  UpdateManyNotifyReqCookie
>{
}

export type UpdateManyNotifyParams = {
        bodyDataList: {
            bodyEvent: string,
            bodyMsg: string,
            bodyOwnerId: string,
            bodyRead: boolean,
        }[],
bodyWhereField: string,
}


export const UpdateManyNotifyRequestConvert = (
    body: UpdateManyNotifyReqBody,
    query: UpdateManyNotifyReqQuery,
    path: UpdateManyNotifyReqParams,
    cookie: UpdateManyNotifyReqCookie,
): UpdateManyNotifyParams => {
  return {
    bodyDataList: body.dataList.map((body :any) => {
      return {
        bodyEvent: body.event,
        bodyMsg: body.msg,
        bodyOwnerId: body.ownerId,
        bodyRead: !!body.read,
      };
    }),
    bodyWhereField: body.whereField,
  };
};


