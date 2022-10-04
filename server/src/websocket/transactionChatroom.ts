import WebSocket from 'ws';
import {WSToken, WSOnMessage, MyWebSocketServer, WSEvent} from './base';
import {
  WSClientTransactionModel,
  WSClientServiceModel} from '../redisClient/models/webSocketModels';
import {ChatroomModel}
  from '../apiModules/chatroom/chatroom.model';
import {chatroomKey} from '../jwt';
import {Service, Container} from 'typedi';
import {IncomingMessage} from 'http';
import qs from 'qs';

const event = new WSEvent('transaction_chatroom');
const wSCIModel = Container.get(WSClientTransactionModel);
const chatroomModel = Container.get(ChatroomModel);
const wSClientServiceModel = Container.get(WSClientServiceModel);

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
  subscriber?: any;

  constructor() {
    super();
    this.events.push(this.onStartMessage);
  }

  onStartMessage = async (ws: WebSocket, req: IncomingMessage) => {
    const url = req.url;
    this.ws = ws;
    if (!url) {
      ws.send(event.msg({error: true, message: 'notAuth'}));
      return;
    }

    const queryString = url.split('?')[1];

    if (!queryString) {
      ws.send(event.msg({error: true, message: 'notAuth'}));
      return;
    }

    const query = qs.parse(queryString);
    const {token} = query;

    if (!token) {
      ws.send(event.msg({error: true, message: 'notAuth'}));
      return;
    }

    const tokenV = chatroomKey.tokenVerify(token as string);

    if (!token || !tokenV) {
      ws.send(event.msg({error: true, message: 'notAuth'}));
      return;
    }

    const {userId, userName, transactionId, isAgent, isCS} =
     tokenV as {userId: string, userName: string,
      transactionId: string, isAgent: boolean, isCS: boolean};

    this.userId = userId;
    this.transactionId = transactionId;
    this.userName = userName;
    this.isAgent = isAgent;
    this.isCS = isCS;

    const cursorRes = await chatroomModel.getTransactionCursor(
        this.transactionId, this.userId);
    if (cursorRes) {
      this.cursor = cursorRes.cursor;
    }

    const self = this;
    await this.createSubscriber();

    ws.on('message', async function message(message: string) {
      const data = event.parse(message).data;

      if (data.event === 'send') {
        self.handleSendEvent(data.data);
      }

      if (data.event === 'read') {
        self.handleReadEvent(data.data);
      }
    });

    await this.readySend();

    await this.sendNotify();

    const timer = setInterval(() => {
      event.eventName = 'bit';
      ws.send(event.msg('bit'));
    }, 15000);

    ws.on('close', () => {
      wSCIModel.subscriberQuit(self.subscriber).then(()=> {});
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

  async readySend() {
    event.eventName = 'ready';
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

    if ((await wSCIModel.get()).length === 0) {
      for (const e of res) {
        await wSCIModel.push(JSON.stringify({
          id: e.id,
          userId: e.userId,
        }));
      }
    }
  }

  async sendNotify() {
    event.eventName = 'notify';
    const messageList = (await wSCIModel.get()).map((e) => JSON.parse(e));
      this.ws!.send(event.msg({
        unreadCouunt: messageList.filter((e: any) => {
          return e.id > this.cursor && this.userId !== e.userId;
        }).length,
      }));
      await wSClientServiceModel.pub('');
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
        wSCIModel.push(JSON.stringify({
          id: e.id,
          userId: e.userId,
        }));
        wSCIModel.pub(
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

  async createSubscriber() {
    const self = this;
    this.subscriber = await wSCIModel.sub(
        (message: any)=>{
          event.eventName = 'send';
          const data = JSON.parse(message);
          self.ws!.send(event.msg(self.isSelf(data)));

          self.sendNotify().then();
        });
  }

  isSelf = (data: any) => {
    const res = Object.assign(data, {isSelf: this.userId === data.userId});
    delete res.userId;
    return res;
  };
}
