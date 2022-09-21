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

}
