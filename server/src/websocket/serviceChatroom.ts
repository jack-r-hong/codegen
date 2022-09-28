import WebSocket from 'ws';
import {WSToken, WSOnMessage, MyWebSocketServer, WSEvent} from './base';
import {WSClientIdModel} from '../redisClient/models/webSocketModels';
import {UserModel} from '../apiModules/user/user.model';
import {ChatroomModel}
  from '../apiModules/chatroom/chatroom.model';
import {chatroomKey} from '../jwt';

import {Service, Container} from 'typedi';
import {IncomingMessage} from 'http';
import qs from 'qs';

const event = new WSEvent('service_chatroom');
const wSCIModel = Container.get(WSClientIdModel);
const userModel = Container.get(UserModel);
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

    const tokenV = chatroomKey.tokenVerify(token as string);

    if (!token || !tokenV) {
      ws.send(event.msg({error: true, message: 'notAuth'}));
      return;
    }

    const {userId, userName} =
     tokenV as {userId: string, userName: string };

    const resUser = await userModel.getUserName(userId as string )
        .catch((e) => false);


    if ( !resUser) {
      ws.send(event.msg({error: true, message: 'notAuth'}));
      return;
    }

    const subscriber = await wSCIModel.sub(userId as string,
        (message: any)=>{
          event.eventName = 'send';
          const data = JSON.parse(message);
          data.name = userName;

          data.userId = userId;
          chatroomModel.createServiceMessage(
            userId as string,
            data.type,
            data.name?? '',
            data.text,
            data.type === 'image'? Buffer.from(data.data, 'base64'): undefined,
          ).then((e) => {},
          ).catch((e) => console.log(e),
          );

          ws.send(event.msg(data));
        });

    ws.on('message', async function message(message: string) {
      const data = event.parse(message).data;

      await wSCIModel.pub(
        userId as string,
        JSON.stringify(data),
      );
    });

    event.eventName = 'ready';
    const res = await chatroomModel.getServiceMessages(
        userId as string,
    );

    ws.send(event.msg(
        res.map((e) => {
          return {
            name: e.name,
            userId: e.userId,
            createdAt: e.createdAt,
            text: e.text,
            data: e.type === 'image' && e.data? e.data.toString('base64'): null,
            type: e.type,
          };
        }),
    ));

    const timer = setInterval(() => {
      event.eventName = 'bit';
      // ws.send(event.msg('bit'));
    }, 4000);

    ws.on('close', () => {
      wSCIModel.subscriberQuit(subscriber).then(()=> {});
      clearInterval(timer);
    });
  };
}
