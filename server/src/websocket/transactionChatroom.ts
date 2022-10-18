import WebSocket from 'ws';
import {WSToken, WSOnMessage, MyWebSocketServer, WSEvent} from './base';
import {
  WSClientChatroomModel} from '../redisClient/models/webSocketModels';
import {ChatroomModel}
  from '../apiModules/chatroom/chatroom.model';
import {Service, Container} from 'typedi';
import {IncomingMessage} from 'http';
import {TransactionChatroomHandler} from './chatroomHandler';

const event = new WSEvent('transaction_chatroom');
const wsClientChatroomModel = Container.get(WSClientChatroomModel);
const chatroomModel = Container.get(ChatroomModel);

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
    }

    const {userId, userName, transactionId, isAgent, isCS} =
    token as {userId: string, userName: string,
      transactionId: string, isAgent: boolean, isCS: boolean};

    const cursorRes = await chatroomModel.getTransactionCursor(
        transactionId, userId);
    let cursor = 0;
    if (cursorRes) {
      cursor = cursorRes.cursor;
    }

    const wsHandle = new TransactionChatroomHandler(
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
      wsClientChatroomModel.subscriberQuit(wsHandle.subscriber).then(()=> {});
      clearInterval(timer);
    });
  };
}
