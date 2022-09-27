import WebSocket from 'ws';
import {WSToken, WSOnMessage, MyWebSocketServer, WSEvent} from './base';
import {WSClientTransactionModel} from '../redisClient/models/webSocketModels';
import {UserModel} from '../apiModules/user/user.model';
import {TransactionModel} from '../apiModules/transaction/transaction.model';
import {Service, Container} from 'typedi';
import {IncomingMessage} from 'http';
import qs from 'qs';

const event = new WSEvent('realtime_transaction');
const wSCIModel = Container.get(WSClientTransactionModel);
const userModel = Container.get(UserModel);
const transactionModel = Container.get(TransactionModel);

const getNewData = async (userId: string) => {
  const resPending = await transactionModel.readRealtimeTransaction(
        userId as string, 'pending');

  const resProcessing = await transactionModel.readRealtimeTransaction(
        userId as string, 'processing');

  return {
    pending: resPending,
    processing: resProcessing,
  };
};

@Service({id: WSToken, multiple: true})
export class OnTransactionWS extends MyWebSocketServer implements WSOnMessage {
  wsPath: string = `/${event.eventName}`;

  constructor() {
    super();
    this.events.push(this.onStartMessage);
  }

  async onStartMessage(ws: WebSocket, req: IncomingMessage) {
    const url = req.url;
    console.log(url);

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
    const {login_session: userId} = query;

    const resUser = await userModel.getUserMyStatus({}, {userId})
        .catch((e) => null);

    if (!resUser) {
      ws.send(event.msg({error: true, message: 'notAuth'}));
      return;
    }

    if (!resUser.isAgent) {
      ws.send(event.msg({error: true, message: 'notAuth'}));
      return;
    }

    const subscriber = await wSCIModel.sub(
        async (message: any)=>{
          event.eventName = 'update';
          const d = JSON.parse(message);
          console.log('subscriber realtime_transaction');

          ws.send(event.msg(await getNewData(userId as string)));
        });

    event.eventName = 'ready';
    ws.send(event.msg(await getNewData(userId as string)));

    ws.on('close', () => {
      wSCIModel.subscriberQuit(subscriber).then(()=> {});
    });
  };
}
