import {Service} from 'typedi';
import * as Prisma from '@prisma/client';
import * as requestTypes from './payManage.parameters';
import {errors} from '../../errors';

const prisma = new Prisma.PrismaClient();

@Service()
export class PayManageModel {
  async readManyBackstagePayManage(
      param: requestTypes.ReadManyBackstagePayManageParams,
  ) {
    const res: any[] | null = await prisma.payManage.findMany({
      where: {
    type: param.queryType,
    userId: param.queryUserId,
      },
      select: {
        id: true,
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
    const res: any | null = await prisma.payManage.create({
      data: {
        type: param.bodyType,
        userId: param.bodyUserId,
        qrCode: '',
        remark: '',
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end careateBackstagePayManage
  }
  async deleteQrCode(
      param: requestTypes.DeleteQrCodeParams,
      customParam: any,
  ) {
    // custom begin deleteQrCode
    const res: Prisma.PayManage | null = await prisma.payManage.findUnique({
      where: {
        id: param.pathId,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    await prisma.payManage.update({
      where: {
        id: param.pathId,
      },
      data: {
        qrCode: '',
        status: 1,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end deleteQrCode
  }
  async uploadManyQrCode(
      param: requestTypes.UploadManyQrCodeParams,
      files: Express.Multer.File[],
      ownerId: string,
  ) {
    // custom begin uploadManyQrCode
    const res: Prisma.PayManage | null = await prisma.payManage.update({
      where: {
        id: param.pathId,
      },
      data: {
        status: 2,
        qrCode: files[0]!.path.replace('\\', '/'),
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });

    // custom end uploadManyQrCode
    return res;
  }
  async deleteOneBackstagePayManage(
      param: requestTypes.DeleteOneBackstagePayManageParams,
  ) {
    const res: Prisma.PayManage | null = await prisma.payManage.delete({
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
    const res: Prisma.PayManage | null = await prisma.payManage.update({
      where: {
        id: param.pathId,
      },
      data: {
        remark: param.bodyRemark,
        status: param.bodyStatus,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end updateBackstagePayManage
  }
  // custom begin model

  // custom end model
}
