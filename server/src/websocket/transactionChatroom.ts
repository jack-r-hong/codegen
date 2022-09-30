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

  constructor() {
    super();
    this.events.push(this.onStartMessage);
  }

  async onStartMessage(ws: WebSocket, req: IncomingMessage) {
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

    const {userId, userId2, userName, transactionId, isAgent} =
     tokenV as {userId: string, userId2: string, userName: string,
      transactionId: string, isAgent: boolean};

    const dataFormat = (data: any) => {
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

    const isSelf = (data: any) => {
      const res = Object.assign(data, {isSelf: userId === data.userId});
      delete res.userId;
      return res;
    };
    const subscriber = await wSCIModel.sub(transactionId + 'chatroom',
        (message: any)=>{
          event.eventName = 'send';
          const data = JSON.parse(message);
          ws.send(event.msg(isSelf(data)));
        });

    ws.on('message', async function message(message: string) {
      const data = event.parse(message).data;
      data.name = userName;

      data.userId = userId;
      chatroomModel.createTransactionMessage(
          transactionId,
          userId,
          data.type,
          data.name?? '',
        data.type === 'text'? data.data: '',
      data.type === 'image'? Buffer.from(data.data, 'base64'): undefined,
      isAgent? 2: 1,
      ).then((e) => {
        wSCIModel.pub(
            transactionId + 'chatroom',
            JSON.stringify(dataFormat(e)),
        );
      }).catch((e) => console.log(e));
    });

    event.eventName = 'ready';
    const res = await chatroomModel.getTransactionMessages(
        transactionId,
    );
    console.log(res);


    ws.send(event.msg(
        res.map((e) => {
          return isSelf(dataFormat(e));
        }),
    ));

    const timer = setInterval(() => {
      event.eventName = 'bit';
      ws.send(event.msg('bit'));
    }, 4000);

    ws.on('close', () => {
      wSCIModel.subscriberQuit(subscriber).then(()=> {});
      clearInterval(timer);
    });
  };
}
