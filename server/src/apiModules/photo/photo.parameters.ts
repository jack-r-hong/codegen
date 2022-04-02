import {Request} from 'express';
import {Query, ParamsDictionary} from 'express-serve-static-core';

interface TypedRequest<
  T,
  U extends Query,
  P extends ParamsDictionary
> extends Request {
  body: T,
  query: U,
  params: P,
}    type ReadOnePhotoReqBody = {
    }

    type ReadOnePhotoReqQuery = {
    }

    type ReadOnePhotoReqParams = {
          id: string
    }

    export interface ReadOnePhotoRequest extends TypedRequest<
      ReadOnePhotoReqBody,
      ReadOnePhotoReqQuery,
      ReadOnePhotoReqParams
    >{
    }

    export type ReadOnePhotoParams = {
        pathId: number
    }

    export const ReadOnePhotoRequestConvert = (
    body: ReadOnePhotoReqBody,
    query: ReadOnePhotoReqQuery,
    path: ReadOnePhotoReqParams,
    ): ReadOnePhotoParams => {
      return {
            pathId: parseInt(path.id),
      };
    };
    type UpdateOnePhotoReqBody = {
          afterLevel: string,
          beforeLevel: string,
          filePath2: string,
          process: string,
          status: string,
    }

    type UpdateOnePhotoReqQuery = {
    }

    type UpdateOnePhotoReqParams = {
          id: string
    }

    export interface UpdateOnePhotoRequest extends TypedRequest<
      UpdateOnePhotoReqBody,
      UpdateOnePhotoReqQuery,
      UpdateOnePhotoReqParams
    >{
    }

    export type UpdateOnePhotoParams = {
        pathId: number
          bodyAfterLevel: number,
          bodyBeforeLevel: number,
          bodyFilePath2: string,
          bodyProcess: number,
          bodyStatus: number,
    }

    export const UpdateOnePhotoRequestConvert = (
    body: UpdateOnePhotoReqBody,
    query: UpdateOnePhotoReqQuery,
    path: UpdateOnePhotoReqParams,
    ): UpdateOnePhotoParams => {
        return {
            pathId: parseInt(path.id),
                bodyAfterLevel: parseInt(body.afterLevel),
                bodyBeforeLevel: parseInt(body.beforeLevel),
                bodyFilePath2: body.filePath2,
                bodyProcess: parseInt(body.process),
                bodyStatus: parseInt(body.status),
        };
    };
    type DeleteManyPhotoReqBody = {
    }

    type DeleteManyPhotoReqQuery = {
          id: string[]
    }

    type DeleteManyPhotoReqParams = {
    }

    export interface DeleteManyPhotoRequest extends TypedRequest<
      DeleteManyPhotoReqBody,
      DeleteManyPhotoReqQuery,
      DeleteManyPhotoReqParams
    >{
    }

    export type DeleteManyPhotoParams = {
        queryId: number[]
    }

    export const DeleteManyPhotoRequestConvert = (
    body: DeleteManyPhotoReqBody,
    query: DeleteManyPhotoReqQuery,
    path: DeleteManyPhotoReqParams,
    ): DeleteManyPhotoParams => {
      return {
            queryId: query.id.map((e) => parseInt(e)),
      };
    };
    type ReadManyPhotoReqBody = {
    }

    type ReadManyPhotoReqQuery = {
    }

    type ReadManyPhotoReqParams = {
    }

    export interface ReadManyPhotoRequest extends TypedRequest<
      ReadManyPhotoReqBody,
      ReadManyPhotoReqQuery,
      ReadManyPhotoReqParams
    >{
    }

    export type ReadManyPhotoParams = {
    }

    export const ReadManyPhotoRequestConvert = (
    body: ReadManyPhotoReqBody,
    query: ReadManyPhotoReqQuery,
    path: ReadManyPhotoReqParams,
    ): ReadManyPhotoParams => {
      return {
      };
    };
    type UploadManyPhotoReqBody = {
    }

    type UploadManyPhotoReqQuery = {
    }

    type UploadManyPhotoReqParams = {
    }

    export interface UploadManyPhotoRequest extends TypedRequest<
      UploadManyPhotoReqBody,
      UploadManyPhotoReqQuery,
      UploadManyPhotoReqParams
    >{
    }

    export type UploadManyPhotoParams = {
    }

    export const UploadManyPhotoRequestConvert = (
    body: UploadManyPhotoReqBody,
    query: UploadManyPhotoReqQuery,
    path: UploadManyPhotoReqParams,
    ): UploadManyPhotoParams => {
      return {
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

    export interface UpdateManyPhotoRequest extends TypedRequest<
      UpdateManyPhotoReqBody,
      UpdateManyPhotoReqQuery,
      UpdateManyPhotoReqParams
    >{
    }

    export type UpdateManyPhotoParams = {
          bodyDataList: {
              bodyAfterLevel: number,
              bodyBeforeLevel: number,
              bodyFilePath2: string,
              bodyId: number,
              bodyProcess: number,
              bodyStatus: number,
          }[],
          bodyWhereField: string,
    }

    export const UpdateManyPhotoRequestConvert = (
    body: UpdateManyPhotoReqBody,
    query: UpdateManyPhotoReqQuery,
    path: UpdateManyPhotoReqParams,
    ): UpdateManyPhotoParams => {
        return {
              bodyDataList: body.dataList.map((e :any) => {
                return {
                      bodyAfterLevel: parseInt(e.afterLevel),
                      bodyBeforeLevel: parseInt(e.beforeLevel),
                      bodyFilePath2: e.filePath2,
                      bodyId: parseInt(e.id),
                      bodyProcess: parseInt(e.process),
                      bodyStatus: parseInt(e.status),
                };
              }),
                bodyWhereField: body.whereField,
        };
    };


