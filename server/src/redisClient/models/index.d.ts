import {RedisClientType} from 'redis';

export interface PhotoModel extends ApiModelsBase {
  key: string;
}

export interface ModelBase{
    client: RedisClientType
}

