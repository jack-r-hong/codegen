import {Service, Inject} from 'typedi';
import {ChatroomModel} from './chatroom.model';
import * as requestTypes from './chatroom.parameters';
import {errors} from '../../errors';
// custom begin import

// custom end import


@Service()
export class ChatroomService {
  @Inject()
  private chatroomModel!: ChatroomModel;

}

