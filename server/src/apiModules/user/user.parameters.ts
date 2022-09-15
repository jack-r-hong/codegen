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


type ReadBackstageUserResonReqBody = {
  }

type ReadBackstageUserResonReqQuery = {
}

type ReadBackstageUserResonReqParams = {
}

type ReadBackstageUserResonReqCookie = {
}

export interface ReadBackstageUserResonRequest extends TypedRequest<
  ReadBackstageUserResonReqBody,
  ReadBackstageUserResonReqQuery,
  ReadBackstageUserResonReqParams,
  ReadBackstageUserResonReqCookie
>{
}

export type ReadBackstageUserResonParams = {
}


export const ReadBackstageUserResonRequestConvert = (
    body: ReadBackstageUserResonReqBody,
    query: ReadBackstageUserResonReqQuery,
    path: ReadBackstageUserResonReqParams,
    cookie: ReadBackstageUserResonReqCookie,
): ReadBackstageUserResonParams => {
  return {
  };
};
type CreateBackstageUserResonReqBody = {
  des: string,
}

type CreateBackstageUserResonReqQuery = {
}

type CreateBackstageUserResonReqParams = {
}

type CreateBackstageUserResonReqCookie = {
}

export interface CreateBackstageUserResonRequest extends TypedRequest<
  CreateBackstageUserResonReqBody,
  CreateBackstageUserResonReqQuery,
  CreateBackstageUserResonReqParams,
  CreateBackstageUserResonReqCookie
>{
}

export type CreateBackstageUserResonParams = {
bodyDes: string,
}


export const CreateBackstageUserResonRequestConvert = (
    body: CreateBackstageUserResonReqBody,
    query: CreateBackstageUserResonReqQuery,
    path: CreateBackstageUserResonReqParams,
    cookie: CreateBackstageUserResonReqCookie,
): CreateBackstageUserResonParams => {
  return {
    bodyDes: body.des,
  };
};
type DeleteBackstageUserResonReqBody = {
  }

type DeleteBackstageUserResonReqQuery = {
}

type DeleteBackstageUserResonReqParams = {
      resonId: string
,
}

type DeleteBackstageUserResonReqCookie = {
}

export interface DeleteBackstageUserResonRequest extends TypedRequest<
  DeleteBackstageUserResonReqBody,
  DeleteBackstageUserResonReqQuery,
  DeleteBackstageUserResonReqParams,
  DeleteBackstageUserResonReqCookie
>{
}

export type DeleteBackstageUserResonParams = {
      pathResonId: number
}


export const DeleteBackstageUserResonRequestConvert = (
    body: DeleteBackstageUserResonReqBody,
    query: DeleteBackstageUserResonReqQuery,
    path: DeleteBackstageUserResonReqParams,
    cookie: DeleteBackstageUserResonReqCookie,
): DeleteBackstageUserResonParams => {
  return {
          pathResonId: parseInt(path.resonId),
  };
};
type UpdateBackstageUserResonReqBody = {
  des: string,
}

type UpdateBackstageUserResonReqQuery = {
}

type UpdateBackstageUserResonReqParams = {
      resonId: string
,
}

type UpdateBackstageUserResonReqCookie = {
}

export interface UpdateBackstageUserResonRequest extends TypedRequest<
  UpdateBackstageUserResonReqBody,
  UpdateBackstageUserResonReqQuery,
  UpdateBackstageUserResonReqParams,
  UpdateBackstageUserResonReqCookie
>{
}

export type UpdateBackstageUserResonParams = {
      pathResonId: number
bodyDes: string,
}


export const UpdateBackstageUserResonRequestConvert = (
    body: UpdateBackstageUserResonReqBody,
    query: UpdateBackstageUserResonReqQuery,
    path: UpdateBackstageUserResonReqParams,
    cookie: UpdateBackstageUserResonReqCookie,
): UpdateBackstageUserResonParams => {
  return {
    pathResonId: parseInt(path.resonId),
    bodyDes: body.des,
  };
};
type UpdateBackstageUserReqBody = {
  address: string,
addressResonId: string|undefined,
birthdate: string,
birthdateResonId: string|undefined,
certificate: string,
certificateResonId: string|undefined,
country: string,
countryResonId: string|undefined,
email: string,
emailResonId: string|undefined,
idCardDate: string,
idCardDateResonId: string|undefined,
idCardPhoto: string,
idCardPhotoResonId: string|undefined,
idCardPosiition: string,
idCardPosiitionResonId: string|undefined,
idCardType: string,
idCardTypeResonId: string|undefined,
name: string,
nameResonId: string|undefined,
selfie: string,
selfieResonId: string|undefined,
sign: string,
signResonId: string|undefined,
}

type UpdateBackstageUserReqQuery = {
}

type UpdateBackstageUserReqParams = {
      id: string
,
}

type UpdateBackstageUserReqCookie = {
}

export interface UpdateBackstageUserRequest extends TypedRequest<
  UpdateBackstageUserReqBody,
  UpdateBackstageUserReqQuery,
  UpdateBackstageUserReqParams,
  UpdateBackstageUserReqCookie
>{
}

export type UpdateBackstageUserParams = {
      pathId: string
bodyAddress: number,
bodyAddressResonId: number|undefined,
bodyBirthdate: number,
bodyBirthdateResonId: number|undefined,
bodyCertificate: number,
bodyCertificateResonId: number|undefined,
bodyCountry: number,
bodyCountryResonId: number|undefined,
bodyEmail: number,
bodyEmailResonId: number|undefined,
bodyIdCardDate: number,
bodyIdCardDateResonId: number|undefined,
bodyIdCardPhoto: number,
bodyIdCardPhotoResonId: number|undefined,
bodyIdCardPosiition: number,
bodyIdCardPosiitionResonId: number|undefined,
bodyIdCardType: number,
bodyIdCardTypeResonId: number|undefined,
bodyName: number,
bodyNameResonId: number|undefined,
bodySelfie: number,
bodySelfieResonId: number|undefined,
bodySign: number,
bodySignResonId: number|undefined,
}


export const UpdateBackstageUserRequestConvert = (
    body: UpdateBackstageUserReqBody,
    query: UpdateBackstageUserReqQuery,
    path: UpdateBackstageUserReqParams,
    cookie: UpdateBackstageUserReqCookie,
): UpdateBackstageUserParams => {
  return {
      pathId: path.id,
    bodyAddress: parseInt(body.address),
    bodyAddressResonId: typeof body.addressResonId === 'number' ? body.addressResonId : undefined,
    bodyBirthdate: parseInt(body.birthdate),
    bodyBirthdateResonId: typeof body.birthdateResonId === 'number' ? body.birthdateResonId : undefined,
    bodyCertificate: parseInt(body.certificate),
    bodyCertificateResonId: typeof body.certificateResonId === 'number' ? body.certificateResonId : undefined,
    bodyCountry: parseInt(body.country),
    bodyCountryResonId: typeof body.countryResonId === 'number' ? body.countryResonId : undefined,
    bodyEmail: parseInt(body.email),
    bodyEmailResonId: typeof body.emailResonId === 'number' ? body.emailResonId : undefined,
    bodyIdCardDate: parseInt(body.idCardDate),
    bodyIdCardDateResonId: typeof body.idCardDateResonId === 'number' ? body.idCardDateResonId : undefined,
    bodyIdCardPhoto: parseInt(body.idCardPhoto),
    bodyIdCardPhotoResonId: typeof body.idCardPhotoResonId === 'number' ? body.idCardPhotoResonId : undefined,
    bodyIdCardPosiition: parseInt(body.idCardPosiition),
    bodyIdCardPosiitionResonId: typeof body.idCardPosiitionResonId === 'number' ? body.idCardPosiitionResonId : undefined,
    bodyIdCardType: parseInt(body.idCardType),
    bodyIdCardTypeResonId: typeof body.idCardTypeResonId === 'number' ? body.idCardTypeResonId : undefined,
    bodyName: parseInt(body.name),
    bodyNameResonId: typeof body.nameResonId === 'number' ? body.nameResonId : undefined,
    bodySelfie: parseInt(body.selfie),
    bodySelfieResonId: typeof body.selfieResonId === 'number' ? body.selfieResonId : undefined,
    bodySign: parseInt(body.sign),
    bodySignResonId: typeof body.signResonId === 'number' ? body.signResonId : undefined,
  };
};
type ReadOneBackstageUserReqBody = {
  }

type ReadOneBackstageUserReqQuery = {
}

type ReadOneBackstageUserReqParams = {
      id: string
,
}

type ReadOneBackstageUserReqCookie = {
}

export interface ReadOneBackstageUserRequest extends TypedRequest<
  ReadOneBackstageUserReqBody,
  ReadOneBackstageUserReqQuery,
  ReadOneBackstageUserReqParams,
  ReadOneBackstageUserReqCookie
>{
}

export type ReadOneBackstageUserParams = {
      pathId: string
}


export const ReadOneBackstageUserRequestConvert = (
    body: ReadOneBackstageUserReqBody,
    query: ReadOneBackstageUserReqQuery,
    path: ReadOneBackstageUserReqParams,
    cookie: ReadOneBackstageUserReqCookie,
): ReadOneBackstageUserParams => {
  return {
            pathId: path.id,
  };
};
type ReadManyUserBackstageReqBody = {
  }

type ReadManyUserBackstageReqQuery = {
      orderBy: string
      orderByField: string
      page: string
      take: string
}

type ReadManyUserBackstageReqParams = {
}

type ReadManyUserBackstageReqCookie = {
}

export interface ReadManyUserBackstageRequest extends TypedRequest<
  ReadManyUserBackstageReqBody,
  ReadManyUserBackstageReqQuery,
  ReadManyUserBackstageReqParams,
  ReadManyUserBackstageReqCookie
>{
}

export type ReadManyUserBackstageParams = {
      queryOrderBy: string
      queryOrderByField: string
      queryPage: number
      queryTake: number
}


export const ReadManyUserBackstageRequestConvert = (
    body: ReadManyUserBackstageReqBody,
    query: ReadManyUserBackstageReqQuery,
    path: ReadManyUserBackstageReqParams,
    cookie: ReadManyUserBackstageReqCookie,
): ReadManyUserBackstageParams => {
  return {
            queryOrderBy: query.orderBy,
            queryOrderByField: query.orderByField,
          queryPage: parseInt(query.page),
          queryTake: parseInt(query.take),
  };
};
type CaptchaReqBody = {
  }

type CaptchaReqQuery = {
}

type CaptchaReqParams = {
}

type CaptchaReqCookie = {
}

export interface CaptchaRequest extends TypedRequest<
  CaptchaReqBody,
  CaptchaReqQuery,
  CaptchaReqParams,
  CaptchaReqCookie
>{
}

export type CaptchaParams = {
}


export const CaptchaRequestConvert = (
    body: CaptchaReqBody,
    query: CaptchaReqQuery,
    path: CaptchaReqParams,
    cookie: CaptchaReqCookie,
): CaptchaParams => {
  return {
  };
};
type LoginUserReqBody = {
  password: string,
phone: string,
phonePrefix: string,
}

type LoginUserReqQuery = {
}

type LoginUserReqParams = {
}

type LoginUserReqCookie = {
}

export interface LoginUserRequest extends TypedRequest<
  LoginUserReqBody,
  LoginUserReqQuery,
  LoginUserReqParams,
  LoginUserReqCookie
>{
}

export type LoginUserParams = {
bodyPassword: string,
bodyPhone: string,
bodyPhonePrefix: string,
}


export const LoginUserRequestConvert = (
    body: LoginUserReqBody,
    query: LoginUserReqQuery,
    path: LoginUserReqParams,
    cookie: LoginUserReqCookie,
): LoginUserParams => {
  return {
    bodyPassword: body.password,
    bodyPhone: body.phone,
    bodyPhonePrefix: body.phonePrefix,
  };
};
type GetRealVerifyReqBody = {
  }

type GetRealVerifyReqQuery = {
}

type GetRealVerifyReqParams = {
}

type GetRealVerifyReqCookie = {
}

export interface GetRealVerifyRequest extends TypedRequest<
  GetRealVerifyReqBody,
  GetRealVerifyReqQuery,
  GetRealVerifyReqParams,
  GetRealVerifyReqCookie
>{
}

export type GetRealVerifyParams = {
}


export const GetRealVerifyRequestConvert = (
    body: GetRealVerifyReqBody,
    query: GetRealVerifyReqQuery,
    path: GetRealVerifyReqParams,
    cookie: GetRealVerifyReqCookie,
): GetRealVerifyParams => {
  return {
  };
};
type PostRealVerifyReqBody = {
  address: string,
area: string,
        bankAccounts: {
                account: string,
                code: string,
                name: string,
        }[],
birthdate: string,
city: string,
country: string,
email: string,
idCard: string,
idCardDate: string,
idCardPosiition: string,
idCardType: string,
name: string,
}

type PostRealVerifyReqQuery = {
}

type PostRealVerifyReqParams = {
}

type PostRealVerifyReqCookie = {
}

export interface PostRealVerifyRequest extends TypedRequest<
  PostRealVerifyReqBody,
  PostRealVerifyReqQuery,
  PostRealVerifyReqParams,
  PostRealVerifyReqCookie
>{
}

export type PostRealVerifyParams = {
bodyAddress: string,
bodyArea: string,
        bodyBankAccounts: {
            bodyAccount: number,
            bodyCode: number,
            bodyName: string,
        }[],
bodyBirthdate: string,
bodyCity: string,
bodyCountry: string,
bodyEmail: string,
bodyIdCard: string,
bodyIdCardDate: string,
bodyIdCardPosiition: string,
bodyIdCardType: number,
bodyName: string,
}


export const PostRealVerifyRequestConvert = (
    body: PostRealVerifyReqBody,
    query: PostRealVerifyReqQuery,
    path: PostRealVerifyReqParams,
    cookie: PostRealVerifyReqCookie,
): PostRealVerifyParams => {
  return {
    bodyAddress: body.address,
    bodyArea: body.area,
    bodyBankAccounts: body.bankAccounts.map((body :any) => {
      return {
        bodyAccount: parseInt(body.account),
        bodyCode: parseInt(body.code),
        bodyName: body.name,
      };
    }),
    bodyBirthdate: body.birthdate,
    bodyCity: body.city,
    bodyCountry: body.country,
    bodyEmail: body.email,
    bodyIdCard: body.idCard,
    bodyIdCardDate: body.idCardDate,
    bodyIdCardPosiition: body.idCardPosiition,
    bodyIdCardType: parseInt(body.idCardType),
    bodyName: body.name,
  };
};
type PutRealVerifyReqBody = {
  address: string,
area: string,
birthdate: string,
city: string,
country: string,
email: string,
idCard: string,
idCardDate: string,
idCardPosiition: string,
idCardType: string,
name: string,
}

type PutRealVerifyReqQuery = {
}

type PutRealVerifyReqParams = {
}

type PutRealVerifyReqCookie = {
}

export interface PutRealVerifyRequest extends TypedRequest<
  PutRealVerifyReqBody,
  PutRealVerifyReqQuery,
  PutRealVerifyReqParams,
  PutRealVerifyReqCookie
>{
}

export type PutRealVerifyParams = {
bodyAddress: string,
bodyArea: string,
bodyBirthdate: string,
bodyCity: string,
bodyCountry: string,
bodyEmail: string,
bodyIdCard: string,
bodyIdCardDate: string,
bodyIdCardPosiition: string,
bodyIdCardType: number,
bodyName: string,
}


export const PutRealVerifyRequestConvert = (
    body: PutRealVerifyReqBody,
    query: PutRealVerifyReqQuery,
    path: PutRealVerifyReqParams,
    cookie: PutRealVerifyReqCookie,
): PutRealVerifyParams => {
  return {
    bodyAddress: body.address,
    bodyArea: body.area,
    bodyBirthdate: body.birthdate,
    bodyCity: body.city,
    bodyCountry: body.country,
    bodyEmail: body.email,
    bodyIdCard: body.idCard,
    bodyIdCardDate: body.idCardDate,
    bodyIdCardPosiition: body.idCardPosiition,
    bodyIdCardType: parseInt(body.idCardType),
    bodyName: body.name,
  };
};
type RegisterUserReqBody = {
  captcha: string,
password: string,
passwordCheck: string,
phone: string,
phonePrefix: string,
}

type RegisterUserReqQuery = {
}

type RegisterUserReqParams = {
}

type RegisterUserReqCookie = {
}

export interface RegisterUserRequest extends TypedRequest<
  RegisterUserReqBody,
  RegisterUserReqQuery,
  RegisterUserReqParams,
  RegisterUserReqCookie
>{
}

export type RegisterUserParams = {
bodyCaptcha: string,
bodyPassword: string,
bodyPasswordCheck: string,
bodyPhone: string,
bodyPhonePrefix: string,
}


export const RegisterUserRequestConvert = (
    body: RegisterUserReqBody,
    query: RegisterUserReqQuery,
    path: RegisterUserReqParams,
    cookie: RegisterUserReqCookie,
): RegisterUserParams => {
  return {
    bodyCaptcha: body.captcha,
    bodyPassword: body.password,
    bodyPasswordCheck: body.passwordCheck,
    bodyPhone: body.phone,
    bodyPhonePrefix: body.phonePrefix,
  };
};
type SendPhoneCheckReqBody = {
  }

type SendPhoneCheckReqQuery = {
}

type SendPhoneCheckReqParams = {
}

type SendPhoneCheckReqCookie = {
}

export interface SendPhoneCheckRequest extends TypedRequest<
  SendPhoneCheckReqBody,
  SendPhoneCheckReqQuery,
  SendPhoneCheckReqParams,
  SendPhoneCheckReqCookie
>{
}

export type SendPhoneCheckParams = {
}


export const SendPhoneCheckRequestConvert = (
    body: SendPhoneCheckReqBody,
    query: SendPhoneCheckReqQuery,
    path: SendPhoneCheckReqParams,
    cookie: SendPhoneCheckReqCookie,
): SendPhoneCheckParams => {
  return {
  };
};
type PhoneCheckReqBody = {
  verify: string,
}

type PhoneCheckReqQuery = {
}

type PhoneCheckReqParams = {
}

type PhoneCheckReqCookie = {
}

export interface PhoneCheckRequest extends TypedRequest<
  PhoneCheckReqBody,
  PhoneCheckReqQuery,
  PhoneCheckReqParams,
  PhoneCheckReqCookie
>{
}

export type PhoneCheckParams = {
bodyVerify: string,
}


export const PhoneCheckRequestConvert = (
    body: PhoneCheckReqBody,
    query: PhoneCheckReqQuery,
    path: PhoneCheckReqParams,
    cookie: PhoneCheckReqCookie,
): PhoneCheckParams => {
  return {
    bodyVerify: body.verify,
  };
};
type GetUserMyStatusReqBody = {
  }

type GetUserMyStatusReqQuery = {
}

type GetUserMyStatusReqParams = {
}

type GetUserMyStatusReqCookie = {
}

export interface GetUserMyStatusRequest extends TypedRequest<
  GetUserMyStatusReqBody,
  GetUserMyStatusReqQuery,
  GetUserMyStatusReqParams,
  GetUserMyStatusReqCookie
>{
}

export type GetUserMyStatusParams = {
}


export const GetUserMyStatusRequestConvert = (
    body: GetUserMyStatusReqBody,
    query: GetUserMyStatusReqQuery,
    path: GetUserMyStatusReqParams,
    cookie: GetUserMyStatusReqCookie,
): GetUserMyStatusParams => {
  return {
  };
};
type UpdateOneyUserReqBody = {
  }

type UpdateOneyUserReqQuery = {
}

type UpdateOneyUserReqParams = {
      id: string
,
}

type UpdateOneyUserReqCookie = {
}

export interface UpdateOneyUserRequest extends TypedRequest<
  UpdateOneyUserReqBody,
  UpdateOneyUserReqQuery,
  UpdateOneyUserReqParams,
  UpdateOneyUserReqCookie
>{
}

export type UpdateOneyUserParams = {
      pathId: string
}


export const UpdateOneyUserRequestConvert = (
    body: UpdateOneyUserReqBody,
    query: UpdateOneyUserReqQuery,
    path: UpdateOneyUserReqParams,
    cookie: UpdateOneyUserReqCookie,
): UpdateOneyUserParams => {
  return {
            pathId: path.id,
  };
};


