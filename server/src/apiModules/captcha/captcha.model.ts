import {Service} from 'typedi';
import {PrismaClient, Captcha} from '@prisma/client';
import * as requestTypes from './captcha.parameters';
import {errors} from '../../errors';

const prisma = new PrismaClient();

@Service()
export class CaptchaModel {
}
