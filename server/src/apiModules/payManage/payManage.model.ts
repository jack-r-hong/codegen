import {Service} from 'typedi';
import {PrismaClient, PayManage} from '@prisma/client';
import * as requestTypes from './payManage.parameters';
import {errors} from '../../errors';

const prisma = new PrismaClient();

@Service()
export class PayManageModel {
  async readManyBackstagePayManage(
      param: requestTypes.ReadManyBackstagePayManageParams,
  ) {
    const res: any[] | null = await prisma.payManage.findMany({
      where: {
    type: param.queryType,
      },
      select: {
        qrCode: true,
        remark: true,
        status: true,
        type: true,
        // custom begin readManyBackstagePayManage

        // custom end readManyBackstagePayManage
      },
      skip: param.queryPage * param.queryTake,
      take: param.queryTake,
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async careateBackstagePayManage(
      param: requestTypes.CareateBackstagePayManageParams,
      customParam: any,
  ) {
    // custom begin careateBackstagePayManage

    // custom end careateBackstagePayManage
  }
  async deleteQrCode(
      param: requestTypes.DeleteQrCodeParams,
      customParam: any,
  ) {
    // custom begin deleteQrCode

    // custom end deleteQrCode
  }
  async uploadManyQrCode(
      param: requestTypes.UploadManyQrCodeParams,
      files: Express.Multer.File[],
      ownerId: string,
  ) {
    // custom begin uploadManyQrCode
    const res = {};

    // custom end uploadManyQrCode
    return res;
  }
  async deleteOneBackstagePayManage(
      param: requestTypes.DeleteOneBackstagePayManageParams,
  ) {
    const res: PayManage | null = await prisma.payManage.delete({
      where: {
        id: param.pathId,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async updateBackstagePayManage(
      param: requestTypes.UpdateBackstagePayManageParams,
      customParam: any,
  ) {
    // custom begin updateBackstagePayManage

    // custom end updateBackstagePayManage
  }
}
