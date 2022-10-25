import httpErrors from 'http-errors';
import {Prisma} from '@prisma/client';
import {Result} from 'express-validator';
import {Request, Response, NextFunction} from 'express';
import * as responseErrors from './responseErrors';


class WrongPasswordError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'WrongPasswordError';
  }
}

class NotFindError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'NotFindError';
  }
}
class DuplicateUniqueField extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'DuplicateUniqueField';
  }
}

class AuthenticationFailedError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'AuthenticationFailedError';
  }
}

class LoginFailError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'LoginFailError';
  }
}

class CaptchaError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'CaptchaError';
  }
}

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
      WrongPasswordError,
      NotFindError,
      DuplicateUniqueField,
      AuthenticationFailedError,
      LoginFailError,
      CaptchaError,
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
    switch (true) {
      case err instanceof Result:
        if (err instanceof Result) {
          const {param, location, msg} = err.array({
            onlyFirstError: true,
          })[0];

          if (
            param === 'JSESSIONID' &&
            msg === 'AuthenticationFailed' &&
            location === 'cookies'
          ) {
            const e = httpErrors(403);
            e.cause = -2001;
            e.message = 'cookies expired';
            return e;
          }
        }

        return httpErrors(400);
      case err instanceof CaptchaError:
        return httpErrors(401);
      case err instanceof WrongPasswordError:
        return httpErrors(401);
      case err instanceof LoginFailError:
        return httpErrors(401);
      case err instanceof AuthenticationFailedError:
        return httpErrors(403);
      case err instanceof NotFindError:
        return httpErrors(404);
      case err instanceof DuplicateUniqueField:
        return httpErrors(409);
      case err instanceof Prisma.PrismaClientKnownRequestError:
        return prismaDBErrorHender(<Prisma.PrismaClientKnownRequestError> err);
      case err instanceof CodeError:
        if (err instanceof CodeError ) {
          const e = httpErrors(err.status);
          e.cause = err.code;
          e.message = err.message;
          return e;
        }
      default:
        return httpErrors(500);
    }
  })();

  res.status(error.statusCode);
  res.send({
    status: error.statusCode,
    message: error.message,
    code: error.cause,
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
