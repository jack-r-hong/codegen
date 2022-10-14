import {Response, NextFunction} from 'express';
import {Inject, Service, Container} from 'typedi';
import {
  Controller,
  httpMethods,
  middlewareDecorator,
  ControllerToken,
  AppUse,
} from '../baseController';
import {RebateService} from './rebate.service';
import * as rebateParams from './rebate.parameters';
import * as validSchemas from './rebate.validator';

// eslint-disable-next-line no-unused-vars
const {Get, Post, Put, Delete} = httpMethods;
// eslint-disable-next-line no-unused-vars
const {Validator, FormData, limiter} = middlewareDecorator;

@Service({id: ControllerToken, multiple: true})
export class RebateController implements Controller {
  constructor() {}

  static service = Container.get(RebateService);
  @Inject('app.use')
    appUse!: AppUse;

}
