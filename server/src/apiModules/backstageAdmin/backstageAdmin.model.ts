import {Service} from 'typedi';
import {PrismaClient, BackstageAdmin} from '@prisma/client';
import * as requestTypes from './backstageAdmin.parameters';
import {errors} from '../../errors';

const prisma = new PrismaClient();

@Service()
export class BackstageAdminModel {
  async getAdminFromId(
      param: requestTypes.GetAdminFromIdParams,
      customParam: any,
  ) {
    // custom begin getAdminFromId
    const res: any | null = await prisma.backstageAdmin.findUnique({
      where: {
        id: param.bodyId,
      },
      select: {
        id: true,
        status: true,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end getAdminFromId
  }
  async adminLogin(
      param: requestTypes.AdminLoginParams,
      customParam: any,
  ) {
    // custom begin adminLogin
    const res: any | null = await prisma.backstageAdmin.findUnique({
      where: {
        account: param.bodyAccount,
      },
      select: {
        id: true,
        status: true,
        password: true,
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

    // custom end adminLogin
  }
  async adminRegister(
      param: requestTypes.AdminRegisterParams,
      customParam: any,
  ) {
    // custom begin adminRegister
    const res: any | null = await prisma.backstageAdmin.create({
      data: {
        account: param.bodyAccount,
        password: customParam.password,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;

    // custom end adminRegister
  }
  // custom begin model

  // custom end model
}
