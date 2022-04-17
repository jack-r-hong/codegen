import {Service, Inject} from 'typedi';
import {PhotoModel} from './photo.model';
import * as requestTypes from './photo.parameters';
import {errors} from '../../errors';
// custom begin import
import fs from 'fs';
import {Container} from 'typedi';
import {
  PhotoScheduleQueueModel,
} from '../../redisClient/models/apiModels';
const pSQModel = Container.get(PhotoScheduleQueueModel);

// custom end import


@Service()
export class PhotoService {
  @Inject()
  private photoModel!: PhotoModel;

  async readManyAdminPhoto(
      param :requestTypes.ReadManyAdminPhotoParams,
      session: Express.Request['session'],
  ) {
    // custom begin readManyAdminPhoto

    // custom end readManyAdminPhoto
    
    const res = await this.photoModel.readManyAdminPhoto(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
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
    if (!session.userInfo) {
      throw new errors.AuthenticationFailedError;
    }
    const data = await this.photoModel.readManyPhoto(
        {
          queryOrderBy: 'desc',
          queryOrderByField: 'id',
          cookieJsessionid: session.userInfo?.id,
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
    if(!session.userInfo) throw new errors.AuthenticationFailedError;
    param.cookieJsessionid = session.userInfo.id;
    
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
    if(!session.userInfo) throw new errors.AuthenticationFailedError;
    param.cookieJsessionid = session.userInfo.id;
    
    const res = await this.photoModel.uploadManyPhoto(
        param,
        files,
        session.userInfo?.id!
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
    for ( const ele of param.bodyDataList ) {
      if (ele.bodyStatus == 2) {
        await pSQModel.push(ele.bodyId.toString());
      }
    }

    // custom end updateManyPhoto
    
    const res = await this.photoModel.updateManyPhoto(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
}

