import {Response, NextFunction} from 'express';
import {Inject, Service, Container} from 'typedi';
import {
  Controller,
  httpMethods,
  middlewareDecorator,
  ControllerToken,
  AppUse,
} from '../baseController';
import {PhotoService} from './photo.service';
import * as photoParams from './photo.parameters';
import * as validSchemas from './photo.validator';

// eslint-disable-next-line no-unused-vars
const {Get, Post, Put, Delete} = httpMethods;
// eslint-disable-next-line no-unused-vars
const {Validator, FormData, limiter} = middlewareDecorator;

@Service({id: ControllerToken, multiple: true})
export class PhotoController implements Controller {
  constructor() {}

  static service = Container.get(PhotoService);
  @Inject('app.use')
    appUse!: AppUse;

  @Get('/admin/photos')
  @Validator(validSchemas.readManyAdminPhotoValidator)
  async readManyAdminPhoto(
      req: photoParams.ReadManyAdminPhotoRequest,
      res: Response,
      next: NextFunction,
  ) {
    PhotoController.service.readManyAdminPhoto(
        photoParams.ReadManyAdminPhotoRequestConvert(
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
  @Get('/photo/:id')
  @Validator(validSchemas.readOnePhotoValidator)
  async readOnePhoto(
      req: photoParams.ReadOnePhotoRequest,
      res: Response,
      next: NextFunction,
  ) {
    PhotoController.service.readOnePhoto(
        photoParams.ReadOnePhotoRequestConvert(
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
  @Put('/photo/:id')
  @Validator(validSchemas.updateOnePhotoValidator)
  async updateOnePhoto(
      req: photoParams.UpdateOnePhotoRequest,
      res: Response,
      next: NextFunction,
  ) {
    PhotoController.service.updateOnePhoto(
        photoParams.UpdateOnePhotoRequestConvert(
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
  @Delete('/photos')
  @Validator(validSchemas.deleteManyPhotoValidator)
  async deleteManyPhoto(
      req: photoParams.DeleteManyPhotoRequest,
      res: Response,
      next: NextFunction,
  ) {
    PhotoController.service.deleteManyPhoto(
        photoParams.DeleteManyPhotoRequestConvert(
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
  @Get('/photos')
  @Validator(validSchemas.readManyPhotoValidator)
  async readManyPhoto(
      req: photoParams.ReadManyPhotoRequest,
      res: Response,
      next: NextFunction,
  ) {
    PhotoController.service.readManyPhoto(
        photoParams.ReadManyPhotoRequestConvert(
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
  @Post('/photos')
  @Validator(validSchemas.uploadManyPhotoValidator)
  @FormData()
  async uploadManyPhoto(
      req: photoParams.UploadManyPhotoRequest,
      res: Response,
      next: NextFunction,
  ) {
    PhotoController.service.uploadManyPhoto(
        photoParams.UploadManyPhotoRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
        req.files as Express.Multer.File[],
    )
        .then((result) =>{
          res.json(result);
        }).catch((e) => {
          next(e);
        });
  }
  @Put('/photos')
  @Validator(validSchemas.updateManyPhotoValidator)
  async updateManyPhoto(
      req: photoParams.UpdateManyPhotoRequest,
      res: Response,
      next: NextFunction,
  ) {
    PhotoController.service.updateManyPhoto(
        photoParams.UpdateManyPhotoRequestConvert(
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
  @Get('/photos/inids')
  @Validator(validSchemas.findManyInIdsPhotoValidator)
  async findManyInIdsPhoto(
      req: photoParams.FindManyInIdsPhotoRequest,
      res: Response,
      next: NextFunction,
  ) {
    PhotoController.service.findManyInIdsPhoto(
        photoParams.FindManyInIdsPhotoRequestConvert(
            req.body,
            req.query,
            req.params,
            req.cookies,
        ),
        req.session,
    )
        .then((result) =>{
          // custom begin findManyInIdsPhoto

          // custom end findManyInIdsPhoto
        }).catch((e) => {
          next(e);
        });
  }
}
