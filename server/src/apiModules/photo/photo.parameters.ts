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


type ReadManyAdminPhotoReqBody = {
  }

type ReadManyAdminPhotoReqQuery = {
      orderBy: string
      orderByField: string
      status: string
}

type ReadManyAdminPhotoReqParams = {
}

type ReadManyAdminPhotoReqCookie = {
}

export interface ReadManyAdminPhotoRequest extends TypedRequest<
  ReadManyAdminPhotoReqBody,
  ReadManyAdminPhotoReqQuery,
  ReadManyAdminPhotoReqParams,
  ReadManyAdminPhotoReqCookie
>{
}

export type ReadManyAdminPhotoParams = {
      queryOrderBy: string
      queryOrderByField: string
      queryStatus: number
}


export const ReadManyAdminPhotoRequestConvert = (
    body: ReadManyAdminPhotoReqBody,
    query: ReadManyAdminPhotoReqQuery,
    path: ReadManyAdminPhotoReqParams,
    cookie: ReadManyAdminPhotoReqCookie,
): ReadManyAdminPhotoParams => {
  return {
            queryOrderBy: query.orderBy,
            queryOrderByField: query.orderByField,
          queryStatus: parseInt(query.status),
  };
};
type ReadOnePhotoReqBody = {
  }

type ReadOnePhotoReqQuery = {
}

type ReadOnePhotoReqParams = {
      id: string
,
}

type ReadOnePhotoReqCookie = {
}

export interface ReadOnePhotoRequest extends TypedRequest<
  ReadOnePhotoReqBody,
  ReadOnePhotoReqQuery,
  ReadOnePhotoReqParams,
  ReadOnePhotoReqCookie
>{
}

export type ReadOnePhotoParams = {
      pathId: number
}


export const ReadOnePhotoRequestConvert = (
    body: ReadOnePhotoReqBody,
    query: ReadOnePhotoReqQuery,
    path: ReadOnePhotoReqParams,
    cookie: ReadOnePhotoReqCookie,
): ReadOnePhotoParams => {
  return {
          pathId: parseInt(path.id),
  };
};
type UpdateOnePhotoReqBody = {
  afterLevel: string|undefined,
beforeLevel: string|undefined,
filePath2: string|null,
process: string|undefined,
status: string|undefined,
}

type UpdateOnePhotoReqQuery = {
}

type UpdateOnePhotoReqParams = {
      id: string
,
}

type UpdateOnePhotoReqCookie = {
}

export interface UpdateOnePhotoRequest extends TypedRequest<
  UpdateOnePhotoReqBody,
  UpdateOnePhotoReqQuery,
  UpdateOnePhotoReqParams,
  UpdateOnePhotoReqCookie
>{
}

export type UpdateOnePhotoParams = {
      pathId: number
bodyAfterLevel: number|undefined,
bodyBeforeLevel: number|undefined,
bodyFilePath2: string|null,
bodyProcess: number|undefined,
bodyStatus: number|undefined,
}


export const UpdateOnePhotoRequestConvert = (
    body: UpdateOnePhotoReqBody,
    query: UpdateOnePhotoReqQuery,
    path: UpdateOnePhotoReqParams,
    cookie: UpdateOnePhotoReqCookie,
): UpdateOnePhotoParams => {
  return {
    pathId: parseInt(path.id),
    bodyAfterLevel: body.afterLevel? parseInt(body.afterLevel):undefined,
    bodyBeforeLevel: body.beforeLevel? parseInt(body.beforeLevel):undefined,
    bodyFilePath2: body.filePath2,
    bodyProcess: body.process? parseInt(body.process):undefined,
    bodyStatus: body.status? parseInt(body.status):undefined,
  };
};
type DeleteManyPhotoReqBody = {
  }

type DeleteManyPhotoReqQuery = {
      id: string[]
}

type DeleteManyPhotoReqParams = {
}

type DeleteManyPhotoReqCookie = {
}

export interface DeleteManyPhotoRequest extends TypedRequest<
  DeleteManyPhotoReqBody,
  DeleteManyPhotoReqQuery,
  DeleteManyPhotoReqParams,
  DeleteManyPhotoReqCookie
>{
}

export type DeleteManyPhotoParams = {
      queryId: number[]
}


export const DeleteManyPhotoRequestConvert = (
    body: DeleteManyPhotoReqBody,
    query: DeleteManyPhotoReqQuery,
    path: DeleteManyPhotoReqParams,
    cookie: DeleteManyPhotoReqCookie,
): DeleteManyPhotoParams => {
  return {
    queryId: typeof query.id === 'string'?
    [parseInt(query.id)] :
  query.id.map((e) => parseInt(e)),
  };
};
type ReadManyPhotoReqBody = {
  }

type ReadManyPhotoReqQuery = {
      orderBy: string
      orderByField: string
}

type ReadManyPhotoReqParams = {
}

type ReadManyPhotoReqCookie = {
      JSESSIONID: string
,
}

export interface ReadManyPhotoRequest extends TypedRequest<
  ReadManyPhotoReqBody,
  ReadManyPhotoReqQuery,
  ReadManyPhotoReqParams,
  ReadManyPhotoReqCookie
>{
}

export type ReadManyPhotoParams = {
      queryOrderBy: string
      queryOrderByField: string
      cookieJsessionid: string
}


export const ReadManyPhotoRequestConvert = (
    body: ReadManyPhotoReqBody,
    query: ReadManyPhotoReqQuery,
    path: ReadManyPhotoReqParams,
    cookie: ReadManyPhotoReqCookie,
): ReadManyPhotoParams => {
  return {
            queryOrderBy: query.orderBy,
            queryOrderByField: query.orderByField,
            cookieJsessionid: cookie.JSESSIONID,
  };
};
type UploadManyPhotoReqBody = {
  }

type UploadManyPhotoReqQuery = {
}

type UploadManyPhotoReqParams = {
}

type UploadManyPhotoReqCookie = {
      JSESSIONID: string
,
}

export interface UploadManyPhotoRequest extends TypedRequest<
  UploadManyPhotoReqBody,
  UploadManyPhotoReqQuery,
  UploadManyPhotoReqParams,
  UploadManyPhotoReqCookie
>{
}

export type UploadManyPhotoParams = {
      cookieJsessionid: string
}


export const UploadManyPhotoRequestConvert = (
    body: UploadManyPhotoReqBody,
    query: UploadManyPhotoReqQuery,
    path: UploadManyPhotoReqParams,
    cookie: UploadManyPhotoReqCookie,
): UploadManyPhotoParams => {
  return {
            cookieJsessionid: cookie.JSESSIONID,
  };
};
type UpdateManyPhotoReqBody = {
          dataList: {
                afterLevel: string,
                beforeLevel: string,
                filePath2: string,
                id: string,
                process: string,
                status: string,
        }[],
whereField: string,
}

type UpdateManyPhotoReqQuery = {
}

type UpdateManyPhotoReqParams = {
}

type UpdateManyPhotoReqCookie = {
}

export interface UpdateManyPhotoRequest extends TypedRequest<
  UpdateManyPhotoReqBody,
  UpdateManyPhotoReqQuery,
  UpdateManyPhotoReqParams,
  UpdateManyPhotoReqCookie
>{
}

export type UpdateManyPhotoParams = {
        bodyDataList: {
            bodyAfterLevel: number|undefined,
            bodyBeforeLevel: number|undefined,
            bodyFilePath2: string|null,
            bodyId: number,
            bodyProcess: number|undefined,
            bodyStatus: number|undefined,
        }[],
bodyWhereField: string,
}


export const UpdateManyPhotoRequestConvert = (
    body: UpdateManyPhotoReqBody,
    query: UpdateManyPhotoReqQuery,
    path: UpdateManyPhotoReqParams,
    cookie: UpdateManyPhotoReqCookie,
): UpdateManyPhotoParams => {
  return {
    bodyDataList: body.dataList.map((body :any) => {
      return {
        bodyAfterLevel: body.afterLevel? parseInt(body.afterLevel):undefined,
        bodyBeforeLevel: body.beforeLevel? parseInt(body.beforeLevel):undefined,
        bodyFilePath2: body.filePath2,
        bodyId: parseInt(body.id),
        bodyProcess: body.process? parseInt(body.process):undefined,
        bodyStatus: body.status? parseInt(body.status):undefined,
      };
    }),
    bodyWhereField: body.whereField,
  };
};
type FindManyInIdsPhotoReqBody = {
  }

type FindManyInIdsPhotoReqQuery = {
      id: string[]
}

type FindManyInIdsPhotoReqParams = {
}

type FindManyInIdsPhotoReqCookie = {
}

export interface FindManyInIdsPhotoRequest extends TypedRequest<
  FindManyInIdsPhotoReqBody,
  FindManyInIdsPhotoReqQuery,
  FindManyInIdsPhotoReqParams,
  FindManyInIdsPhotoReqCookie
>{
}

export type FindManyInIdsPhotoParams = {
      queryId: number[]
}


export const FindManyInIdsPhotoRequestConvert = (
    body: FindManyInIdsPhotoReqBody,
    query: FindManyInIdsPhotoReqQuery,
    path: FindManyInIdsPhotoReqParams,
    cookie: FindManyInIdsPhotoReqCookie,
): FindManyInIdsPhotoParams => {
  return {
    queryId: typeof query.id === 'string'?
    [parseInt(query.id)] :
  query.id.map((e) => parseInt(e)),
  };
};


