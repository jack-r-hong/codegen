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
  Account: string,
Amount: string,
Bank: string,
MemberOrderNo: string,
OrderNo: string,
Sign: string,
Status: string,
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
bodyAccount: string,
bodyAmount: string,
bodyBank: string,
bodyMemberOrderNo: string,
bodyOrderNo: string,
bodySign: string,
bodyStatus: string,
}


export const NotifyPaidRequestConvert = (
    body: NotifyPaidReqBody,
    query: NotifyPaidReqQuery,
    path: NotifyPaidReqParams,
    cookie: NotifyPaidReqCookie,
): NotifyPaidParams => {
  return {
    bodyAccount: body.Account,
    bodyAmount: body.Amount,
    bodyBank: body.Bank,
    bodyMemberOrderNo: body.MemberOrderNo,
    bodyOrderNo: body.OrderNo,
    bodySign: body.Sign,
    bodyStatus: body.Status,
  };
};
type NotifyTakeNumberReqBody = {
  Amount: string,
BankName: string,
DueTime: string,
MemberOrderNo: string,
OrderNo: string,
PaymentInfo: string,
Sign: string,
Status: string,
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
bodyAmount: string,
bodyBankName: string,
bodyDueTime: string,
bodyMemberOrderNo: string,
bodyOrderNo: string,
bodyPaymentInfo: string,
bodySign: string,
bodyStatus: string,
}


export const NotifyTakeNumberRequestConvert = (
    body: NotifyTakeNumberReqBody,
    query: NotifyTakeNumberReqQuery,
    path: NotifyTakeNumberReqParams,
    cookie: NotifyTakeNumberReqCookie,
): NotifyTakeNumberParams => {
  return {
    bodyAmount: body.Amount,
    bodyBankName: body.BankName,
    bodyDueTime: body.DueTime,
    bodyMemberOrderNo: body.MemberOrderNo,
    bodyOrderNo: body.OrderNo,
    bodyPaymentInfo: body.PaymentInfo,
    bodySign: body.Sign,
    bodyStatus: body.Status,
  };
};


