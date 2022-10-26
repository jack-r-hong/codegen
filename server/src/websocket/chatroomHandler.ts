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
    subscriberQuit: () => void
}

interface LobbyHandlerInterface {
  chatroomHandler: ChatroomHandlerInterface| null;
  handleChangeRoomEvent: (data: any) => void
  ws?: WebSocket
}

export class RobbyHandler implements LobbyHandlerInterface {
  chatroomHandler: ChatroomHandlerInterface| null = null;
  ws: WebSocket;
  userId: string;
  transactionId: string;
  userName: string;
  isAgent: boolean;
  isCS: boolean;
  constructor(
      ws: WebSocket,
      userId: string,
      userName: string,
      isAgent: boolean,
      isCS: boolean,
  ) {
    this.ws = ws;
    this.userId = userId;
    this.transactionId = '';
    this.userName = userName;
    this.isAgent = isAgent;
    this.isCS = isCS;
  }
  async handleChangeRoomEvent(data: any) {
    this.transactionId = data.transactionId;
    // close subscriber
    if (this.chatroomHandler) {
      this.chatroomHandler.subscriberQuit();
    }

    this.chatroomHandler = await TransactionChatroomHandler.init(
        this.userId,
        this.transactionId,
        this.userName,
        this.isAgent,
        this.isCS,
        this.ws,
    );

    event.eventName = 'changeRoom';
  }
}

class ChatroomHandler {
  userId: string;
  userName: string;
  cursor: number;
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

    const messageList = (await wsClientChatroomModel
        .get(-1, this.roomId!))
        .map((e) => JSON.parse(e));

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

  subscriberQuit() {
    wsClientChatroomModel.subscriberQuit(this.subscriber).then(()=> {});
  }

  async pushNewMessage(msg: string) {
    await wsClientChatroomModel.push(msg, this.roomId);
  }

  async pubNewMessage(msg: string) {
    await wsClientChatroomModel.pub(
        msg,
        this.roomId,
    );
  }
}

export class TransactionChatroomHandler extends ChatroomHandler
  implements ChatroomHandlerInterface {
  transactionId: string;
  isAgent: boolean;
  isCS: boolean;

  private constructor(
      userId: string,
      transactionId: string,
      userName: string,
      isAgent: boolean,
      isCS: boolean,
      ws: WebSocket,
      cursor: number,
  ) {
    super(
        userId,
        userName,
        cursor,
        ws,
        transactionId + 'Transaction',
    );
    this.transactionId = transactionId;
    this.isAgent = isAgent;
    this.isCS = isCS;
  }

  static async init(
      userId: string,
      transactionId: string,
      userName: string,
      isAgent: boolean,
      isCS: boolean,
      ws: WebSocket,
  ) {
    const cursor = await this.getCursor(transactionId, userId);
    return new TransactionChatroomHandler(
        userId,
        transactionId,
        userName,
        isAgent,
        isCS,
        ws,
        cursor,
    );
  }

  static async getCursor(
      transactionId: string,
      userId: string,
  ) {
    const cursorRes = await chatroomModel.getTransactionCursor(
        transactionId,
        userId);
    if (cursorRes) {
      return cursorRes.cursor;
    }
    return 0;
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
      ).then(async (e) => {
        await this.pushNewMessage(JSON.stringify({
          id: e.id,
          userId: e.userId,
        }));

        await this.pubNewMessage(
            JSON.stringify(this.dataFormat(e)),
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
        .get(-1, this.roomId!)).length === 0) {
      for (const e of res) {
        await wsClientChatroomModel.push(JSON.stringify({
          id: e.id,
          userId: e.userId,
        }), this.roomId);
      }
    }
  }

  async getCursor() {
    const cursorRes = await chatroomModel.getTransactionCursor(
        this.transactionId,
        this.userId);
    if (cursorRes) {
      return cursorRes.cursor;
    }
    return 0;
  }
}
