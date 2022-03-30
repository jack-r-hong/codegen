import {Application} from 'express';
import {AuthController} from './auth/auth.controller';
import {UserController} from './user/user.controller';
import {PhotoController} from './photo/photo.controller';


const controllers = [
  AuthController,
  UserController,
  PhotoController,
];

export const registerController = (app : Application) => {
  controllers.forEach((Controller) =>{
    new Controller(app);
  });
};
