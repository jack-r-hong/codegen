import WebSocket from 'ws';
import {WSToken, WSOnMessage, MyWebSocketServer, WSEvent} from './base';

// import {
//   PhotoScheduleQueueModel,
//   PhotoSchedulePurifyStartQueueModel,

// } from '../redisClient/models/apiModels';
import {Service, Container} from 'typedi';
import {WSClientIdModel} from '../redisClient/models/webSocketModels';
import {IncomingMessage} from 'http';
import {JSONCookie, signedCookies} from 'cookie-parser';


const wSCIModel = Container.get(WSClientIdModel);
// const pSPSQModel = Container.get(PhotoSchedulePurifyStartQueueModel);

const event = new WSEvent('notify');

@Service({id: WSToken, multiple: true})
export class OnNotifyWS extends MyWebSocketServer implements WSOnMessage {
  wsPath: string = `/${event.eventName}`;

  constructor() {
    super();
    this.events.push(this.onStartMessage);
  }


  onStartMessage(ws: WebSocket, req: IncomingMessage) {
    ws.on('message', async function message(message: string) {
      const data: WSEvent = event.parse(message);
      console.log('notify');
      //   console.log(req.headers.cookie!);

      const cookie = req.headers.cookie;

      if (!cookie) {
        ws.send(event.msg('notAuth'));
        return;
      }

      const cookieParse = parseCookies(cookie);

      if (data.data == 'start') {
        const sessionId = await wSCIModel.get(
            `sess:${getSessionId( cookieParse['JSESSIONID']!)}`);
        console.log(sessionId);
        // const {uid, result} = await wSCIModel.set('sessionId');
        // // console.log( await wSCIModel.get(req.headers.cookie!));


        // if (result === null) {
        //   return;
        // }

        // ws.send(event.msg({uid}));
      }
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
