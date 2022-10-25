import httpErrors from 'http-errors';
import {Prisma} from '@prisma/client';
import {Result} from 'express-validator';
import {Request, Response, NextFunction} from 'express';
import * as responseErrors from './responseErrors';

class CodeError extends Error {
  status: number;
  code: number;
  constructor(message?: string, status?: number, code?: number) {
    super(message);
    this.name = 'CodeError';
    this.status = status??500;
    this.code = code??0;
  }
}

export const errors = Object.assign(
    responseErrors,
    {
      CodeError,
    },
);

export const errorHandle = (
    err :httpErrors.HttpError | Result | Prisma.PrismaClientKnownRequestError,
    req :Request,
    res:Response,
    next: NextFunction,
) => {
  // if env = dev
  console.log(err);


  const error = (() => {
    if (err instanceof responseErrors.ResponsError) {
      return err;
    }
    if (err instanceof Result) {
      const {value, param, location, msg} = err.array({
        onlyFirstError: true,
      })[0];

      if (
        param === 'JSESSIONID' &&
        msg === 'User is not authorized' &&
        location === 'cookies'
      ) {
        return errors.UserNotAuthorized;
      }

      return Object.assign(responseErrors.BadRequest, {
        detail: {
          value,
          param,
          location,
          msg,
        },
      });
    }

    if ( err instanceof Prisma.PrismaClientKnownRequestError) {
      return responseErrors.ServerError;
    }
    return responseErrors.ServerError;
  })();


  res.status(error.status);
  res.send({
    status: error.status,
    message: error.message,
    code: error.code,
    cnMsg: error.cnMsg,
    detail: (error as any).detail,

  });
};

const prismaDBErrorHender = (err: Prisma.PrismaClientKnownRequestError) => {
  console.log('db error', err);
  switch (err.code) {
    case 'P2002':
      return httpErrors(409);
    case 'P2003':
      return httpErrors(403);
    case 'P2011':
      return httpErrors(409);
    case 'P2025':
      return httpErrors(404);
    default:
      return httpErrors(500);
  }
};
