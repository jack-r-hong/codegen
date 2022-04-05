import {Application} from 'express';
import {AuthController} from './auth/auth.controller';
import {UserController} from './user/user.controller';
import {PhotoController} from './photo/photo.controller';

import {Container} from 'typedi';


const controllers = [
  AuthController,
  UserController,
  PhotoController,
];

export const registerController = (app : Application) => {
  console.log(Container.getMany(''));
  
  // Container.getMany('Controller').forEach((Controller: any) =>{
  //   new Controller(app);
  // });
  controllers.forEach((Controller) =>{
    new Controller(app);
  });
};
