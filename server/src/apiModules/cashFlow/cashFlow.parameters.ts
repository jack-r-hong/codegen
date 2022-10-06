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


type NotifyPaidReqBody = {
  }

type NotifyPaidReqQuery = {
}

type NotifyPaidReqParams = {
}

type NotifyPaidReqCookie = {
}

export interface NotifyPaidRequest extends TypedRequest<
  NotifyPaidReqBody,
  NotifyPaidReqQuery,
  NotifyPaidReqParams,
  NotifyPaidReqCookie
>{
}

export type NotifyPaidParams = {
}


export const NotifyPaidRequestConvert = (
    body: NotifyPaidReqBody,
    query: NotifyPaidReqQuery,
    path: NotifyPaidReqParams,
    cookie: NotifyPaidReqCookie,
): NotifyPaidParams => {
  return {
  };
};
type NotifyTakeNumberReqBody = {
  }

type NotifyTakeNumberReqQuery = {
}

type NotifyTakeNumberReqParams = {
}

type NotifyTakeNumberReqCookie = {
}

export interface NotifyTakeNumberRequest extends TypedRequest<
  NotifyTakeNumberReqBody,
  NotifyTakeNumberReqQuery,
  NotifyTakeNumberReqParams,
  NotifyTakeNumberReqCookie
>{
}

export type NotifyTakeNumberParams = {
}


export const NotifyTakeNumberRequestConvert = (
    body: NotifyTakeNumberReqBody,
    query: NotifyTakeNumberReqQuery,
    path: NotifyTakeNumberReqParams,
    cookie: NotifyTakeNumberReqCookie,
): NotifyTakeNumberParams => {
  return {
  };
};


