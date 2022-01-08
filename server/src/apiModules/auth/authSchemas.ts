import {Schema, CustomValidator} from 'express-validator';

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

const {id, email, password, name, authLevel} = user;

export enum Sequ{
  Desc='desc',
  Asc='asc'
}

export interface FindManyOption {
    skip: number,
    take: number,
    sort?: string,
    sequ?: Sequ
}

const addNullable = (schema:Schema, fields: string[]) => {
  fields.forEach((ele) => {
    schema[ele] = Object.assign({}, schema[ele], {
      optional: {
        options: {
          nullable: true,
        },
      },
    } );
  });
};

export const findManyValidator = (schema :Schema ) =>{
  const isModelField: CustomValidator = (value, {req, location, path}) => {
    const hasField = Object.keys(schema).some((e) =>{
      if (e === value) return true;
      return false;
    });

    if (!hasField) {
      throw Error('Error field.');
    }
    return true;
  };

  const findManyOption:Schema = {
    skip: {
      in: ['query'],
      isInt: true,
    },
    take: {
      in: ['query'],
      isInt: true,
    },
    sort: {
      in: ['query'],
      custom: {
        options: isModelField,
      },
    },
    sequ: {
      in: ['query'],
      matches: {
        options: /^(a|de)sc$/,
      },
    },
  };

  addNullable(findManyOption, ['sort', 'sequ'] );

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

export const updateUser: Schema = (
  () => {
    const schema = {
      id,
      name,
      password,
      authLevel,
    };
    addNullable(schema, ['password', 'name', 'authLevel']);

    return schema;
  }
)();


export const deleteUser: Schema = {
  id,
};

