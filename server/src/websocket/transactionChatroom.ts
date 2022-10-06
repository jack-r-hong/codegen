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
  client: any = {};

  constructor() {
    super();
    this.events.push(this.onStartMessage);
  }

  onStartMessage = async (ws: WebSocket, req: IncomingMessage) => {
    const url = req.url;
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

    const cursorRes = await chatroomModel.getTransactionCursor(
        transactionId, userId);
    let cursor = 0;
    if (cursorRes) {
      cursor = cursorRes.cursor;
    }

    const wsHandle = new WebSocketHanddle(
        userId,
        transactionId,
        userName,
        isAgent,
        isCS,
        cursor,
        ws,
    );

    ws.on('message', async function message(message: string) {
      const data = event.parse(message).data;

      if (data.event === 'send') {
        wsHandle.handleSendEvent(data.data);
      }

      if (data.event === 'read') {
        wsHandle.handleReadEvent();
      }
    });

    await wsHandle.readySend();

    await wsHandle.sendNotify();

    const timer = setInterval(() => {
      event.eventName = 'bit';
      ws.send(event.msg('bit'));
    }, 15000);

    ws.on('close', () => {
      wSCIModel.subscriberQuit(wsHandle.subscriber).then(()=> {});
      clearInterval(timer);
    });
  };
}

class WebSocketHanddle {
  userId: string;
  transactionId: string;
  userName: string;
  isAgent: boolean;
  isCS: boolean;
  cursor: number = 0;
  ws: WebSocket;
  subscriber: any;

  constructor(
      userId: string,
      transactionId: string,
      userName: string,
      isAgent: boolean,
      isCS: boolean,
      cursor: number,
      ws: WebSocket,
  ) {
    this.userId = userId;
    this.transactionId = transactionId;
    this.userName = userName;
    this.isAgent = isAgent;
    this.isCS = isCS;
    this.cursor = cursor;
    this.ws = ws;
    this.createSubscriber().then((sub) => {
      this.subscriber = sub;
    });
  }

  isSelf = (data: any) => {
    const res = Object.assign(data, {isSelf: this.userId === data.userId});
    delete res.userId;
    return res;
  };

  async createSubscriber() {
    const self = this;
    return await wSCIModel.sub(
        (message: any)=>{
          event.eventName = 'send';
          const data = JSON.parse(message);
          self.ws.send(event.msg(self.isSelf(data)));

          self.sendNotify().then();
        },
        this.transactionId);
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
        wSCIModel.push(JSON.stringify({
          id: e.id,
          userId: e.userId,
        }), this.transactionId);
        wSCIModel.pub(
            JSON.stringify(this.dataFormat(e)),
            this.transactionId,
        );
      }).catch((e) => console.log(e));
    }
  }

  async sendNotify() {
    event.eventName = 'notify';
    // console.log(this.cursor);

    const messageList = (await wSCIModel.get(-1, this.transactionId!))
        .map((e) => JSON.parse(e));
    // console.log(messageList);

    this.ws.send(event.msg({
      unreadCouunt: messageList.filter((e: any) => {
        return e.id > this.cursor && this.userId !== e.userId;
      }).length,
    }));
    await wSClientServiceModel.pub('');
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

    if ((await wSCIModel.get(-1, this.transactionId!)).length === 0) {
      for (const e of res) {
        await wSCIModel.push(JSON.stringify({
          id: e.id,
          userId: e.userId,
        }), this.transactionId);
      }
    }
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
}
