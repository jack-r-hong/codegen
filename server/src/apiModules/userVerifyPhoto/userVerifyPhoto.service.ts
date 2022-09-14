import {Service, Inject} from 'typedi';
import {UserVerifyPhotoModel} from './userVerifyPhoto.model';
import * as requestTypes from './userVerifyPhoto.parameters';
import {errors} from '../../errors';
// custom begin import
import {promises as fs} from 'fs';

// custom end import


@Service()
export class UserVerifyPhotoService {
  @Inject()
  private userVerifyPhotoModel!: UserVerifyPhotoModel;

  async getBackstageUserVerifyPhoto(
      param :requestTypes.GetBackstageUserVerifyPhotoParams,
      session: Express.Request['session'],
  ) {
    // custom begin getBackstageUserVerifyPhoto
    const res = await this.userVerifyPhotoModel.getBackstageUserVerifyPhoto(
        param,
        {userId: session.userInfo!.id},
    ).catch((e) =>{
      throw e;
    });
    if (!res || !res.path) {
      throw new errors.NotFindError;
    }
    const data = await fs.readFile(res.path)
        .catch(() => {
          throw new errors.NotFindError;
        });
    return data;

    // custom end getBackstageUserVerifyPhoto
  }
  async getUserVerifyPhoto(
      param :requestTypes.GetUserVerifyPhotoParams,
      session: Express.Request['session'],
  ) {
    // custom begin getUserVerifyPhoto
    const res = await this.userVerifyPhotoModel.getUserVerifyPhoto(
        param,
        {userId: session.userInfo!.id},
    ).catch((e) =>{
      throw e;
    });
    return res;

    // custom end getUserVerifyPhoto
  }
  async uploadManyVerifyPhoto(
      param :requestTypes.UploadManyVerifyPhotoParams,
      session: Express.Request['session'],
      files: Express.Multer.File[],
  ) {
    // custom begin uploadManyVerifyPhoto

    // custom end uploadManyVerifyPhoto

    const res = await this.userVerifyPhotoModel.uploadManyVerifyPhoto(
        param,
        files,
        session.userInfo?.id!,
    ).catch((e) =>{
      throw e;
    });

    // custom begin uploadManyVerifyPhoto2

    // custom end uploadManyVerifyPhoto2
    return res;
  }
}

