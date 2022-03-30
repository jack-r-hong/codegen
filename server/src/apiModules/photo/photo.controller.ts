import {Application, Request, Response, NextFunction} from 'express';
import {Controller, Get, Post, Put, Delete, Validator} from '../baseController';
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
      req: Request,
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
}
