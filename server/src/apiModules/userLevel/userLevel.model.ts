import {Service} from 'typedi';
import * as Prisma from '@prisma/client';
import * as requestTypes from './userLevel.parameters';
import {errors} from '../../errors';

const prisma = new Prisma.PrismaClient();

@Service()
export class UserLevelModel {
  async readManyBackstageUserLevel(
      param: requestTypes.ReadManyBackstageUserLevelParams,
  ) {
    const res = await prisma.userLevel.findMany({
      where: {
      },
      select: {
        des: true,
        id: true,
        level: true,
        // custom begin readManyBackstageUserLevel

        // custom end readManyBackstageUserLevel
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async createOneBackstageUserLevel(
      param: requestTypes.CreateOneBackstageUserLevelParams,
  ) {
    const res = await prisma.userLevel.create({
      data: {
        des: param.bodyDes,
        level: param.bodyLevel,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async deleteOneBackstageUserLevel(
      param: requestTypes.DeleteOneBackstageUserLevelParams,
  ) {
    const res = await prisma.userLevel.delete({
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
  async updateOneBackstageUserLevel(
      param: requestTypes.UpdateOneBackstageUserLevelParams,
  ) {
    const res = await prisma.userLevel.update({
      where: {
        id: param.pathId,
      },
      data: {
        des: param.bodyDes,
        level: param.bodyLevel,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  // custom begin model

  // custom end model
}
