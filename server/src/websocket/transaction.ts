import WebSocket from 'ws';
import {WSToken, WSOnMessage, MyWebSocketServer, WSEvent} from './base';
import {WSClientIdModel} from '../redisClient/models/webSocketModels';

import {Service, Container} from 'typedi';
import {IncomingMessage} from 'http';

const event = new WSEvent('transaction');
const wSCIModel = Container.get(WSClientIdModel);

@Service({id: WSToken, multiple: true})
export class OnTransactionWS extends MyWebSocketServer implements WSOnMessage {
  wsPath: string = `/${event.eventName}`;

  constructor() {
    super();
    this.events.push(this.onStartMessage);
  }

  async onStartMessage(ws: WebSocket, req: IncomingMessage) {
    const cookie = req.headers.cookie;

    if (!cookie) {
      ws.send(event.msg('notAuth'));
      return;
    }

    const cookieParse = parseCookies(cookie);

    const session = await wSCIModel.get(
        `sess:${getSessionId( cookieParse['JSESSIONID']!)}`);

    if (!session) {
      ws.send(event.msg('notAuth'));
      return;
    }

    if (!JSON.parse(session)['userInfo']) {
      ws.send(event.msg('notAuth'));
      return;
    }

    const userId = JSON.parse(session)['userInfo']['id'];

    const subscriber = await wSCIModel.sub(userId, (message: any)=>{
      event.eventName = 'process';
      ws.send(event.msg(JSON.parse(message)));
    });
    event.eventName = 'ready';

    ws.send(event.msg({ready: true}));

    ws.on('close', () => {
      wSCIModel.subscriberQuit(subscriber).then(()=> {});
    });
  };
}

function parseCookies(cookie: string) : {[key: string]: string} {
  const list: any = {};
  const cookieHeader = cookie;
  if (!cookieHeader) return list;

  cookieHeader.split(`;`).forEach(function(cookie: string) {
    let [name, ...rest] = cookie.split(`=`);
    name = name?.trim();
    if (!name) return;
    const value = rest.join(`=`).trim();
    if (!value) return;
    list[name] = decodeURIComponent(value);
  });

  return list;
}


function getSessionId(val: string) {
  return val.substring(2, val.indexOf('.'));
}

