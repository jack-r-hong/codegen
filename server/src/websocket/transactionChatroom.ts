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

    const {userId, userName, transactionId, isAgent} =
     tokenV as {userId: string, userName: string,
      transactionId: string, isAgent: boolean};

    const dataFormat = (data: any) => {
      // console.log(data.userId, userId, userId === data.userId);

      return {
        data: data.type === 'image' && data.data?
          data.data.toString('base64'): data.text,
        type: data.type,
        time: data.createdAt,
        name: data.name,
        role: isAgent? 2: 1,
        isSelf: userId === data.userId,
      };
    };
    const subscriber = await wSCIModel.sub(transactionId + 'chatroom',
        (message: any)=>{
          event.eventName = 'send';
          const data = JSON.parse(message);
          data.name = userName;

          data.userId = userId;
          chatroomModel.createTransactionMessage(
              transactionId,
              userId,
              data.type,
              data.name?? '',
              data.type === 'text'? data.data: '',
            data.type === 'image'? Buffer.from(data.data, 'base64'): undefined,
          ).then((e) => {
            ws.send(event.msg(dataFormat(e)));
          },
          ).catch((e) => console.log(e),
          );
        });

    ws.on('message', async function message(message: string) {
      const data = event.parse(message).data;

      await wSCIModel.pub(
          transactionId + 'chatroom',
          JSON.stringify(data),
      );
    });

    event.eventName = 'ready';
    const res = await chatroomModel.getTransactionMessages(
        transactionId,
    );

    ws.send(event.msg(
        res.map((e) => {
          return dataFormat(e);
        }),
    ));

    ws.on('close', () => {
      wSCIModel.subscriberQuit(subscriber).then(()=> {});
    });
  };
}
