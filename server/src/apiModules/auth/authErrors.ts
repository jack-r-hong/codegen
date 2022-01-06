import httpErrors from 'http-errors';

export class WrongPassword extends Error {
  message: string;

  constructor(msg: string) {
    super();
    this.message = msg;
  }
}


export const errorHender = (err: Error) => {
  switch (true) {
    case err instanceof WrongPassword:
      return httpErrors(401);
    default:
      return (err);
  }
};
