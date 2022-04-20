import {Service} from 'typedi';
import {PrismaClient, Notify} from '@prisma/client';
import * as requestTypes from './notify.parameters';
import {errors} from '../../errors';

const prisma = new PrismaClient();

@Service()
export class NotifyModel {
  async readManyNotify(
      param: requestTypes.ReadManyNotifyParams,
  ) {
    const res: any[] | null = await prisma.notify.findMany({
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
  async createOneNotify(
      param: requestTypes.CreateOneNotifyParams,
  ) {
    const res: Notify | null = await prisma.notify.create({
      data: {
        event: param.bodyEvent,
        msg: param.bodyMsg,
        ownerId: param.bodyOwnerId,
        read: param.bodyRead,
      },
    }).catch((e) => {
      throw e;
    }).finally(() => {
      prisma.$disconnect();
    });
    return res;
  }
  async updateManyNotify(
      param: requestTypes.UpdateManyNotifyParams,
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
          return prisma.notify.update({
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
