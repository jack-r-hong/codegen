import WebSocket from 'ws';
import {WSToken, WSOnMessage, MyWebSocketServer, WSEvent} from './base';
import {WSClientIdModel} from '../redisClient/models/webSocketModels';
import {ChatroomModel}
  from '../apiModules/chatroom/chatroom.model';

import {Service, Container} from 'typedi';
import {IncomingMessage} from 'http';

const event = new WSEvent('service_chatroom');
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
    const token = this.checkToken(url);
    if (!token) {
      ws.send(event.msg({error: true, message: 'notAuth'}));
    }

    const {userId, userName} =
    token as {userId: string, userName: string };

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
