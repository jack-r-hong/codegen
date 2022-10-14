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


type ReadManyBackstagePayManageReqBody = {
  }

type ReadManyBackstagePayManageReqQuery = {
      page: string
      take: string
      type: string
      userId: string
}

type ReadManyBackstagePayManageReqParams = {
}

type ReadManyBackstagePayManageReqCookie = {
}

export interface ReadManyBackstagePayManageRequest extends TypedRequest<
  ReadManyBackstagePayManageReqBody,
  ReadManyBackstagePayManageReqQuery,
  ReadManyBackstagePayManageReqParams,
  ReadManyBackstagePayManageReqCookie
>{
}

export type ReadManyBackstagePayManageParams = {
      queryPage: number
      queryTake: number
      queryType: number
      queryUserId: string
}


export const ReadManyBackstagePayManageRequestConvert = (
    body: ReadManyBackstagePayManageReqBody,
    query: ReadManyBackstagePayManageReqQuery,
    path: ReadManyBackstagePayManageReqParams,
    cookie: ReadManyBackstagePayManageReqCookie,
): ReadManyBackstagePayManageParams => {
  return {
          queryPage: parseInt(query.page),
          queryTake: parseInt(query.take),
          queryType: parseInt(query.type),
            queryUserId: query.userId,
  };
};
type CareateBackstagePayManageReqBody = {
            type: number,
          userId: string,
}

type CareateBackstagePayManageReqQuery = {
}

type CareateBackstagePayManageReqParams = {
}

type CareateBackstagePayManageReqCookie = {
}

export interface CareateBackstagePayManageRequest extends TypedRequest<
  CareateBackstagePayManageReqBody,
  CareateBackstagePayManageReqQuery,
  CareateBackstagePayManageReqParams,
  CareateBackstagePayManageReqCookie
>{
}

export type CareateBackstagePayManageParams = {
bodyType: number,
bodyUserId: string,
}


export const CareateBackstagePayManageRequestConvert = (
    body: CareateBackstagePayManageReqBody,
    query: CareateBackstagePayManageReqQuery,
    path: CareateBackstagePayManageReqParams,
    cookie: CareateBackstagePayManageReqCookie,
): CareateBackstagePayManageParams => {
  return {
    bodyType: body.type,
    bodyUserId: body.userId,
  };
};
type DeleteQrCodeReqBody = {
  }

type DeleteQrCodeReqQuery = {
}

type DeleteQrCodeReqParams = {
      id: string
,
}

type DeleteQrCodeReqCookie = {
}

export interface DeleteQrCodeRequest extends TypedRequest<
  DeleteQrCodeReqBody,
  DeleteQrCodeReqQuery,
  DeleteQrCodeReqParams,
  DeleteQrCodeReqCookie
>{
}

export type DeleteQrCodeParams = {
      pathId: number
}


export const DeleteQrCodeRequestConvert = (
    body: DeleteQrCodeReqBody,
    query: DeleteQrCodeReqQuery,
    path: DeleteQrCodeReqParams,
    cookie: DeleteQrCodeReqCookie,
): DeleteQrCodeParams => {
  return {
          pathId: parseInt(path.id),
  };
};
type UploadManyQrCodeReqBody = {
  }

type UploadManyQrCodeReqQuery = {
}

type UploadManyQrCodeReqParams = {
      id: string
,
}

type UploadManyQrCodeReqCookie = {
}

export interface UploadManyQrCodeRequest extends TypedRequest<
  UploadManyQrCodeReqBody,
  UploadManyQrCodeReqQuery,
  UploadManyQrCodeReqParams,
  UploadManyQrCodeReqCookie
>{
}

export type UploadManyQrCodeParams = {
      pathId: number
}


export const UploadManyQrCodeRequestConvert = (
    body: UploadManyQrCodeReqBody,
    query: UploadManyQrCodeReqQuery,
    path: UploadManyQrCodeReqParams,
    cookie: UploadManyQrCodeReqCookie,
): UploadManyQrCodeParams => {
  return {
          pathId: parseInt(path.id),
  };
};
type DeleteOneBackstagePayManageReqBody = {
  }

type DeleteOneBackstagePayManageReqQuery = {
}

type DeleteOneBackstagePayManageReqParams = {
      id: string
,
}

type DeleteOneBackstagePayManageReqCookie = {
}

export interface DeleteOneBackstagePayManageRequest extends TypedRequest<
  DeleteOneBackstagePayManageReqBody,
  DeleteOneBackstagePayManageReqQuery,
  DeleteOneBackstagePayManageReqParams,
  DeleteOneBackstagePayManageReqCookie
>{
}

export type DeleteOneBackstagePayManageParams = {
      pathId: number
}


export const DeleteOneBackstagePayManageRequestConvert = (
    body: DeleteOneBackstagePayManageReqBody,
    query: DeleteOneBackstagePayManageReqQuery,
    path: DeleteOneBackstagePayManageReqParams,
    cookie: DeleteOneBackstagePayManageReqCookie,
): DeleteOneBackstagePayManageParams => {
  return {
          pathId: parseInt(path.id),
  };
};
type UpdateBackstagePayManageReqBody = {
            code: string,
          remark: string,
          status: number|undefined,
}

type UpdateBackstagePayManageReqQuery = {
}

type UpdateBackstagePayManageReqParams = {
      id: string
,
}

type UpdateBackstagePayManageReqCookie = {
}

export interface UpdateBackstagePayManageRequest extends TypedRequest<
  UpdateBackstagePayManageReqBody,
  UpdateBackstagePayManageReqQuery,
  UpdateBackstagePayManageReqParams,
  UpdateBackstagePayManageReqCookie
>{
}

export type UpdateBackstagePayManageParams = {
      pathId: number
bodyCode: string,
bodyRemark: string,
bodyStatus: number|undefined,
}


export const UpdateBackstagePayManageRequestConvert = (
    body: UpdateBackstagePayManageReqBody,
    query: UpdateBackstagePayManageReqQuery,
    path: UpdateBackstagePayManageReqParams,
    cookie: UpdateBackstagePayManageReqCookie,
): UpdateBackstagePayManageParams => {
  return {
    pathId: parseInt(path.id),
    bodyCode: body.code,
    bodyRemark: body.remark,
    bodyStatus: typeof body.status === 'number' ? body.status : undefined,
  };
};


