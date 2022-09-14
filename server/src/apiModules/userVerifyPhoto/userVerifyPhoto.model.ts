import {Service} from 'typedi';
import {PrismaClient, UserVerifyPhoto} from '@prisma/client';
import * as requestTypes from './userVerifyPhoto.parameters';
import {errors} from '../../errors';

const prisma = new PrismaClient();

@Service()
export class UserVerifyPhotoModel {
  async getBackstageUserVerifyPhoto(
      param: requestTypes.GetBackstageUserVerifyPhotoParams,
      customParam: any,
  ) {
    // custom begin getBackstageUserVerifyPhoto
    const res: any | null = prisma.userVerifyPhoto.findFirst(
        {
          where: {
            userId: param.pathUserId,
            type: param.queryType,
          },
          select: {
            id: true,
            path: true,
            type: true,
            createdAt: true,
          },
        },
    ).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end getBackstageUserVerifyPhoto
  }
  async getUserVerifyPhoto(
      param: requestTypes.GetUserVerifyPhotoParams,
      customParam: any,
  ) {
    // custom begin getUserVerifyPhoto
    const res: any | null = prisma.userVerifyPhoto.findMany(
        {
          where: {
            userId: customParam.userId,
          },
          select: {
            id: true,
            path: true,
            type: true,
            createdAt: true,
          },
        },
    ).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end getUserVerifyPhoto
  }
  async uploadManyVerifyPhoto(
      param: requestTypes.UploadManyVerifyPhotoParams,
      files: Express.Multer.File[],
      ownerId: string,
  ) {
    // custom begin uploadManyVerifyPhoto
    const data = files.map((e, i) => {
      return {
        path: e.path.replace('\\', '/'),
        userId: ownerId,
        type: param.queryTypes[i]!,
      };
    });
    const res: any = await prisma.userVerifyPhoto.createMany({
      data,
      skipDuplicates: true,
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });

    // custom end uploadManyVerifyPhoto
    return res;
  }
}
