import {Service} from 'typedi';
import * as Prisma from '@prisma/client';
import * as requestTypes from './rebate.parameters';
import {errors} from '../../errors';
// custom begin import

// custom end import

const prisma = new Prisma.PrismaClient();

@Service()
export class RebateModel {
  // custom begin model

  // custom end model
}
