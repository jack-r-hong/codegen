import WebSocket from 'ws';
import {WSToken, WSOnMessage, MyWebSocketServer, WSEvent} from './base';
import {WSClientIdModel} from '../redisClient/models/webSocketModels';
import {ChatroomModel}
  from '../apiModules/chatroom/chatroom.model';
import {chatroomKey} from '../jwt';
import {Service, Container} from 'typedi';
import {IncomingMessage} from 'http';
import qs from 'qs';

const event = new WSEvent('transaction_chatroom');
const wSCIModel = Container.get(WSClientIdModel);
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

    const subscriber = await wSCIModel.sub(transactionId + 'chatroom',
        (message: any)=>{
          event.eventName = 'send';
          const data = JSON.parse(message);
          ws.send(event.msg(self.isSelf(data)));

          self.sendNotify();
        });

    ws.on('message', async function message(message: string) {
      const data = event.parse(message).data;

      if (data.event === 'send') {
        self.handleSendEvent(data.data);
      }

      if (data.event === 'read') {
        self.handleReadEvent(data.data);
      }
    });

    event.eventName = 'ready';
    const res = await chatroomModel.getTransactionMessages(
        transactionId,
    );

    ws.send(event.msg(
        res.map((e) => {
          return this.isSelf(this.dataFormat(e));
        }),
    ));

    for (const e of res) {
      e.data = null;
    }

    this.messageList = res;

    this.sendNotify();

    const timer = setInterval(() => {
      event.eventName = 'bit';
      ws.send(event.msg('bit'));
    }, 15000);

    ws.on('close', () => {
      wSCIModel.subscriberQuit(subscriber).then(()=> {});
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
      read: false,
    };
  };

  /**
   * 之後改用redis存
   */
  sendNotify() {
    event.eventName = 'notify';
    this.ws!.send(event.msg({
      unreadCouunt: this.messageList?.filter((e) => {
        return e.id > this.cursor && this.userId !== e.userId;
      }).length,
    }));
  }

  handleSendEvent(data: any) {
    data.name = this.userName;
    data.userId = this.userId;
    chatroomModel.createTransactionMessage(
        this.transactionId!,
        this.userId!,
        data.type,
        data.name?? '',
      data.type === 'text'? data.data: '',
    data.type === 'image'? Buffer.from(data.data, 'base64'): undefined,
    this.isAgent? 2: (this.isCS? 3: 1),
    ).then((e) => {
      this.messageList?.push(e);
      wSCIModel.pub(
          this.transactionId + 'chatroom',
          JSON.stringify(this.dataFormat(e)),
      );
    }).catch((e) => console.log(e));
  }

  handleReadEvent(data: any) {
    chatroomModel.upsertTransactionCursor(
      this.transactionId!,
      this.userId!,
      data.cursor,
    );

    this.sendNotify();
  }

  isSelf = (data: any) => {
    const res = Object.assign(data, {isSelf: this.userId === data.userId});
    delete res.userId;
    return res;
  };
}
