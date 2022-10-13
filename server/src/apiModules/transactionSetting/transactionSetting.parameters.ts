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


type GetAllSettingReqBody = {
  }

type GetAllSettingReqQuery = {
}

type GetAllSettingReqParams = {
}

type GetAllSettingReqCookie = {
}

export interface GetAllSettingRequest extends TypedRequest<
  GetAllSettingReqBody,
  GetAllSettingReqQuery,
  GetAllSettingReqParams,
  GetAllSettingReqCookie
>{
}

export type GetAllSettingParams = {
}


export const GetAllSettingRequestConvert = (
    body: GetAllSettingReqBody,
    query: GetAllSettingReqQuery,
    path: GetAllSettingReqParams,
    cookie: GetAllSettingReqCookie,
): GetAllSettingParams => {
  return {
  };
};
type UpdateSettingReqBody = {
  atmHandlingFee: string,
barCodeHandlingFee: string,
firstReward: string,
serviceFee: string,
}

type UpdateSettingReqQuery = {
}

type UpdateSettingReqParams = {
}

type UpdateSettingReqCookie = {
}

export interface UpdateSettingRequest extends TypedRequest<
  UpdateSettingReqBody,
  UpdateSettingReqQuery,
  UpdateSettingReqParams,
  UpdateSettingReqCookie
>{
}

export type UpdateSettingParams = {
bodyAtmHandlingFee: number,
bodyBarCodeHandlingFee: number,
bodyFirstReward: number,
bodyServiceFee: number,
}


export const UpdateSettingRequestConvert = (
    body: UpdateSettingReqBody,
    query: UpdateSettingReqQuery,
    path: UpdateSettingReqParams,
    cookie: UpdateSettingReqCookie,
): UpdateSettingParams => {
  return {
    bodyAtmHandlingFee: parseInt(body.atmHandlingFee),
    bodyBarCodeHandlingFee: parseInt(body.barCodeHandlingFee),
    bodyFirstReward: parseInt(body.firstReward),
    bodyServiceFee: parseInt(body.serviceFee),
  };
};


