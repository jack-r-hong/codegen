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


type GetBackstageBankAccountResonReqBody = {
  }

type GetBackstageBankAccountResonReqQuery = {
}

type GetBackstageBankAccountResonReqParams = {
}

type GetBackstageBankAccountResonReqCookie = {
}

export interface GetBackstageBankAccountResonRequest extends TypedRequest<
  GetBackstageBankAccountResonReqBody,
  GetBackstageBankAccountResonReqQuery,
  GetBackstageBankAccountResonReqParams,
  GetBackstageBankAccountResonReqCookie
>{
}

export type GetBackstageBankAccountResonParams = {
}


export const GetBackstageBankAccountResonRequestConvert = (
    body: GetBackstageBankAccountResonReqBody,
    query: GetBackstageBankAccountResonReqQuery,
    path: GetBackstageBankAccountResonReqParams,
    cookie: GetBackstageBankAccountResonReqCookie,
): GetBackstageBankAccountResonParams => {
  return {
  };
};
type CreateBackstageBankAccountsResonReqBody = {
  des: string,
}

type CreateBackstageBankAccountsResonReqQuery = {
}

type CreateBackstageBankAccountsResonReqParams = {
}

type CreateBackstageBankAccountsResonReqCookie = {
}

export interface CreateBackstageBankAccountsResonRequest extends TypedRequest<
  CreateBackstageBankAccountsResonReqBody,
  CreateBackstageBankAccountsResonReqQuery,
  CreateBackstageBankAccountsResonReqParams,
  CreateBackstageBankAccountsResonReqCookie
>{
}

export type CreateBackstageBankAccountsResonParams = {
bodyDes: string,
}


export const CreateBackstageBankAccountsResonRequestConvert = (
    body: CreateBackstageBankAccountsResonReqBody,
    query: CreateBackstageBankAccountsResonReqQuery,
    path: CreateBackstageBankAccountsResonReqParams,
    cookie: CreateBackstageBankAccountsResonReqCookie,
): CreateBackstageBankAccountsResonParams => {
  return {
    bodyDes: body.des,
  };
};
type DeleteBackstageBankAccountResonReqBody = {
  }

type DeleteBackstageBankAccountResonReqQuery = {
}

type DeleteBackstageBankAccountResonReqParams = {
      resonId: string
,
}

type DeleteBackstageBankAccountResonReqCookie = {
}

export interface DeleteBackstageBankAccountResonRequest extends TypedRequest<
  DeleteBackstageBankAccountResonReqBody,
  DeleteBackstageBankAccountResonReqQuery,
  DeleteBackstageBankAccountResonReqParams,
  DeleteBackstageBankAccountResonReqCookie
>{
}

export type DeleteBackstageBankAccountResonParams = {
      pathResonId: number
}


export const DeleteBackstageBankAccountResonRequestConvert = (
    body: DeleteBackstageBankAccountResonReqBody,
    query: DeleteBackstageBankAccountResonReqQuery,
    path: DeleteBackstageBankAccountResonReqParams,
    cookie: DeleteBackstageBankAccountResonReqCookie,
): DeleteBackstageBankAccountResonParams => {
  return {
          pathResonId: parseInt(path.resonId),
  };
};
type UpdateBackstageBankAccountResonReqBody = {
  des: string,
}

type UpdateBackstageBankAccountResonReqQuery = {
}

type UpdateBackstageBankAccountResonReqParams = {
      resonId: string
,
}

type UpdateBackstageBankAccountResonReqCookie = {
}

export interface UpdateBackstageBankAccountResonRequest extends TypedRequest<
  UpdateBackstageBankAccountResonReqBody,
  UpdateBackstageBankAccountResonReqQuery,
  UpdateBackstageBankAccountResonReqParams,
  UpdateBackstageBankAccountResonReqCookie
>{
}

export type UpdateBackstageBankAccountResonParams = {
      pathResonId: number
bodyDes: string,
}


export const UpdateBackstageBankAccountResonRequestConvert = (
    body: UpdateBackstageBankAccountResonReqBody,
    query: UpdateBackstageBankAccountResonReqQuery,
    path: UpdateBackstageBankAccountResonReqParams,
    cookie: UpdateBackstageBankAccountResonReqCookie,
): UpdateBackstageBankAccountResonParams => {
  return {
    pathResonId: parseInt(path.resonId),
    bodyDes: body.des,
  };
};
type GetBackstageBankAccountsReqBody = {
  }

type GetBackstageBankAccountsReqQuery = {
}

type GetBackstageBankAccountsReqParams = {
      userId: string
,
}

type GetBackstageBankAccountsReqCookie = {
}

export interface GetBackstageBankAccountsRequest extends TypedRequest<
  GetBackstageBankAccountsReqBody,
  GetBackstageBankAccountsReqQuery,
  GetBackstageBankAccountsReqParams,
  GetBackstageBankAccountsReqCookie
>{
}

export type GetBackstageBankAccountsParams = {
      pathUserId: string
}


export const GetBackstageBankAccountsRequestConvert = (
    body: GetBackstageBankAccountsReqBody,
    query: GetBackstageBankAccountsReqQuery,
    path: GetBackstageBankAccountsReqParams,
    cookie: GetBackstageBankAccountsReqCookie,
): GetBackstageBankAccountsParams => {
  return {
            pathUserId: path.userId,
  };
};
type PutBackstageBankAccountsReqBody = {
          dataList: {
                account: string,
                accountResonId: string,
                code: string,
                codeResonId: string,
                name: string,
                nameResonId: string,
                photo: string,
                photoResonId: string,
                verifyId: string,
        }[],
}

type PutBackstageBankAccountsReqQuery = {
}

type PutBackstageBankAccountsReqParams = {
      userId: string
,
}

type PutBackstageBankAccountsReqCookie = {
}

export interface PutBackstageBankAccountsRequest extends TypedRequest<
  PutBackstageBankAccountsReqBody,
  PutBackstageBankAccountsReqQuery,
  PutBackstageBankAccountsReqParams,
  PutBackstageBankAccountsReqCookie
>{
}

export type PutBackstageBankAccountsParams = {
      pathUserId: string
        bodyDataList: {
            bodyAccount: number,
            bodyAccountResonId: number|undefined,
            bodyCode: number,
            bodyCodeResonId: number|undefined,
            bodyName: number,
            bodyNameResonId: number|undefined,
            bodyPhoto: number,
            bodyPhotoResonId: number|undefined,
            bodyVerifyId: number,
        }[],
}


export const PutBackstageBankAccountsRequestConvert = (
    body: PutBackstageBankAccountsReqBody,
    query: PutBackstageBankAccountsReqQuery,
    path: PutBackstageBankAccountsReqParams,
    cookie: PutBackstageBankAccountsReqCookie,
): PutBackstageBankAccountsParams => {
  return {
      pathUserId: path.userId,
    bodyDataList: body.dataList.map((body :any) => {
      return {
        bodyAccount: parseInt(body.account),
        bodyAccountResonId: typeof body.accountResonId === 'number' ? body.accountResonId : undefined,
        bodyCode: parseInt(body.code),
        bodyCodeResonId: typeof body.codeResonId === 'number' ? body.codeResonId : undefined,
        bodyName: parseInt(body.name),
        bodyNameResonId: typeof body.nameResonId === 'number' ? body.nameResonId : undefined,
        bodyPhoto: parseInt(body.photo),
        bodyPhotoResonId: typeof body.photoResonId === 'number' ? body.photoResonId : undefined,
        bodyVerifyId: parseInt(body.verifyId),
      };
    }),
  };
};
type CreateBankAccountsReqBody = {
          data: {
                account: string,
                code: string,
                name: string,
                order: string,
        }[],
}

type CreateBankAccountsReqQuery = {
}

type CreateBankAccountsReqParams = {
}

type CreateBankAccountsReqCookie = {
}

export interface CreateBankAccountsRequest extends TypedRequest<
  CreateBankAccountsReqBody,
  CreateBankAccountsReqQuery,
  CreateBankAccountsReqParams,
  CreateBankAccountsReqCookie
>{
}

export type CreateBankAccountsParams = {
        bodyData: {
            bodyAccount: number,
            bodyCode: number,
            bodyName: string,
            bodyOrder: number,
        }[],
}


export const CreateBankAccountsRequestConvert = (
    body: CreateBankAccountsReqBody,
    query: CreateBankAccountsReqQuery,
    path: CreateBankAccountsReqParams,
    cookie: CreateBankAccountsReqCookie,
): CreateBankAccountsParams => {
  return {
    bodyData: body.data.map((body :any) => {
      return {
        bodyAccount: parseInt(body.account),
        bodyCode: parseInt(body.code),
        bodyName: body.name,
        bodyOrder: parseInt(body.order),
      };
    }),
  };
};
type GetMyBankAccountsReqBody = {
  }

type GetMyBankAccountsReqQuery = {
      status: string
}

type GetMyBankAccountsReqParams = {
}

type GetMyBankAccountsReqCookie = {
}

export interface GetMyBankAccountsRequest extends TypedRequest<
  GetMyBankAccountsReqBody,
  GetMyBankAccountsReqQuery,
  GetMyBankAccountsReqParams,
  GetMyBankAccountsReqCookie
>{
}

export type GetMyBankAccountsParams = {
      queryStatus: number
}


export const GetMyBankAccountsRequestConvert = (
    body: GetMyBankAccountsReqBody,
    query: GetMyBankAccountsReqQuery,
    path: GetMyBankAccountsReqParams,
    cookie: GetMyBankAccountsReqCookie,
): GetMyBankAccountsParams => {
  return {
          queryStatus: parseInt(query.status),
  };
};
type ReadOneBankAccountReqBody = {
  }

type ReadOneBankAccountReqQuery = {
}

type ReadOneBankAccountReqParams = {
      id: string
,
}

type ReadOneBankAccountReqCookie = {
}

export interface ReadOneBankAccountRequest extends TypedRequest<
  ReadOneBankAccountReqBody,
  ReadOneBankAccountReqQuery,
  ReadOneBankAccountReqParams,
  ReadOneBankAccountReqCookie
>{
}

export type ReadOneBankAccountParams = {
      pathId: number
}


export const ReadOneBankAccountRequestConvert = (
    body: ReadOneBankAccountReqBody,
    query: ReadOneBankAccountReqQuery,
    path: ReadOneBankAccountReqParams,
    cookie: ReadOneBankAccountReqCookie,
): ReadOneBankAccountParams => {
  return {
          pathId: parseInt(path.id),
  };
};


