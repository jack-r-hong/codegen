import {Response, NextFunction} from 'express';
import {Inject, Service, Container} from 'typedi';
import {
  Controller,
  httpMethods,
  middlewareDecorator,
  ControllerToken,
  AppUse,
} from '../baseController';
import {NotifyService} from './notify.service';
import * as notifyParams from './notify.parameters';
import * as validSchemas from './notify.validator';

// eslint-disable-next-line no-unused-vars
const {Get, Post, Put, Delete} = httpMethods;
// eslint-disable-next-line no-unused-vars
const {Validator, FormData, limiter} = middlewareDecorator;

@Service({id: ControllerToken, multiple: true})
export class NotifyController implements Controller {
  constructor() {}

  static service = Container.get(NotifyService);
  @Inject('app.use')
    appUse!: AppUse;

  @Get('/notify')
  @Validator(validSchemas.readManyNotifyValidator)
  async readManyNotify(
      req: notifyParams.ReadManyNotifyRequest,
      res: Response,
      next: NextFunction,
  ) {
    NotifyController.service.readManyNotify(
        notifyParams.ReadManyNotifyRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          res.json(result);
        }).catch((e) => {
          next(e);
        });
  }
  @Post('/notify')
  @Validator(validSchemas.createOneNotifyValidator)
  async createOneNotify(
      req: notifyParams.CreateOneNotifyRequest,
      res: Response,
      next: NextFunction,
  ) {
    NotifyController.service.createOneNotify(
        notifyParams.CreateOneNotifyRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          res.json(result);
        }).catch((e) => {
          next(e);
        });
  }
  @Put('/notify')
  @Validator(validSchemas.updateManyNotifyValidator)
  async updateManyNotify(
      req: notifyParams.UpdateManyNotifyRequest,
      res: Response,
      next: NextFunction,
  ) {
    NotifyController.service.updateManyNotify(
        notifyParams.UpdateManyNotifyRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          res.json(result);
        }).catch((e) => {
          next(e);
        });
  }
}
