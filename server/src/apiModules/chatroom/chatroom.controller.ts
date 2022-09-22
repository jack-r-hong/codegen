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

  @Post('/chatroom/service/token')
  @Validator(validSchemas.serviceTokenValidator)
  async serviceToken(
      req: chatroomParams.ServiceTokenRequest,
      res: Response,
      next: NextFunction,
  ) {
    ChatroomController.service.serviceToken(
        chatroomParams.ServiceTokenRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin serviceToken
          res.json(result);

          // custom end serviceToken
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/chatroom/transaction/token')
  @Validator(validSchemas.transactionTokenValidator)
  async transactionToken(
      req: chatroomParams.TransactionTokenRequest,
      res: Response,
      next: NextFunction,
  ) {
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
}
