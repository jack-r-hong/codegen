import WebSocket from 'ws';
import {WSToken, WSOnMessage, MyWebSocketServer, WSEvent} from './base';
import {Service} from 'typedi';
import {IncomingMessage} from 'http';
import {OnCustomerService} from './eventEmit';

const notify = {
  currentPage: '',
  userChatroom: false,
  transactionChatroom: false,
};

const eventEmitter = new OnCustomerService();
const getNotify = () => {
  return notify;
};

eventEmitter.on((msg) => {
  if (
    msg === 'transactionChatroom' &&
    getNotify().currentPage !== 'transactionChatroom'
  ) {
    notify.transactionChatroom = true;
  } else if (
    msg === 'userChatroom' &&
    getNotify().currentPage !== 'userChatroom'
  ) {
    notify.userChatroom = true;
  }
});


@Service({id: WSToken, multiple: true})
export class OnTransactionWS extends MyWebSocketServer implements WSOnMessage {
  wsPath: string = `/custom_service/notify`;
  eventEmitter = new OnCustomerService();

  constructor() {
    super();
    this.events.push(this.onStartMessage);
  }

  async onStartMessage(ws: WebSocket, req: IncomingMessage) {
    const url = req.url;
    console.log(url);

    const event = new WSEvent('custom_service/notify');
    const eventEmitter = new OnCustomerService();

    eventEmitter.on((msg) => {
      if (
        msg === 'transactionChatroom' &&
        getNotify().currentPage !== 'transactionChatroom'
      ) {
        notify.transactionChatroom = true;
        ws.send(event.msg(getNotify()));
      } else if (
        msg === 'userChatroom' &&
        getNotify().currentPage !== 'userChatroom'
      ) {
        notify.userChatroom = true;
        ws.send(event.msg(getNotify()));
      }
    });

    ws.on('message', (msg: string) => {
      const data = event.parse(msg).data;
      if (data.event === 'changePage') {
        notify.currentPage = data.data.page;
        if (data.data.page === 'transactionChatroom') {
          notify.transactionChatroom = false;
        } else if (data.data.page === 'userChatroom') {
          notify.userChatroom = false;
        }
        ws.send(event.msg(getNotify()));
      }
    });

    event.eventName = 'notify';
    ws.send(event.msg(getNotify()));

    const timer = setInterval(() => {
      ws.send(JSON.stringify({'event': 'bit', 'data': 'bit'}));
    }, 4000);

    ws.on('close', () => {
      clearInterval(timer);
    });
  };
}
