import {Service, Inject} from 'typedi';
import {PhotoModel} from './photo.model';
import * as requestTypes from './photo.parameters';
import {errors} from '../../errors';
// custom begin import
import fs from 'fs';

// custom end import


@Service()
export class PhotoService {
  @Inject()
  private photoModel!: PhotoModel;

  async readOnePhoto(
      param :requestTypes.ReadOnePhotoParams,
      session: Express.Request['session'],
  ) {
    // custom begin readOnePhoto

    // custom end readOnePhoto
    const res = await this.photoModel.readOnePhoto(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
  async updateOnePhoto(
      param :requestTypes.UpdateOnePhotoParams,
      session: Express.Request['session'],
  ) {
    // custom begin updateOnePhoto

    // custom end updateOnePhoto
    const res = await this.photoModel.updateOnePhoto(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
  async deleteManyPhoto(
      param :requestTypes.DeleteManyPhotoParams,
      session: Express.Request['session'],
  ) {
    // custom begin deleteManyPhoto
    const data = await this.photoModel.readManyPhoto(
        {
          queryOrderBy: 'desc',
          queryOrderByField: 'id',
        },
    ).catch((e) =>{
      throw e;
    });
    const removeFile = (path: string | null)=>{
      if (path !== null) {
        fs.unlink(path, (err) => {
        });
      }
    };
    data.forEach((e) => {
      removeFile(e.filePath1);
      removeFile(e.filePath2);
      removeFile(e.filePath3);
    });

    // custom end deleteManyPhoto
    const res = await this.photoModel.deleteManyPhoto(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
  async readManyPhoto(
      param :requestTypes.ReadManyPhotoParams,
      session: Express.Request['session'],
  ) {
    // custom begin readManyPhoto

    // custom end readManyPhoto
    const res = await this.photoModel.readManyPhoto(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
  async uploadManyPhoto(
      param :requestTypes.UploadManyPhotoParams,
      session: Express.Request['session'],
      files: Express.Multer.File[],
  ) {
    // custom begin uploadManyPhoto

    // custom end uploadManyPhoto
    const res = await this.photoModel.uploadManyPhoto(
        param,
        files,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
  async updateManyPhoto(
      param :requestTypes.UpdateManyPhotoParams,
      session: Express.Request['session'],
  ) {
    // custom begin updateManyPhoto

    // custom end updateManyPhoto
    const res = await this.photoModel.updateManyPhoto(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
}

