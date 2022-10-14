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


type GetUserBackstageAgentsReqBody = {
  }

type GetUserBackstageAgentsReqQuery = {
      orderBy: string
      orderByField: string
      page: string
      take: string
}

type GetUserBackstageAgentsReqParams = {
}

type GetUserBackstageAgentsReqCookie = {
}

export interface GetUserBackstageAgentsRequest extends TypedRequest<
  GetUserBackstageAgentsReqBody,
  GetUserBackstageAgentsReqQuery,
  GetUserBackstageAgentsReqParams,
  GetUserBackstageAgentsReqCookie
>{
}

export type GetUserBackstageAgentsParams = {
      queryOrderBy: string
      queryOrderByField: string
      queryPage: number
      queryTake: number
}


export const GetUserBackstageAgentsRequestConvert = (
    body: GetUserBackstageAgentsReqBody,
    query: GetUserBackstageAgentsReqQuery,
    path: GetUserBackstageAgentsReqParams,
    cookie: GetUserBackstageAgentsReqCookie,
): GetUserBackstageAgentsParams => {
  return {
            queryOrderBy: query.orderBy,
            queryOrderByField: query.orderByField,
          queryPage: parseInt(query.page),
          queryTake: parseInt(query.take),
  };
};
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
            address: number,
          addressResonId: number|undefined,
          area: number,
          areaResonId: number|undefined,
          birthdate: number,
          birthdateResonId: number|undefined,
          city: number,
          cityResonId: number|undefined,
          country: number,
          countryResonId: number|undefined,
          gameUid: number,
          gameUidResonId: number|undefined,
          idCard: number,
          idCardDate: number,
          idCardDateResonId: number|undefined,
          idCardPhoto: number,
          idCardPhotoResonId: number|undefined,
          idCardPosiition: number,
          idCardPosiitionResonId: number|undefined,
          idCardResonId: number|undefined,
          idCardType: number,
          idCardTypeResonId: number|undefined,
          lineId: number,
          lineIdResonId: number|undefined,
          name: number,
          nameResonId: number|undefined,
          selfie: number,
          selfieResonId: number|undefined,
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
bodyArea: number,
bodyAreaResonId: number|undefined,
bodyBirthdate: number,
bodyBirthdateResonId: number|undefined,
bodyCity: number,
bodyCityResonId: number|undefined,
bodyCountry: number,
bodyCountryResonId: number|undefined,
bodyGameUid: number,
bodyGameUidResonId: number|undefined,
bodyIdCard: number,
bodyIdCardDate: number,
bodyIdCardDateResonId: number|undefined,
bodyIdCardPhoto: number,
bodyIdCardPhotoResonId: number|undefined,
bodyIdCardPosiition: number,
bodyIdCardPosiitionResonId: number|undefined,
bodyIdCardResonId: number|undefined,
bodyIdCardType: number,
bodyIdCardTypeResonId: number|undefined,
bodyLineId: number,
bodyLineIdResonId: number|undefined,
bodyName: number,
bodyNameResonId: number|undefined,
bodySelfie: number,
bodySelfieResonId: number|undefined,
}


export const UpdateBackstageUserRequestConvert = (
    body: UpdateBackstageUserReqBody,
    query: UpdateBackstageUserReqQuery,
    path: UpdateBackstageUserReqParams,
    cookie: UpdateBackstageUserReqCookie,
): UpdateBackstageUserParams => {
  return {
      pathId: path.id,
    bodyAddress: body.address,
    bodyAddressResonId: typeof body.addressResonId === 'number' ? body.addressResonId : undefined,
    bodyArea: body.area,
    bodyAreaResonId: typeof body.areaResonId === 'number' ? body.areaResonId : undefined,
    bodyBirthdate: body.birthdate,
    bodyBirthdateResonId: typeof body.birthdateResonId === 'number' ? body.birthdateResonId : undefined,
    bodyCity: body.city,
    bodyCityResonId: typeof body.cityResonId === 'number' ? body.cityResonId : undefined,
    bodyCountry: body.country,
    bodyCountryResonId: typeof body.countryResonId === 'number' ? body.countryResonId : undefined,
    bodyGameUid: body.gameUid,
    bodyGameUidResonId: typeof body.gameUidResonId === 'number' ? body.gameUidResonId : undefined,
    bodyIdCard: body.idCard,
    bodyIdCardDate: body.idCardDate,
    bodyIdCardDateResonId: typeof body.idCardDateResonId === 'number' ? body.idCardDateResonId : undefined,
    bodyIdCardPhoto: body.idCardPhoto,
    bodyIdCardPhotoResonId: typeof body.idCardPhotoResonId === 'number' ? body.idCardPhotoResonId : undefined,
    bodyIdCardPosiition: body.idCardPosiition,
    bodyIdCardPosiitionResonId: typeof body.idCardPosiitionResonId === 'number' ? body.idCardPosiitionResonId : undefined,
    bodyIdCardResonId: typeof body.idCardResonId === 'number' ? body.idCardResonId : undefined,
    bodyIdCardType: body.idCardType,
    bodyIdCardTypeResonId: typeof body.idCardTypeResonId === 'number' ? body.idCardTypeResonId : undefined,
    bodyLineId: body.lineId,
    bodyLineIdResonId: typeof body.lineIdResonId === 'number' ? body.lineIdResonId : undefined,
    bodyName: body.name,
    bodyNameResonId: typeof body.nameResonId === 'number' ? body.nameResonId : undefined,
    bodySelfie: body.selfie,
    bodySelfieResonId: typeof body.selfieResonId === 'number' ? body.selfieResonId : undefined,
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
type UpdateUserStatusOrRemarkOrRebateReqBody = {
            level: number|undefined,
          rebate: number|undefined,
          remark: string|undefined,
}

type UpdateUserStatusOrRemarkOrRebateReqQuery = {
}

type UpdateUserStatusOrRemarkOrRebateReqParams = {
      id: string
,
}

type UpdateUserStatusOrRemarkOrRebateReqCookie = {
}

export interface UpdateUserStatusOrRemarkOrRebateRequest extends TypedRequest<
  UpdateUserStatusOrRemarkOrRebateReqBody,
  UpdateUserStatusOrRemarkOrRebateReqQuery,
  UpdateUserStatusOrRemarkOrRebateReqParams,
  UpdateUserStatusOrRemarkOrRebateReqCookie
>{
}

export type UpdateUserStatusOrRemarkOrRebateParams = {
      pathId: string
bodyLevel: number|undefined,
bodyRebate: number|undefined,
bodyRemark: string|undefined,
}


export const UpdateUserStatusOrRemarkOrRebateRequestConvert = (
    body: UpdateUserStatusOrRemarkOrRebateReqBody,
    query: UpdateUserStatusOrRemarkOrRebateReqQuery,
    path: UpdateUserStatusOrRemarkOrRebateReqParams,
    cookie: UpdateUserStatusOrRemarkOrRebateReqCookie,
): UpdateUserStatusOrRemarkOrRebateParams => {
  return {
      pathId: path.id,
    bodyLevel: typeof body.level === 'number' ? body.level : undefined,
    bodyRebate: body.rebate,
    bodyRemark: body.remark,
  };
};
type ReadBackstageUserTransactionReqBody = {
  }

type ReadBackstageUserTransactionReqQuery = {
      orderBy: string
      orderByField: string
      page: string
      take: string
      start_time: string
      end_time: string
}

type ReadBackstageUserTransactionReqParams = {
      id: string
,
}

type ReadBackstageUserTransactionReqCookie = {
}

export interface ReadBackstageUserTransactionRequest extends TypedRequest<
  ReadBackstageUserTransactionReqBody,
  ReadBackstageUserTransactionReqQuery,
  ReadBackstageUserTransactionReqParams,
  ReadBackstageUserTransactionReqCookie
>{
}

export type ReadBackstageUserTransactionParams = {
      pathId: string
      queryOrderBy: string
      queryOrderByField: string
      queryPage: number
      queryTake: number
      queryStartTime: string
      queryEndTime: string
}


export const ReadBackstageUserTransactionRequestConvert = (
    body: ReadBackstageUserTransactionReqBody,
    query: ReadBackstageUserTransactionReqQuery,
    path: ReadBackstageUserTransactionReqParams,
    cookie: ReadBackstageUserTransactionReqCookie,
): ReadBackstageUserTransactionParams => {
  return {
            pathId: path.id,
            queryOrderBy: query.orderBy,
            queryOrderByField: query.orderByField,
          queryPage: parseInt(query.page),
          queryTake: parseInt(query.take),
            queryStartTime: query.start_time,
            queryEndTime: query.end_time,
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
type ForgetPasswordPhoneCheckReqBody = {
            phone: string,
          phonePrefix: string,
}

type ForgetPasswordPhoneCheckReqQuery = {
}

type ForgetPasswordPhoneCheckReqParams = {
}

type ForgetPasswordPhoneCheckReqCookie = {
}

export interface ForgetPasswordPhoneCheckRequest extends TypedRequest<
  ForgetPasswordPhoneCheckReqBody,
  ForgetPasswordPhoneCheckReqQuery,
  ForgetPasswordPhoneCheckReqParams,
  ForgetPasswordPhoneCheckReqCookie
>{
}

export type ForgetPasswordPhoneCheckParams = {
bodyPhone: string,
bodyPhonePrefix: string,
}


export const ForgetPasswordPhoneCheckRequestConvert = (
    body: ForgetPasswordPhoneCheckReqBody,
    query: ForgetPasswordPhoneCheckReqQuery,
    path: ForgetPasswordPhoneCheckReqParams,
    cookie: ForgetPasswordPhoneCheckReqCookie,
): ForgetPasswordPhoneCheckParams => {
  return {
    bodyPhone: body.phone,
    bodyPhonePrefix: body.phonePrefix,
  };
};
type ForgetPasswordPhoneCheckVerifyReqBody = {
            verify: string,
}

type ForgetPasswordPhoneCheckVerifyReqQuery = {
}

type ForgetPasswordPhoneCheckVerifyReqParams = {
}

type ForgetPasswordPhoneCheckVerifyReqCookie = {
}

export interface ForgetPasswordPhoneCheckVerifyRequest extends TypedRequest<
  ForgetPasswordPhoneCheckVerifyReqBody,
  ForgetPasswordPhoneCheckVerifyReqQuery,
  ForgetPasswordPhoneCheckVerifyReqParams,
  ForgetPasswordPhoneCheckVerifyReqCookie
>{
}

export type ForgetPasswordPhoneCheckVerifyParams = {
bodyVerify: string,
}


export const ForgetPasswordPhoneCheckVerifyRequestConvert = (
    body: ForgetPasswordPhoneCheckVerifyReqBody,
    query: ForgetPasswordPhoneCheckVerifyReqQuery,
    path: ForgetPasswordPhoneCheckVerifyReqParams,
    cookie: ForgetPasswordPhoneCheckVerifyReqCookie,
): ForgetPasswordPhoneCheckVerifyParams => {
  return {
    bodyVerify: body.verify,
  };
};
type ForgetPasswordResetReqBody = {
            password: string,
          passwordCheck: string,
}

type ForgetPasswordResetReqQuery = {
}

type ForgetPasswordResetReqParams = {
}

type ForgetPasswordResetReqCookie = {
}

export interface ForgetPasswordResetRequest extends TypedRequest<
  ForgetPasswordResetReqBody,
  ForgetPasswordResetReqQuery,
  ForgetPasswordResetReqParams,
  ForgetPasswordResetReqCookie
>{
}

export type ForgetPasswordResetParams = {
bodyPassword: string,
bodyPasswordCheck: string,
}


export const ForgetPasswordResetRequestConvert = (
    body: ForgetPasswordResetReqBody,
    query: ForgetPasswordResetReqQuery,
    path: ForgetPasswordResetReqParams,
    cookie: ForgetPasswordResetReqCookie,
): ForgetPasswordResetParams => {
  return {
    bodyPassword: body.password,
    bodyPasswordCheck: body.passwordCheck,
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
type LogoutUserReqBody = {
  }

type LogoutUserReqQuery = {
}

type LogoutUserReqParams = {
}

type LogoutUserReqCookie = {
}

export interface LogoutUserRequest extends TypedRequest<
  LogoutUserReqBody,
  LogoutUserReqQuery,
  LogoutUserReqParams,
  LogoutUserReqCookie
>{
}

export type LogoutUserParams = {
}


export const LogoutUserRequestConvert = (
    body: LogoutUserReqBody,
    query: LogoutUserReqQuery,
    path: LogoutUserReqParams,
    cookie: LogoutUserReqCookie,
): LogoutUserParams => {
  return {
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
                order: string,
        }[],
          birthdate: string,
          city: string,
          country: string,
          gameUid: string,
          idCard: string,
          idCardDate: string,
          idCardPosiition: string,
          idCardType: number,
          lineId: string,
          linePay: string,
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
            bodyOrder: number,
        }[],
bodyBirthdate: string,
bodyCity: string,
bodyCountry: string,
bodyGameUid: string,
bodyIdCard: string,
bodyIdCardDate: string,
bodyIdCardPosiition: string,
bodyIdCardType: number,
bodyLineId: string,
bodyLinePay: string,
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
        bodyAccount: body.account,
        bodyCode: body.code,
        bodyName: body.name,
        bodyOrder: body.order,
      };
    }),
    bodyBirthdate: body.birthdate,
    bodyCity: body.city,
    bodyCountry: body.country,
    bodyGameUid: body.gameUid,
    bodyIdCard: body.idCard,
    bodyIdCardDate: body.idCardDate,
    bodyIdCardPosiition: body.idCardPosiition,
    bodyIdCardType: body.idCardType,
    bodyLineId: body.lineId,
    bodyLinePay: body.linePay,
    bodyName: body.name,
  };
};
type RegisterUserReqBody = {
            captcha: string,
          password: string,
          passwordCheck: string,
          phone: string,
          phoneCaptcha: string,
          promoteCode: string,
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
bodyPhoneCaptcha: string,
bodyPromoteCode: string,
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
    bodyPhoneCaptcha: body.phoneCaptcha,
    bodyPromoteCode: body.promoteCode,
  };
};
type PhoneCheckReqBody = {
            phone: string,
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
bodyPhone: string,
}


export const PhoneCheckRequestConvert = (
    body: PhoneCheckReqBody,
    query: PhoneCheckReqQuery,
    path: PhoneCheckReqParams,
    cookie: PhoneCheckReqCookie,
): PhoneCheckParams => {
  return {
    bodyPhone: body.phone,
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


