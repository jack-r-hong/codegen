import {RedisClient} from '../index';
import {ModelBase, PhotoModel} from './index';
import {Service} from 'typedi';
import {Queue} from './queue';
import {Mixin} from 'ts-mixer';

@Service()
export class ApiModels {
  photoScheduleQueueModel = new PhotoScheduleQueueModel();
}

class ApiModelsBase extends RedisClient implements ModelBase {

}

@Service()
export class PhotoScheduleQueueModel extends
  Mixin(Queue, ApiModelsBase)
  implements PhotoModel {
  constructor() {
    super();
  }
  override key: string = super.setKey('PSM');
}


