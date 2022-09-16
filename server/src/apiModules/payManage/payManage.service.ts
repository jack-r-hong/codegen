import {Service, Inject} from 'typedi';
import {PayManageModel} from './payManage.model';
import * as requestTypes from './payManage.parameters';
import {errors} from '../../errors';
// custom begin import
import {promises as fs} from 'fs';

// custom end import


@Service()
export class PayManageService {
  @Inject()
  private payManageModel!: PayManageModel;

  async readManyBackstagePayManage(
      param :requestTypes.ReadManyBackstagePayManageParams,
      session: Express.Request['session'],
  ) {
    // custom begin readManyBackstagePayManage

    // custom end readManyBackstagePayManage

    const res = await this.payManageModel.readManyBackstagePayManage(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin readManyBackstagePayManage2

    for (const e of res ) {
      let photo = '';

      if (e.qrCode) {
        photo = await fs.readFile( e.qrCode, 'base64')
            .catch(() => '');
      }

      e.qrCode = photo;
    }

    // custom end readManyBackstagePayManage2
    return res;
  }
  async careateBackstagePayManage(
      param :requestTypes.CareateBackstagePayManageParams,
      session: Express.Request['session'],
  ) {
    // custom begin careateBackstagePayManage
    const res = await this.payManageModel.careateBackstagePayManage(
        param,
        {},
    ).catch((e) =>{
      throw e;
    });
    return res;

    // custom end careateBackstagePayManage
  }
  async deleteQrCode(
      param :requestTypes.DeleteQrCodeParams,
      session: Express.Request['session'],
  ) {
    // custom begin deleteQrCode
    const res = await this.payManageModel.deleteQrCode(
        param,
        {},
    ).catch((e) =>{
      throw e;
    });
    if (!res) {
      return;
    }
    const path = res.qrCode;
    await fs.unlink(path)
        .catch((e) => {
        });
    return res;

    // custom end deleteQrCode
  }
  async uploadManyQrCode(
      param :requestTypes.UploadManyQrCodeParams,
      session: Express.Request['session'],
      files: Express.Multer.File[],
  ) {
    // custom begin uploadManyQrCode

    // custom end uploadManyQrCode

    const res = await this.payManageModel.uploadManyQrCode(
        param,
        files,
        session.userInfo?.id!,
    ).catch((e) =>{
      throw e;
    });

    // custom begin uploadManyQrCode2

    // custom end uploadManyQrCode2
    return res;
  }
  async deleteOneBackstagePayManage(
      param :requestTypes.DeleteOneBackstagePayManageParams,
      session: Express.Request['session'],
  ) {
    // custom begin deleteOneBackstagePayManage

    // custom end deleteOneBackstagePayManage

    const res = await this.payManageModel.deleteOneBackstagePayManage(
        param,
    ).catch((e) =>{
      throw e;
    });

    // custom begin deleteOneBackstagePayManage2

    // custom end deleteOneBackstagePayManage2
    return res;
  }
  async updateBackstagePayManage(
      param :requestTypes.UpdateBackstagePayManageParams,
      session: Express.Request['session'],
  ) {
    // custom begin updateBackstagePayManage
    const res = await this.payManageModel.updateBackstagePayManage(
        param,
        {},
    ).catch((e) =>{
      throw e;
    });
    return res;

    // custom end updateBackstagePayManage
  }
}

