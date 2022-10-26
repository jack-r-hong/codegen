import {Service} from 'typedi';
import * as Prisma from '@prisma/client';
import * as requestTypes from './backstageAdmin.parameters';
import {errors} from '../../errors';
// custom begin import

// custom end import

const prisma = new Prisma.PrismaClient();

@Service()
export class BackstageAdminModel {
  async getAdminFromId(
      param: requestTypes.GetAdminFromIdParams,
      customParam: any,
      // custom begin getAdminFromIdParam

      // custom end getAdminFromIdParam
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
      // custom begin adminLoginParam

      // custom end adminLoginParam
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
    return res;

    // custom end adminLogin
  }
  async adminRegister(
      param: requestTypes.AdminRegisterParams,
      customParam: any,
      // custom begin adminRegisterParam

      // custom end adminRegisterParam
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
