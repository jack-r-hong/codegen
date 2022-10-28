import {Response, NextFunction} from 'express';
import {Inject, Service, Container} from 'typedi';
import {
  Controller,
  httpMethods,
  middlewareDecorator,
  ControllerToken,
  AppUse,
} from '../baseController';
import {ChatroomService} from './chatroom.service';
import * as chatroomParams from './chatroom.parameters';
import * as validSchemas from './chatroom.validator';

// eslint-disable-next-line no-unused-vars
const {Get, Post, Put, Delete} = httpMethods;
// eslint-disable-next-line no-unused-vars
const {Validator, FormData, limiter} = middlewareDecorator;

@Service({id: ControllerToken, multiple: true})
export class ChatroomController implements Controller {
  constructor() {}

  static service = Container.get(ChatroomService);
  @Inject('app.use')
    appUse!: AppUse;

  @Post('/chatroom/transaction/service/token')
  @Validator(validSchemas.transactionServiceTokenValidator)
  // custom begin transactionServiceTokenDecorator

  // custom end transactionServiceTokenDecorator
  async transactionServiceToken(
      req: chatroomParams.TransactionServiceTokenRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin transactionServiceTokenCheck

    // custom end transactionServiceTokenCheck
    ChatroomController.service.transactionServiceToken(
        chatroomParams.TransactionServiceTokenRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin transactionServiceToken
          res.json(result);

          // custom end transactionServiceToken
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/chatroom/transaction/token')
  @Validator(validSchemas.transactionTokenValidator)
  // custom begin transactionTokenDecorator

  // custom end transactionTokenDecorator
  async transactionToken(
      req: chatroomParams.TransactionTokenRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin transactionTokenCheck

    // custom end transactionTokenCheck
    ChatroomController.service.transactionToken(
        chatroomParams.TransactionTokenRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin transactionToken
          res.json(result);

          // custom end transactionToken
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/chatroom/user/token')
  @Validator(validSchemas.userTokenValidator)
  // custom begin userTokenDecorator

  // custom end userTokenDecorator
  async userToken(
      req: chatroomParams.UserTokenRequest,
      res: Response,
      next: NextFunction,
  ) {
    // custom begin userTokenCheck

    // custom end userTokenCheck
    ChatroomController.service.userToken(
        chatroomParams.UserTokenRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin userToken
          res.json(result);

          // custom end userToken
        }).catch((e) => {
          next(e);
        });
  }
}
