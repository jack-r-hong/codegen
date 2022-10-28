import WebSocket from 'ws';
import {WSToken, WSOnMessage, MyWebSocketServer, WSEvent} from '../base';
import {WSClientChatroomModel} from '../../redisClient/models/webSocketModels';
import {Service, Container} from 'typedi';
import {IncomingMessage} from 'http';
import {UserChatroomLobbyHandler} from './chatroomHandler';

const event = new WSEvent('user_service_chatroom');
const wsClientChatroomModel = Container.get(WSClientChatroomModel);

@Service({id: WSToken, multiple: true})
export class OnTransactionWS extends MyWebSocketServer implements WSOnMessage {
  wsPath: string = `/${event.eventName}`;
  userId?: string;
  userName?: string;
  isCS?: boolean;
  ws?: WebSocket;
  subscriberRoom?: any;

  constructor() {
    super();
    this.events.push(this.onStartMessage);
  }

  onStartMessage = async (ws: WebSocket, req: IncomingMessage) => {
    this.ws = ws;

    this.userId = 'CS';
    this.userName = 'CS';
    this.isCS = true;

    const self = this;

    const lobbyHandler = await UserChatroomLobbyHandler.init(
        ws,
        this.userId,
        this.userName,
        true,
    );

    ws.on('message', async function message(message: string) {
      const data = event.parse(message).data;

      if (data.event === 'send') {
        if (lobbyHandler.chatroomHandler) {
          lobbyHandler.chatroomHandler.handleSendEvent(data.data);
        }
      }

      if (data.event === 'read') {
        if (lobbyHandler.chatroomHandler) {
          lobbyHandler.chatroomHandler.handleReadEvent();
        }
      }

      if (data.event === 'changeRoom') {
        lobbyHandler.handleChangeRoomEvent(data.data);
      }
    });

    const timer = setInterval(() => {
      event.eventName = 'bit';
      ws.send(event.msg('bit'));
    }, 15000);

    ws.on('close', () => {
      wsClientChatroomModel.subscriberQuit(self.subscriberRoom).then(()=> {});
      clearInterval(timer);
    });
  };
}
