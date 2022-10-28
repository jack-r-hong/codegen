import {Service} from 'typedi';
import * as Prisma from '@prisma/client';
import * as requestTypes from './customService.parameters';
import {errors} from '../../errors';
// custom begin import

// custom end import

const prisma = new Prisma.PrismaClient();

@Service()
export class CustomServiceModel {
  async getOneBackstageUser(
      param: requestTypes.GetOneBackstageUserParams,
      customParam: any,
      // custom begin getOneBackstageUserParam

      // custom end getOneBackstageUserParam
  ) {
    // custom begin getOneBackstageUser

    // custom end getOneBackstageUser
  }
  // custom begin model

  // custom end model
}
