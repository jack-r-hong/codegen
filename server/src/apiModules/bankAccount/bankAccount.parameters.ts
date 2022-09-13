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
            bodyAccountResonId: number,
            bodyCode: number,
            bodyCodeResonId: number,
            bodyName: number,
            bodyNameResonId: number,
            bodyPhoto: number,
            bodyPhotoResonId: number,
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
        bodyAccountResonId: parseInt(body.accountResonId),
        bodyCode: parseInt(body.code),
        bodyCodeResonId: parseInt(body.codeResonId),
        bodyName: parseInt(body.name),
        bodyNameResonId: parseInt(body.nameResonId),
        bodyPhoto: parseInt(body.photo),
        bodyPhotoResonId: parseInt(body.photoResonId),
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


