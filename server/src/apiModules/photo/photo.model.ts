import {Service} from 'typedi';
import {PrismaClient, Photo} from '@prisma/client';
import * as requestTypes from './photo.parameters';
import {errors} from '../../errors';

const prisma = new PrismaClient();

@Service()
export class PhotoModel {
  async readManyAdminPhoto(
      param: requestTypes.ReadManyAdminPhotoParams,
  ) {
    const res: any[] | null = await prisma.photo.findMany({
      where: {
    status: param.queryStatus,
      },
      select: {
        afterLevel: true,
        beforeLevel: true,
        createdAt: true,
        filePath1: true,
        filePath2: true,
        filePath3: true,
        id: true,
        name: true,
        ownerId: true,
        process: true,
        status: true,
        user: true,
      },
      orderBy: {
        [param.queryOrderByField]: param.queryOrderBy,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async readOnePhoto(
      param: requestTypes.ReadOnePhotoParams,
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
        filePath3: true,
        id: true,
        name: true,
        ownerId: true,
        process: true,
        status: true,
        user: true,
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
  async updateOnePhoto(
      param: requestTypes.UpdateOnePhotoParams,
  ) {
    const res: Photo | null = await prisma.photo.update({
      where: {
        id: param.pathId,
      },
      data: {
        afterLevel: param.bodyAfterLevel,
        beforeLevel: param.bodyBeforeLevel,
        filePath2: param.bodyFilePath2,
        process: param.bodyProcess,
        status: param.bodyStatus,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async deleteManyPhoto(
      param: requestTypes.DeleteManyPhotoParams,
  ) {
    const res = await prisma.photo.deleteMany({
      where: {
        id: {
          in: param.queryId,
        },
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res.count;
  }
  async readManyPhoto(
      param: requestTypes.ReadManyPhotoParams,
  ) {
    const res: any[] | null = await prisma.photo.findMany({
      where: {
    ownerId: param.cookieJsessionid,
      },
      select: {
        afterLevel: true,
        beforeLevel: true,
        createdAt: true,
        filePath1: true,
        filePath2: true,
        filePath3: true,
        id: true,
        name: true,
        ownerId: true,
        process: true,
        status: true,
        user: true,
      },
      orderBy: {
        [param.queryOrderByField]: param.queryOrderBy,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async uploadManyPhoto(
      param: requestTypes.UploadManyPhotoParams,
      files: Express.Multer.File[],
      ownerId: string,
  ) {
    const data = files.map((e) => {
      return {
        name: e.originalname,
        filePath1: e.path.replace('\\', '/'),
        ownerId,
      };
    });

    const res: any = await prisma.photo.createMany({
      data,
      skipDuplicates: true,
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async updateManyPhoto(
      param: requestTypes.UpdateManyPhotoParams,
  ) {
    const res = {
      count: 0,
    };

    await Promise.all(
        param.bodyDataList.map((e: any) => {
          const data: any = {};
          const where: any = {};
          Object.keys(e).forEach((k) => {
            const key: string = k.charAt(4).toLowerCase() +
            k.substring(4).slice(1);

            if (key === param.bodyWhereField) {
              where[param.bodyWhereField] = e[k];
            } else {
              data[key] = e[k];
            }
          });

          res.count++;
          return prisma.photo.update({
            data,
            where,
          });
        }),
    ).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res.count;
  }
}
