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


type CustomPageReqBody = {
  }

type CustomPageReqQuery = {
}

type CustomPageReqParams = {
}

type CustomPageReqCookie = {
}

export interface CustomPageRequest extends TypedRequest<
  CustomPageReqBody,
  CustomPageReqQuery,
  CustomPageReqParams,
  CustomPageReqCookie
>{
}

export type CustomPageParams = {
}


export const CustomPageRequestConvert = (
    body: CustomPageReqBody,
    query: CustomPageReqQuery,
    path: CustomPageReqParams,
    cookie: CustomPageReqCookie,
): CustomPageParams => {
  return {
  };
};
type NotifyGrantReqBody = {
            Amount: number,
          Fee: number,
          MemberOrderNo: string,
          OrderNo: string,
          Sign: string,
          Status: string,
}

type NotifyGrantReqQuery = {
}

type NotifyGrantReqParams = {
}

type NotifyGrantReqCookie = {
}

export interface NotifyGrantRequest extends TypedRequest<
  NotifyGrantReqBody,
  NotifyGrantReqQuery,
  NotifyGrantReqParams,
  NotifyGrantReqCookie
>{
}

export type NotifyGrantParams = {
bodyAmount: number,
bodyFee: number,
bodyMemberOrderNo: string,
bodyOrderNo: string,
bodySign: string,
bodyStatus: string,
}


export const NotifyGrantRequestConvert = (
    body: NotifyGrantReqBody,
    query: NotifyGrantReqQuery,
    path: NotifyGrantReqParams,
    cookie: NotifyGrantReqCookie,
): NotifyGrantParams => {
  return {
    bodyAmount: body.Amount,
    bodyFee: body.Fee,
    bodyMemberOrderNo: body.MemberOrderNo,
    bodyOrderNo: body.OrderNo,
    bodySign: body.Sign,
    bodyStatus: body.Status,
  };
};
type NotifyPaidReqBody = {
            Account: string|undefined,
          Amount: string,
          Bank: string|undefined,
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
bodyAccount: string|undefined,
bodyAmount: string,
bodyBank: string|undefined,
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
          BankName: string|undefined,
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
bodyBankName: string|undefined,
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
type TakeNumberSuccessReqBody = {
  }

type TakeNumberSuccessReqQuery = {
}

type TakeNumberSuccessReqParams = {
}

type TakeNumberSuccessReqCookie = {
}

export interface TakeNumberSuccessRequest extends TypedRequest<
  TakeNumberSuccessReqBody,
  TakeNumberSuccessReqQuery,
  TakeNumberSuccessReqParams,
  TakeNumberSuccessReqCookie
>{
}

export type TakeNumberSuccessParams = {
}


export const TakeNumberSuccessRequestConvert = (
    body: TakeNumberSuccessReqBody,
    query: TakeNumberSuccessReqQuery,
    path: TakeNumberSuccessReqParams,
    cookie: TakeNumberSuccessReqCookie,
): TakeNumberSuccessParams => {
  return {
  };
};


