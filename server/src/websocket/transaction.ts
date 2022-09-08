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
      ws.send(event.msg({error: true, message: 'notAuth'}));
      return;
    }

    const cookieParse = parseCookies(cookie);

    const session = await wSCIModel.get(
        `sess:${getSessionId( cookieParse['JSESSIONID']!)}`);

    const sessionJson = JSON.parse(session!);
    if (!session || !sessionJson || !sessionJson['userInfo']) {
      ws.send(event.msg({error: true, message: 'notAuth'}));
      return;
    }

    const userId = JSON.parse(session)['userInfo']['id'];
    let isProxy = false;

    if (sessionJson['transaction']) {
      if (sessionJson['transaction'].receiveUserId === userId) {
        isProxy = true;
      }
    }

    const subscriber = await wSCIModel.sub(userId, (message: any)=>{
      event.eventName = 'process';
      const d = JSON.parse(message);
      d.isProxy = isProxy;
      ws.send(event.msg(d));
      if (d.process === 4) {
        wSCIModel.subscriberQuit(subscriber).then(()=> {});
        ws.close();
      }
    });

    console.log(sessionJson);

    event.eventName = 'ready';
    ws.send(event.msg({
      isProxy,
      // process: sessionJson['transaction'].process,
      // bos: sessionJson['transaction'].bos,
      ready: true,
    }));

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

