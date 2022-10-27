import WebSocket from 'ws';
import {WSToken, WSOnMessage, MyWebSocketServer, WSEvent} from './base';
import {Service} from 'typedi';
import {IncomingMessage} from 'http';
import {UserChatroomHandler} from './chatroomHandler';

const event = new WSEvent('user_chatroom');

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
    const token = this.checkToken(url);

    if (!token) {
      ws.send(event.msg({error: true, message: 'notAuth'}));
      return;
    }

    const {userId, userName, isCS} =
    token as {userId: string, userName: string,
      transactionId: string, isAgent: boolean, isCS: boolean};

    const wsHandler = await UserChatroomHandler.init(
        userId,
        userName,
        ws,
        isCS,
    );

    ws.on('message', async function message(message: string) {
      const data = event.parse(message).data;

      if (data.event === 'send') {
        wsHandler.handleSendEvent(data.data);
      }

      if (data.event === 'read') {
        wsHandler.handleReadEvent();
      }
    });

    await wsHandler.readySend();

    await wsHandler.sendNotify();

    const timer = setInterval(() => {
      ws.send(JSON.stringify({'event': 'bit', 'data': 'bit'}));
    }, 15000);

    ws.on('close', () => {
      wsHandler.subscriberQuit();
      clearInterval(timer);
    });
  };
}
