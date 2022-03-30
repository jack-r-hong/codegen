import {Service} from 'typedi';
import {PrismaClient, Photo} from '@prisma/client';
import * as requestTypes from './photo.parameters';
import {errors} from '../../errors';

const prisma = new PrismaClient();

@Service()
export class PhotoModel {
  async readOnePhoto(
      param: requestTypes.ReadOnePhotoRequest,
  ) {
    const res: any | null = await prisma.photo.findUnique({
      where: {
        id: param.pathId,
      },
      select: {
        afterLevel: true,
        beforeLevel: true,
        createdAt: true,
        filePath1: true,
        filePath2: true,
        id: true,
        name: true,
        process: true,
        status: true,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });

    if (res === null) {
      throw new errors.NotFindError;
    }
    return res;
  }
}
