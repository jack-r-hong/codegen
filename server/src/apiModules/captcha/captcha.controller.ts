import {Response, NextFunction} from 'express';
import {Inject, Service, Container} from 'typedi';
import {
  Controller,
  httpMethods,
  middlewareDecorator,
  ControllerToken,
  AppUse,
} from '../baseController';
import {CaptchaService} from './captcha.service';
import * as captchaParams from './captcha.parameters';
import * as validSchemas from './captcha.validator';

// eslint-disable-next-line no-unused-vars
const {Get, Post, Put, Delete} = httpMethods;
// eslint-disable-next-line no-unused-vars
const {Validator, FormData, limiter} = middlewareDecorator;

@Service({id: ControllerToken, multiple: true})
export class CaptchaController implements Controller {
  constructor() {}

  static service = Container.get(CaptchaService);
  @Inject('app.use')
    appUse!: AppUse;

}
