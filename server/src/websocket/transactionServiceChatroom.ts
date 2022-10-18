import WebSocket from 'ws';
import {WSToken, WSOnMessage, MyWebSocketServer, WSEvent} from './base';
import {
  WSClientChatroomModel,
  WSClientServiceModel} from '../redisClient/models/webSocketModels';
import {ChatroomModel}
  from '../apiModules/chatroom/chatroom.model';
import {Service, Container} from 'typedi';
import {IncomingMessage} from 'http';

const event = new WSEvent('transaction_service_chatroom');
const wsClientChatroomModel = Container.get(WSClientChatroomModel);
const wSClientServiceModel = Container.get(WSClientServiceModel);

const chatroomModel = Container.get(ChatroomModel);

@Service({id: WSToken, multiple: true})
export class OnTransactionWS extends MyWebSocketServer implements WSOnMessage {
  wsPath: string = `/${event.eventName}`;
  transactionId?: string;
  userId?: string;
  userName?: string;
  isAgent?: boolean;
  isCS?: boolean;
  cursor: number = 0;
  messageList? :{
    id: number;
    text: string;
    name: string;
    userId: string;
    role: number;
    transactionId: string;
  }[];
  ws?: WebSocket;
  subscriberNewMessage?: any;
  subscriberRoom?: any;

  constructor() {
    super();
    this.events.push(this.onStartMessage);
  }

  onStartMessage = async (ws: WebSocket, req: IncomingMessage) => {
    this.ws = ws;

    this.userId = 'CS';
    this.userName = 'CS';
    this.isAgent = false;
    this.isCS = true;

    const self = this;

    ws.on('message', async function message(message: string) {
      const data = event.parse(message).data;

      if (data.event === 'send') {
        self.handleSendEvent(data.data);
      }

      if (data.event === 'read') {
        self.handleReadEvent(data.data);
      }

      if (data.event === 'changeRoom') {
        self.handleChangeRoomEvent(data.data);
      }
    });

    await this.sendNewMessage('ready');
    await this.createSubscriberNewMessage();

    const timer = setInterval(() => {
      event.eventName = 'bit';
      ws.send(event.msg('bit'));
    }, 15000);


    ws.on('close', () => {
      wsClientChatroomModel.subscriberQuit(self.subscriberRoom).then(()=> {});
      clearInterval(timer);
    });
  };

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

  readDataFormat = (data: any) => {
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
      transactionId: data.transactionId,
    };
  };

  async sendNewMessage(eventName: 'ready'| 'newMessage') {
    event.eventName = eventName;
    const cursorRes = await chatroomModel.getManyTransactionServiceCursor(
        this.userId!);

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

    this.ws!.send(event.msg(
        sendData.map((e) => {
          return this.readDataFormat(e);
        }),
    ));
  }

  async sendNotify() {
    event.eventName = 'notify';
    const messageList = (await wsClientChatroomModel.get())
        .map((e) => JSON.parse(e));
      this.ws!.send(event.msg({
        unreadCouunt: messageList.filter((e: any) => {
          return e.id > this.cursor && this.userId !== e.userId;
        }).length,
      }));
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
        }));
        wsClientChatroomModel.pub(
            JSON.stringify(this.dataFormat(e)),
        );
      }).catch((e) => console.log(e));
    }
  }

  handleReadEvent(data: any) {
    if (this.transactionId) {
      chatroomModel.upsertTransactionCursor(
          this.transactionId,
            this.userId!,
      );

      this.sendNotify().then();
    }
  }

  isSelf = (data: any) => {
    const res = Object.assign(data, {isSelf: this.userId === data.userId});
    delete res.userId;
    return res;
  };

  async handleChangeRoomEvent(data: any) {
    this.transactionId = data.transactionId;

    event.eventName = 'changeRoom';
    this.createSubscriberRoom();
    const res = await chatroomModel.getTransactionMessages(
        this.transactionId!,
    );

    this.ws!.send(event.msg(
        res.map((e) => {
          return this.isSelf(this.dataFormat(e));
        }),
    ));

    for (const e of res) {
      e.data = null;
    }

    if ((await wsClientChatroomModel.get()).length === 0) {
      for (const e of res) {
        await wsClientChatroomModel.push(JSON.stringify({
          id: e.id,
          userId: e.userId,
        }));
      }
    }
  }

  async createSubscriberRoom() {
    const self = this;

    if (this.subscriberRoom) {
      wsClientChatroomModel.subscriberQuit(this.subscriberRoom).then(()=> {});
    }

    this.subscriberRoom = await wsClientChatroomModel.sub(
        (message: any)=>{
          event.eventName = 'send';
          const data = JSON.parse(message);
          self.ws!.send(event.msg(self.isSelf(data)));

          self.sendNotify().then();
        });
  }

  async createSubscriberNewMessage() {
    const self = this;

    if (this.subscriberNewMessage) {
      wSClientServiceModel.subscriberQuit(this.subscriberNewMessage)
          .then(()=> {});
    }

    this.subscriberNewMessage = await wSClientServiceModel.sub(
        (message: any)=>{
          self.sendNewMessage('newMessage').then();
        });
  }
}
