import {Service} from 'typedi';
import * as Prisma from '@prisma/client';
import * as requestTypes from './userVerifyPhoto.parameters';
import {errors} from '../../errors';

const prisma = new Prisma.PrismaClient();

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
    const res = prisma.$transaction(
        files.map((e, i) => {
          return prisma.userVerifyPhoto.upsert({
            where: {
              uniqueType: {
                userId: ownerId,
                type: param.queryTypes[i]!,
              },
            },
            create: {
              path: e.path.replace('\\', '/'),
              userId: ownerId,
              type: param.queryTypes[i]!,
            },
            update: {
              path: e.path.replace('\\', '/'),
            },
          });
        }),
    ).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });

    // custom end uploadManyVerifyPhoto
    return res;
  }
  // custom begin model

  // custom end model
}
