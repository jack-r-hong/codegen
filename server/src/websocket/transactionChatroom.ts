import WebSocket from 'ws';
import {WSToken, WSOnMessage, MyWebSocketServer, WSEvent} from './base';
import {WSClientQueueModel} from '../redisClient/models/webSocketModels';
import {UserModel} from '../apiModules/user/user.model';
import {TransactionModel} from '../apiModules/transaction/transaction.model';

import {Service, Container} from 'typedi';
import {IncomingMessage} from 'http';
import qs from 'qs';
import {json} from 'body-parser';

const event = new WSEvent('transaction_chatroom');
const wSCIModel = Container.get(WSClientQueueModel);
const userModel = Container.get(UserModel);
const transactionModel = Container.get(TransactionModel);


@Service({id: WSToken, multiple: true})
export class OnTransactionWS extends MyWebSocketServer implements WSOnMessage {
  wsPath: string = `/${event.eventName}`;

  constructor() {
    super();
    this.events.push(this.onStartMessage);
  }

  async onStartMessage(ws: WebSocket, req: IncomingMessage) {
    const url = req.url;


    if (!url) {
      ws.send(event.msg({error: true, message: 'notAuth'}));
      return;
    }

    const queryString = url.split('?')[1];
    if (!queryString) {
      ws.send(event.msg({error: true, message: 'notAuth'}));
      return;
    }

    const query = qs.parse(queryString);
    const {login_session: userId, transaction_id: transactionId} = query;
    console.log(userId, transactionId);

    // 判斷 is agent

    const resUser = await userModel.getUserName(userId as string )
        .catch((e) => false);

    const resTran = await transactionModel
        .readOneTransaction({pathId: transactionId as string})
        .catch((e) => false);

    if (!resTran || !resUser) {
      ws.send(event.msg({error: true, message: 'notAuth'}));
      return;
    }
    
    const subscriber = await wSCIModel.sub(transactionId as string,
        (message: any)=>{
          event.eventName = 'send';
          const data = JSON.parse(message);
          data.name = (resUser as {name: string}).name;
          ws.send(event.msg(data));

          wSCIModel.push(JSON.stringify(data));
        });

    ws.on('message', async function message(message: string) {
      const data = event.parse(message).data;

      await wSCIModel.pub(
          transactionId as string,
          JSON.stringify(data),
      );
    });

    event.eventName = 'ready';
    const all = await wSCIModel.get();
    ws.send(event.msg(
        all.map((e) => JSON.parse(e)),
    ));

    ws.on('close', () => {
      wSCIModel.subscriberQuit(subscriber).then(()=> {});
    });
  };

  getHistory() {

  }

  setHistory() {

  }
}
