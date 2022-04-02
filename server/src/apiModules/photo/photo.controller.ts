import {Application, Response, NextFunction} from 'express';
import {Controller, Get, Post, Put,
Delete, Validator, FormData} from '../baseController';
import {PhotoService, Container} from './photo.service';
import * as photoParams from './photo.parameters';
import * as validSchemas from './photo.validator';

const serviceInstance = Container.get(PhotoService);

@Controller('')
export class PhotoController {
  constructor(private app: Application) {}

  @Get('/photo/:id')
  @Validator(validSchemas.readOnePhotoValidator)
  async readOnePhoto(
      req: photoParams.ReadOnePhotoRequest,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.readOnePhoto(
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
    serviceInstance.updateOnePhoto(
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
  @Get('/photos')
  @Validator(validSchemas.readManyPhotoValidator)
  async readManyPhoto(
      req: photoParams.ReadManyPhotoRequest,
      res: Response,
      next: NextFunction,
  ) {
    serviceInstance.readManyPhoto(
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
    serviceInstance.uploadManyPhoto(
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
    serviceInstance.updateManyPhoto(
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
