import httpErrors from 'http-errors';
import {Prisma} from '@prisma/client';

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

export const authErrors = {
  WrongPasswordError,
  NotFindError,
  DuplicateUniqueField,
};


export const errorHender = (err: Error |
  Prisma.PrismaClientKnownRequestError) => {
  switch (true) {
    case err instanceof WrongPasswordError:
      return httpErrors(401);
    case err instanceof DuplicateUniqueField:
      return httpErrors(409);
    case err instanceof NotFindError:
      return httpErrors(404);
    case err instanceof Prisma.PrismaClientKnownRequestError:
      return httpErrors(404);

    default:
      return (err);
  }
};
