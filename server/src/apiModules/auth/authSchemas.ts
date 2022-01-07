import {Schema, ParamSchema} from 'express-validator';

const user: Schema = {
  id: {
    in: ['params'],
    isInt: true,
    toInt: true,

  },
  email: {
    in: ['body'],
    isEmail: {
      errorMessage: 'Email is not in the correct format.',
    },
  },
  password: {
    in: ['body'],
    isLength: {
      errorMessage: 'Password should be between 8 and 20 characters',
      options: {min: 7, max: 20},
    },
    isStrongPassword: {
      errorMessage: `
        Your password must include a minimum of three of the 
        following mix of character types: uppercase, 
        lowercase, numbers, and ! @ # $ % ^ & * () <> [] {} | _+-= symbols.
      `,
    },
  },
  name: {
    in: ['body'],
    isLength: {
      errorMessage: 'Name should be between 2 and 20 characters.',
      options: {min: 2, max: 20},
    },
  },
  authLevel: {
    in: ['body'],
    isInt: true,
    toInt: true,
  },
};

export interface FindManyOption {
    type: string,
    skip: number,
    take: number,
    // orderBy?: Object,
    cursorField?: string;
    cursor? :number
}

enum FindManyType{
    offset='offset',
    cursor='cursor'
}

const {id, email, password, name, authLevel} = user;

export const findManyValidator = (schema :Schema ) =>{
  const findManyOption:Schema = {
    type: {
      in: ['query'],
      matches: {
        options: /^(offset|cursor)$/,
        errorMessage: 'Please input offset of cursor.',
      },
    },
    skip: {
      in: ['query'],
      isInt: true,
    },
    take: {
      in: ['query'],
      isInt: true,
    },
    // orderBy: {
    //     in: ['query']
    // },
    cursorField: {
      in: ['query'],
      custom: {
        options: (value, {req, location, path}) => {
          const {type} = <any>req.query;

          if (type === FindManyType.cursor) {
            if (
              Object.keys(schema).some((e) =>{
                if (e === value) return true;
                return false;
              })
            ) {
              throw Error('Error field.');
            }
          } else {
            return 'offset';
          }

          return true;
        },
      },
    },
  };
  return findManyOption;
};


export const login: Schema = {
  email,
  password,
};

export const createUser: Schema = {
  email,
  password,
  name,
};

export const getUser: Schema = {
  id,
};

export const getUsers: Schema = findManyValidator(user);

export const updateUser: Schema = {
  id,
  name,
  password,
  // authLevel,
};

export const deleteUser: Schema = {
  id,
};

