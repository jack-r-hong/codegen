import WebSocket from 'ws';
import {WSEvent} from './base';
import {
  WSClientChatroomModel,
  WSClientServiceModel} from '../redisClient/models/webSocketModels';
import {ChatroomModel}
  from '../apiModules/chatroom/chatroom.model';
import {Container} from 'typedi';

const wsClientChatroomModel = Container.get(WSClientChatroomModel);
const chatroomModel = Container.get(ChatroomModel);
const wSClientServiceModel = Container.get(WSClientServiceModel);

interface ChatroomHandlerInterface {
    handleReadEvent: () => void
    handleSendEvent: (data: any) => void
    readySend: () => void
    subscriberQuit: () => void
    sendNotify: () => void
}

interface LobbyHandlerInterface {
  chatroomHandler: ChatroomHandlerInterface| null;
  handleChangeRoomEvent: (data: any) => void
  ws?: WebSocket
}

// lobby

abstract class LobbyHandler {
  chatroomHandler: ChatroomHandlerInterface| null = null;
  subscriberNewMessage?: any;
  preMsg: string = '';
  ws: WebSocket;
  event = new WSEvent('');

  constructor(
      ws: WebSocket,
  ) {
    this.ws = ws;
  }

  readDataFormat = (data: {
    id: number,
    userId: String,
    type: String,
    text: String,
    createdAt: Date,
    name: String,
    role: number,
    unRead: number,
    room: String,
  }) => {
    return {
      id: data.id,
      userId: data.userId,
      data: data.type === 'image'?
          '傳送了一張圖片': data.text,
      type: data.type,
      time: data.createdAt,
      name: data.name,
      role: data.role,
      unRead: data.unRead,
      room: data.room,
    };
  };

  async handleChangeRoomEvent(
      chatroomHandler: ChatroomHandlerInterface,
  ) {
    // close subscriber
    if (this.chatroomHandler) {
      this.chatroomHandler.subscriberQuit();
    }

    this.chatroomHandler = chatroomHandler;

    this.event.eventName = 'changeRoom';

    await this.chatroomHandler.readySend();

    await this.chatroomHandler.sendNotify();
  }
}

export class TransactionLobbyHandler extends LobbyHandler
  implements LobbyHandlerInterface {
  transactionId: string;
  isAgent: boolean;
  isCS: boolean;
  userId: string;
  userName: string;

  private constructor(
      ws: WebSocket,
      userId: string,
      userName: string,
      isAgent: boolean,
      isCS: boolean,
  ) {
    super(
        ws,
    );
    this.userId = userId;
    this.transactionId = '';
    this.userName = userName;
    this.isAgent = isAgent;
    this.isCS = isCS;
  }
  override async handleChangeRoomEvent(data: any) {
    this.transactionId = data.roomId;
    if (!data || !data.roomId) {
      return;
    }
    super.handleChangeRoomEvent(
        await TransactionChatroomHandler.init(
            this.userId,
            this.transactionId,
            this.userName,
            this.isAgent,
            this.isCS,
            this.ws,
        ),
    );
  }

  async sendNewMessage() {
    this.event.eventName = 'newMessage';

    const sendData = await this.getNewMessage();

    this.ws!.send(this.event.msg(
        sendData.map((e) => {
          if (e) {
            return this.readDataFormat(
                {
                  id: e.id,
                  userId: e.userId,
                  type: e.type,
                  text: e.text,
                  createdAt: e.createdAt,
                  name: e.name,
                  role: e.role,
                  unRead: e.unRead,
                  room: e.transactionId,
                },
            );
          }
          return '';
        }),
    ));
  }

  async getNewMessage() {
    const cursorRes = await chatroomModel.getManyTransactionServiceCursor(
        this.userId);

    const lastMessage = await chatroomModel.getManyTransactionRoomLastMessage();

    const cursorParm = lastMessage.map((e) => {
      const cursorItem = cursorRes.find((f) => {
        return e.transactionId === f.transactionId;
      });

      if (cursorItem) {
        return {
          transactionId: cursorItem.transactionId,
          cursor: cursorItem.cursor,
        };
      }

      return {
        transactionId: e.transactionId,
        cursor: 0,
      };
    });

    const unreadList = await chatroomModel.getTransactionUnread(cursorParm);
    const sendData = unreadList.map((e, i) => {
      const msg = lastMessage[i];
      if (msg) {
        return Object.assign(msg, {
          unRead: e,
        });
      }

      return null;
    });

    return sendData;
  }

  async createSubscriberNewMessage() {
    if (this.subscriberNewMessage) {
      await wSClientServiceModel.subscriberQuit(this.subscriberNewMessage);
    }

    this.subscriberNewMessage = await wSClientServiceModel.sub(
        (message: any)=>{
        /** 多人發訊息時會有重複通知，與上一次比較若相同則不發新通知 */

          if (this.preMsg !== message) {
            this.sendNewMessage().then();
          }
          this.preMsg = message;
        });
  }

  static async init(
      ws: WebSocket,
      userId: string,
      userName: string,
      isAgent: boolean,
      isCS: boolean,
  ) {
    const instance = new TransactionLobbyHandler(
        ws,
        userId,
        userName,
        isAgent,
        isCS,
    );
    await instance.sendNewMessage();
    await instance.createSubscriberNewMessage();

    return instance;
  }
}

export class UserChatroomLobbyHandler extends LobbyHandler
  implements LobbyHandlerInterface {
  isCS: boolean;
  userId: string;
  userName: string;

  private constructor(
      ws: WebSocket,
      userId: string,
      userName: string,
      isCS: boolean,
  ) {
    super(
        ws,
    );
    this.userId = userId;
    this.userName = userName;
    this.isCS = isCS;
  }
  override async handleChangeRoomEvent(data: any) {
    if (!data || !data.roomId) {
      return;
    }
    super.handleChangeRoomEvent(
        await UserChatroomHandler.init(
            data.roomId,
            this.userName,
            this.ws,
            this.isCS,
        ),
    );
  }

  async sendNewMessage() {
    this.event.eventName = 'newMessage';
    const sendData = await this.getNewMessage();

    this.ws!.send(this.event.msg(
        sendData.map((e) => {
          if (e) {
            return this.readDataFormat(
                {
                  id: e.id,
                  userId: e.userId,
                  type: e.type,
                  text: e.text,
                  createdAt: e.createdAt,
                  name: e.name,
                  role: e.role,
                  unRead: e.unRead,
                  room: e.userId,
                },
            );
          }
          return '';
        }),
    ));
  }

  async getNewMessage() {
    const cursorRes = await chatroomModel.getManyUserChatroomServiceCursor(
        this.userId);

    const lastMessage = await chatroomModel.getManyUserRoomLastMessage();

    const cursorParm = lastMessage.map((e) => {
      const cursorItem = cursorRes.find((f) => {
        return e.userId === f.userId;
      });

      if (cursorItem) {
        return {
          userId: cursorItem.userId,
          cursor: cursorItem.cursor,
        };
      }

      return {
        userId: e.userId,
        cursor: 0,
      };
    });

    const unreadList = await chatroomModel.getUserChatroomUnread(cursorParm);
    const sendData = unreadList.map((e, i) => {
      const msg = lastMessage[i];
      if (msg) {
        return Object.assign(msg, {
          unRead: e,
        });
      }

      return null;
    });

    return sendData;
  }

  async createSubscriberNewMessage() {
    if (this.subscriberNewMessage) {
      await wSClientServiceModel.subscriberQuit(this.subscriberNewMessage);
    }

    this.subscriberNewMessage = await wSClientServiceModel.sub(
        (message: any)=>{
        /** 多人發訊息時會有重複通知，與上一次比較若相同則不發新通知 */

          if (this.preMsg !== message) {
            this.sendNewMessage().then();
          }
          this.preMsg = message;
        });
  }

  static async init(
      ws: WebSocket,
      userId: string,
      userName: string,
      isCS: boolean,
  ) {
    const instance = new UserChatroomLobbyHandler(
        ws,
        userId,
        userName,
        isCS,
    );
    await instance.sendNewMessage();
    await instance.createSubscriberNewMessage();

    return instance;
  }
}

// chatroom

abstract class ChatroomHandler {
  userId: string;
  userName: string;
  cursor: number;
  ws: WebSocket;
  subscriber: any;
  roomId: string;
  event = new WSEvent('');

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
          self.event.eventName = 'send';

          const data = JSON.parse(message);
          self.ws.send(self.event.msg(self.isSelf(data)));

          self.sendNotify().then();
        },
        this.roomId);
  }

  async sendNotify() {
    this.event.eventName = 'notify';

    const messageList = (await wsClientChatroomModel
        .get(-1, this.roomId!))
        .map((e) => JSON.parse(e));

    this.ws.send(this.event.msg({
      unreadCouunt: messageList.filter((e: any) => {
        return e.id > this.cursor && this.userId !== e.userId;
      }).length,
    }));
    await wSClientServiceModel.pub(JSON.stringify(messageList[0]??''));
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
const cSName = 'CS';
export class UserChatroomHandler extends ChatroomHandler
  implements ChatroomHandlerInterface {
  isCS: boolean;
  isUserRoomId: string;
  private constructor(
      userId: string,
      userName: string,
      ws: WebSocket,
      cursor: number,
      isCS: boolean,
  ) {
    super(
        userId,
        userName,
        cursor,
        ws,
        userId + 'User',
    );
    this.isCS = isCS;
    this.isUserRoomId = userId;
    this.userId = this.isCS?cSName:this.userId;
  }

  static async init(
      userId: string,
      userName: string,
      ws: WebSocket,
      isCS: boolean,
  ) {
    const cursor = await this.getCursor(userId, cSName);
    return new UserChatroomHandler(
        userId,
        userName,
        ws,
        cursor,
        isCS,
    );
  }

  static async getCursor(
      roomId: string,
      userId: string,
  ) {
    const cursorRes = await chatroomModel.getUserCursor(
        roomId,
        userId);
    if (cursorRes) {
      return cursorRes.cursor;
    }
    return 0;
  }

  handleReadEvent() {
    if (this.isUserRoomId) {
      chatroomModel.upsertUserCursor(
          this.isUserRoomId,
          this.userId,
      ).then((res) => {
        this.cursor = res.cursor;
        this.sendNotify().then();
      })
          .catch((e) => {
            console.log(e);
          });
    }
  }

  handleSendEvent(data: any) {
    if (this.userId) {
      data.name = this.userName;
      data.userId = this.userId;
      chatroomModel.createUserChatroomMessage(
          this.userId,
          data.type,
          data.name?? '',
              data.type === 'text'? data.data: '',
            data.type === 'image'? Buffer.from(data.data, 'base64'): undefined,
          this.isCS? 3: 1,
          this.isUserRoomId,
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
    this.event.eventName = 'ready';
    const res = await chatroomModel.getUserChatroomMessages(
        this.isUserRoomId,
    );

    this.ws.send(this.event.msg(
        res.map((e) => {
          const data = this.dataFormat(e);
          return this.isSelf(data);
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
    const cursorRes = await chatroomModel.getUserCursor(
        this.userId,
        this.isCS? cSName: this.isUserRoomId);
    if (cursorRes) {
      return cursorRes.cursor;
    }
    return 0;
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
    this.event.eventName = 'ready';
    const res = await chatroomModel.getTransactionMessages(
          this.transactionId!,
    );

    this.ws.send(this.event.msg(
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
