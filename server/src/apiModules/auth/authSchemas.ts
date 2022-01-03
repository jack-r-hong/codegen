import { Schema  } from 'express-validator';

export const login: Schema = {
    account: {
        in: ['body'],
        isLength: {
            errorMessage: 'Account should be between 8 and 20 characters',
            options: { min: 7, max:20 },
        },
    },
    password : {
        in: ['body'],
        isLength: {
            errorMessage: 'Password should be between 8 and 20 characters',
            options: { min: 7, max:20 },
        },
        isStrongPassword: {
            errorMessage: 'Your password must include a minimum of three of the following mix of character types: uppercase, lowercase, numbers, and ! @ # $ % ^ & * () <> [] {} | _+-= symbols.',
        }
    },
}
