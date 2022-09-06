import {Service, Inject} from 'typedi';
import {UserVerifyPhotoModel} from './userVerifyPhoto.model';
import * as requestTypes from './userVerifyPhoto.parameters';
import {errors} from '../../errors';
// custom begin import

// custom end import


@Service()
export class UserVerifyPhotoService {
  @Inject()
  private userVerifyPhotoModel!: UserVerifyPhotoModel;

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

