import WebSocket from 'ws';
import {WSEvent} from './base';
import {
  WSClientChatroomModel,
  WSClientServiceModel} from '../redisClient/models/webSocketModels';
import {ChatroomModel}
  from '../apiModules/chatroom/chatroom.model';
import {Container} from 'typedi';

const event = new WSEvent('');
const wsClientChatroomModel = Container.get(WSClientChatroomModel);
const chatroomModel = Container.get(ChatroomModel);
const wSClientServiceModel = Container.get(WSClientServiceModel);

interface ChatroomHandlerInterface {
    handleReadEvent: () => void
    handleSendEvent: (data: any) => void
    readySend: () => void
}

class ChatroomHandler {
  userId: string;
  userName: string;
  cursor: number = 0;
  ws: WebSocket;
  subscriber: any;
  roomId: string;

  constructor(
      userId: string,
      userName: string,
      cursor: number,
      ws: WebSocket,
      roomId: string,
  ) {
    this.userId = userId;
    this.roomId = roomId;
    this.userName = userName;
    this.cursor = cursor;
    this.ws = ws;
    this.createSubscriber().then((sub) => {
      this.subscriber = sub;
    });
  }

  async createSubscriber() {
    const self = this;
    return await wsClientChatroomModel.sub(
        (message: any)=>{
          event.eventName = 'send';
          const data = JSON.parse(message);
          self.ws.send(event.msg(self.isSelf(data)));

          self.sendNotify().then();
        },
        this.roomId);
  }

  async sendNotify() {
    event.eventName = 'notify';
    // console.log(this.cursor);

    const messageList = (await wsClientChatroomModel
        .get(-1, this.roomId!))
        .map((e) => JSON.parse(e));
      // console.log(messageList);

    this.ws.send(event.msg({
      unreadCouunt: messageList.filter((e: any) => {
        return e.id > this.cursor && this.userId !== e.userId;
      }).length,
    }));
    await wSClientServiceModel.pub('');
  }

  dataFormat = (data: any) => {
    return {
      id: data.id,
      userId: data.userId,
      data: data.type === 'image' && data.data?
          data.data.toString('base64'): data.text,
      type: data.type,
      time: data.createdAt,
      name: data.name,
      role: data.role,
      read: data.id < this.cursor || this.userId === data.userId,
    };
  };

  isSelf = (data: any) => {
    const res = Object.assign(data, {isSelf: this.userId === data.userId});
    delete res.userId;
    return res;
  };
}


export class TransactionChatroomHandler extends ChatroomHandler
  implements ChatroomHandlerInterface {
  transactionId: string;
  isAgent: boolean;
  isCS: boolean;

  constructor(
      userId: string,
      transactionId: string,
      userName: string,
      isAgent: boolean,
      isCS: boolean,
      cursor: number,
      ws: WebSocket,
  ) {
    super(
        userId,
        userName,
        cursor,
        ws,
        transactionId + 'ttt',
    );
    this.transactionId = transactionId;
    this.isAgent = isAgent;
    this.isCS = isCS;
  }

  handleReadEvent() {
    if (this.transactionId) {
      chatroomModel.upsertTransactionCursor(
          this.transactionId,
              this.userId!,
      ).then((res) => {
        console.log(res);

        this.cursor = res.cursor;
        this.sendNotify().then();
      })
          .catch((e) => {
            console.log(e);
          });
    }
  }

  handleSendEvent(data: any) {
    if (this.userId && this.transactionId) {
      data.name = this.userName;
      data.userId = this.userId;
      chatroomModel.createTransactionMessage(
          this.transactionId,
          this.userId,
          data.type,
          data.name?? '',
              data.type === 'text'? data.data: '',
            data.type === 'image'? Buffer.from(data.data, 'base64'): undefined,
            this.isAgent? 2: (this.isCS? 3: 1),
      ).then((e) => {
        wsClientChatroomModel.push(JSON.stringify({
          id: e.id,
          userId: e.userId,
        }), this.transactionId);
        wsClientChatroomModel.pub(
            JSON.stringify(this.dataFormat(e)),
            this.transactionId,
        );
      }).catch((e) => console.log(e));
    }
  }

  async readySend() {
    event.eventName = 'ready';
    const res = await chatroomModel.getTransactionMessages(
          this.transactionId!,
    );

    this.ws.send(event.msg(
        res.map((e) => {
          return this.isSelf(this.dataFormat(e));
        }),
    ));

    for (const e of res) {
      e.data = null;
    }

    if ((await wsClientChatroomModel
        .get(-1, this.transactionId!)).length === 0) {
      for (const e of res) {
        await wsClientChatroomModel.push(JSON.stringify({
          id: e.id,
          userId: e.userId,
        }), this.transactionId);
      }
    }
  }
}
