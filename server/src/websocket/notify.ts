import WebSocket from 'ws';
import {WSToken, WSOnMessage, MyWebSocketServer, WSEvent} from './base';

import {Service, Container} from 'typedi';
import {WSClientIdModel} from '../redisClient/models/webSocketModels';
import {IncomingMessage} from 'http';
import {NotifyModel} from '../apiModules/notify/notify.model';

const wSCIModel = Container.get(WSClientIdModel);
const notifyModel = Container.get(NotifyModel);

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

      const cookie = req.headers.cookie;

      if (!cookie) {
        ws.send(event.msg('notAuth'));
        return;
      }

      const cookieParse = parseCookies(cookie);

      if (data.data == 'start') {
        const session = await wSCIModel.get(
            `sess:${getSessionId( cookieParse['JSESSIONID']!)}`).catch((e) => {
          console.log(e);
        });


        if (session) {
          console.log(JSON.parse(session));
          if (JSON.parse(session)['userInfo']) {
            const userId = JSON.parse(session)['userInfo']['id'];
            const notifyList = await notifyModel.readManyNotify({
              queryOrderBy: 'desc',
              queryOrderByField: 'id',
              cookieJsessionid: userId,
            });

            console.log(notifyList);

            event.eventName = 'init';
            ws.send(event.msg(notifyList));

            await wSCIModel.sub(userId, (message: any)=>{
              event.eventName = 'sub';
              ws.send(event.msg(message));
              console.log(message);
              console.log('sub');
            });
          }
        }


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
