import {Service} from 'typedi';
import {PrismaClient, Captcha} from '@prisma/client';
import * as requestTypes from './captcha.parameters';
import {errors} from '../../errors';

const prisma = new PrismaClient();

@Service()
export class CaptchaModel {
  async readManyUser(
      param: requestTypes.ReadManyUserParams,
  ) {
    const res: any[] | null = await prisma.captcha.findMany({
      where: {
      },
      select: {
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
}
