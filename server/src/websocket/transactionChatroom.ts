import WebSocket from 'ws';
import {WSToken, WSOnMessage, MyWebSocketServer, WSEvent} from './base';
import {WSClientIdModel} from '../redisClient/models/webSocketModels';
import {UserModel} from '../apiModules/user/user.model';
import {TransactionModel} from '../apiModules/transaction/transaction.model';

import {Service, Container} from 'typedi';
import {IncomingMessage} from 'http';
import qs from 'qs';

const event = new WSEvent('transaction_chatroom');
const wSCIModel = Container.get(WSClientIdModel);
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

    let isAgent = false;
    const resUser = await userModel.getUserMyStatus({}, {userId})
        .catch((e) => false);
    const resTran = await transactionModel
        .readOneTransaction({pathId: transactionId as string})
        .catch((e) => false);

    if (!resTran || !resUser) {
      ws.send(event.msg({error: true, message: 'notAuth'}));
      return;
    }
    if (resUser && (resUser as {userStatus: number;}).userStatus > 9) {
      isAgent = true;
    }

    const subscriber = await wSCIModel.sub(transactionId as string,
        (message: any)=>{
          event.eventName = 'process';
          const d = JSON.parse(message);
          d.isAgent = isAgent;
          ws.send(event.msg(d));
          if (d.state === 4 || d.state === 0) {
            wSCIModel.subscriberQuit(subscriber).then(()=> {});
            setTimeout(() => {
              ws.close();
            }, 5000);
          }
        });

    event.eventName = 'ready';
    ws.send(event.msg({
      isAgent,
      state: resTran.state,
      bos: resTran.bos,
      ready: true,
    }));

    ws.on('close', () => {
      wSCIModel.subscriberQuit(subscriber).then(()=> {});
    });
  };
}
