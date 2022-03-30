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
      param :requestTypes.ReadOnePhotoRequest,
  ) {
    const res = await this.photoModel.readOnePhoto(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
}

