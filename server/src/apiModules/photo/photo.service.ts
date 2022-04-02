import {Service} from 'typedi';
export {Container} from 'typedi';
import {PhotoModel} from './photo.model';
import * as requestTypes from './photo.parameters';
import {errors} from '../../errors';
// custom begin import

// custom end import


@Service()
export class PhotoService {
  constructor(
        private photoModel: PhotoModel,
  ) {}
  async readOnePhoto(
      param :requestTypes.ReadOnePhotoParams,
  ) {
    const res = await this.photoModel.readOnePhoto(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
  async updateOnePhoto(
      param :requestTypes.UpdateOnePhotoParams,
  ) {
    const res = await this.photoModel.updateOnePhoto(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
  async deleteManyPhoto(
      param :requestTypes.DeleteManyPhotoParams,
  ) {
    const res = await this.photoModel.deleteManyPhoto(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
  async readManyPhoto(
      param :requestTypes.ReadManyPhotoParams,
  ) {
    const res = await this.photoModel.readManyPhoto(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
  async uploadManyPhoto(
      param :requestTypes.UploadManyPhotoParams,
      files: Express.Multer.File[],
  ) {
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
  ) {
    const res = await this.photoModel.updateManyPhoto(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
}

