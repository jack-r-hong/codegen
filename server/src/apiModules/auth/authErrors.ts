import httpErrors from 'http-errors';
import {Prisma} from '@prisma/client';

export class WrongPassword extends Error {
  message: string;

  constructor(msg: string) {
    super();
    this.message = msg;
  }
}


export const errorHender = (err: Error |
  Prisma.PrismaClientKnownRequestError) => {
  switch (true) {
    case err instanceof WrongPassword:
      return httpErrors(401);
    case err.message === 'Duplicate email':
      return httpErrors(409);
    case err instanceof Prisma.PrismaClientKnownRequestError:
      return httpErrors(404);
    default:
      return (err);
  }
};
