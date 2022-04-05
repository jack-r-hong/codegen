import {Application, Response, NextFunction} from 'express';
import {Inject, Service} from 'typedi';
import {
  Controller,
  httpMethods,
  middlewareDecorator,
} from '../baseController';
import {PhotoService} from './photo.service';
import * as photoParams from './photo.parameters';
import * as validSchemas from './photo.validator';

const {Get, Post, Put, Delete} = httpMethods;
const {Validator, FormData, limiter} = middlewareDecorator;

@Service('Controller')
@Controller('')
export class PhotoController {
  constructor(private app: Application) {}

  @Inject()
    service!: PhotoService;

  @Get('/photo/:id')
  @Validator(validSchemas.readOnePhotoValidator)
  async readOnePhoto(
      req: photoParams.ReadOnePhotoRequest,
      res: Response,
      next: NextFunction,
  ) {
    this.service.readOnePhoto(
        photoParams.ReadOnePhotoRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
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
    this.service.updateOnePhoto(
        photoParams.UpdateOnePhotoRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
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
    this.service.deleteManyPhoto(
        photoParams.DeleteManyPhotoRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
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
    this.service.readManyPhoto(
        photoParams.ReadManyPhotoRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
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
    this.service.uploadManyPhoto(
        photoParams.UploadManyPhotoRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
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
    this.service.updateManyPhoto(
        photoParams.UpdateManyPhotoRequestConvert(
            req.body,
            req.query,
            req.params,
        ),
    )
        .then((result) =>{
          res.json(result);
        }).catch((e) => {
          next(e);
        });
  }
}
