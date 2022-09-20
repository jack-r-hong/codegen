import {Response, NextFunction} from 'express';
import {Inject, Service, Container} from 'typedi';
import {
  Controller,
  httpMethods,
  middlewareDecorator,
  ControllerToken,
  AppUse,
} from '../baseController';
import {TransactionChatroomService} from './transactionChatroom.service';
import * as transactionChatroomParams from './transactionChatroom.parameters';
import * as validSchemas from './transactionChatroom.validator';

// eslint-disable-next-line no-unused-vars
const {Get, Post, Put, Delete} = httpMethods;
// eslint-disable-next-line no-unused-vars
const {Validator, FormData, limiter} = middlewareDecorator;

@Service({id: ControllerToken, multiple: true})
export class TransactionChatroomController implements Controller {
  constructor() {}

  static service = Container.get(TransactionChatroomService);
  @Inject('app.use')
    appUse!: AppUse;

}
