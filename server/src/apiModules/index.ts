import {Application} from 'express';
import {AuthController} from './auth/auth.controller';
import {UserController} from './user/user.controller';

const controllers = [
  AuthController,
  UserController,
];


export const registerController = (app : Application) => {
  controllers.forEach((Controller) =>{
    new Controller(app);
  });
};
