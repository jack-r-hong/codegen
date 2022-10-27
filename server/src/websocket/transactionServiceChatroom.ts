import WebSocket from 'ws';
import {WSToken, WSOnMessage, MyWebSocketServer, WSEvent} from './base';
import {
  WSClientChatroomModel,
  WSClientServiceModel} from '../redisClient/models/webSocketModels';
import {ChatroomModel}
  from '../apiModules/chatroom/chatroom.model';
import {Service, Container} from 'typedi';
import {IncomingMessage} from 'http';
import {RobbyHandler} from './chatroomHandler';

const event = new WSEvent('transaction_service_chatroom');
const wsClientChatroomModel = Container.get(WSClientChatroomModel);
const wSClientServiceModel = Container.get(WSClientServiceModel);

const chatroomModel = Container.get(ChatroomModel);

@Service({id: WSToken, multiple: true})
export class OnTransactionWS extends MyWebSocketServer implements WSOnMessage {
  wsPath: string = `/${event.eventName}`;
  transactionId?: string;
  userId?: string;
  userName?: string;
  isAgent?: boolean;
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
    this.isAgent = false;
    this.isCS = true;

    const self = this;

    const robbyHandler = new RobbyHandler(
        ws,
        this.userId,
        this.userName,
        false,
        true,
    );

    ws.on('message', async function message(message: string) {
      const data = event.parse(message).data;

      if (data.event === 'send') {
        if (robbyHandler.chatroomHandler) {
          robbyHandler.chatroomHandler.handleSendEvent(data.data);
        }
      }

      if (data.event === 'read') {
        if (robbyHandler.chatroomHandler) {
          robbyHandler.chatroomHandler.handleReadEvent();
        }
      }

      if (data.event === 'changeRoom') {
        robbyHandler.handleChangeRoomEvent(data.data);
      }
    });

    await robbyHandler.sendNewMessage('ready');
    await robbyHandler.createSubscriberNewMessage();

    const timer = setInterval(() => {
      event.eventName = 'bit';
      ws.send(event.msg('bit'));
    }, 15000);

    ws.on('close', () => {
      wsClientChatroomModel.subscriberQuit(self.subscriberRoom).then(()=> {});
      clearInterval(timer);
    });
  };

  // readDataFormat = (data: any) => {
  //   return {
  //     id: data.id,
  //     userId: data.userId,
  //     data: data.type === 'image'?
  //         '傳送了一張圖片': data.text,
  //     type: data.type,
  //     time: data.createdAt,
  //     name: data.name,
  //     role: data.role,
  //     unRead: data.unRead,
  //     transactionId: data.transactionId,
  //   };
  // };

  // async sendNewMessage(eventName: 'ready'| 'newMessage') {
  //   event.eventName = eventName;
  //   const cursorRes = await chatroomModel.getManyTransactionServiceCursor(
  //       this.userId!);

  //   const lastMessage = await chatroomModel.getManyTransactionRoomLastMessage();

  //   const cursorParm = lastMessage.map((e) => {
  //     const cursorItem = cursorRes.find((f) => {
  //       return e.transactionId === f.transactionId;
  //     });

  //     if (cursorItem) {
  //       return {
  //         transactionId: cursorItem.transactionId,
  //         cursor: cursorItem.cursor,
  //       };
  //     }

  //     return {
  //       transactionId: e.transactionId,
  //       cursor: 0,
  //     };
  //   });

  //   const unreadList = await chatroomModel.getTransactionUnread(cursorParm);
  //   const sendData = unreadList.map((e, i) => {
  //     const msg = lastMessage[i];
  //     if (msg) {
  //       return Object.assign(msg, {
  //         unRead: e,
  //       });
  //     }

  //     return null;
  //   });

  //   this.ws!.send(event.msg(
  //       sendData.map((e) => {
  //         return this.readDataFormat(e);
  //       }),
  //   ));
  // }

  // async createSubscriberNewMessage() {
  //   const self = this;

  //   if (this.subscriberNewMessage) {
  //     wSClientServiceModel.subscriberQuit(this.subscriberNewMessage)
  //         .then(()=> {});
  //   }

  //   this.subscriberNewMessage = await wSClientServiceModel.sub(
  //       (message: any)=>{
  //         self.sendNewMessage('newMessage').then();
  //       });
  // }
}
