import {Request, Response, Application, NextFunction} from 'express';
import {errorHender} from './authErrors';
import {Controller, Get, Post, Put, Delete, Validator} from '../baseController';
import * as validSchemas from './authSchemas';
import {AuthService, Container} from './authService';

const authServiceInstance = Container.get(AuthService);

@Controller('/auth')
export class AuthController {
  constructor(private app: Application) {}

    @Validator(validSchemas.getUsers)
    @Get('/user')
  async findUsers(req: Request, res: Response, next: NextFunction) {
    const {type, skip, take, cursorField, cursor} = req.query;

    const param : validSchemas.FindManyOption={
      type: <string>type,
      skip: parseInt(<string>skip),
      take: parseInt(<string>take),
      // orderBy: <string>type,
      cursorField: cursorField ? <string>cursorField: undefined,
      cursor: cursor ? parseInt(<string>cursor) : undefined,
    };

    authServiceInstance.findUsers(param)
        .then((result) =>{
          res.json(result);
        })
        .catch((e) => {
          next(errorHender(e));
        });
  }

    @Validator(validSchemas.getUser)
    @Get('/user/:id')
    async findUser(req: Request, res: Response, next: NextFunction) {
      const id = parseInt(req.params.id);

      authServiceInstance.findUser(id)
          .then((result) =>{
            res.json(result);
          })
          .catch((e) => {
            next(errorHender(e));
          });
    }

    @Validator(validSchemas.createUser)
    @Post('/user')
    async createUser(req: Request, res: Response, next: NextFunction) {
      const {email, password, name} = req.body;
      authServiceInstance.createUser([email, password, name])
          .then((result) =>{
            res.status(201);
            res.json(result);
          })
          .catch((e) => {
            next(errorHender(e));
          });
    }

    @Validator(validSchemas.updateUser)
    @Put('/user/:id')
    async updateUser(req: Request, res: Response, next: NextFunction) {
      const [password, name]: string[] = req.body;
      const id = parseInt(req.params.id);

      authServiceInstance.updateUser(id, [password, name])
          .then((result) =>{
            res.json(result);
          })
          .catch((e) => {
            next(errorHender(e));
          });
    }

    @Validator(validSchemas.deleteUser)
    @Delete('/user/:id')
    async deleteUser(req: Request, res: Response, next: NextFunction) {
      const id = parseInt(req.params.id);
      authServiceInstance.deleteUser(id)
          .then((result) =>{
            res.json(result);
          })
          .catch((e) => {
            next(errorHender(e));
          });
    }

    @Validator(validSchemas.login)
    @Post('/login')
    login(req: Request, res: Response, next: NextFunction) {
      const {email, password} = req.body;

      authServiceInstance.login(email, password)
          .then((result) =>{
            res.json(result);
          })
          .catch((e) => {
            next(errorHender(e));
          });
    }
}
