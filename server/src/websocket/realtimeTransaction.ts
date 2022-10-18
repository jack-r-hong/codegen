import WebSocket from 'ws';
import {WSToken, WSOnMessage, MyWebSocketServer, WSEvent} from './base';
import {
  WSClientRealModel} from '../redisClient/models/webSocketModels';
import {UserModel} from '../apiModules/user/user.model';
import {TransactionModel} from '../apiModules/transaction/transaction.model';
import {Service, Container} from 'typedi';
import {IncomingMessage} from 'http';
import qs from 'qs';

const event = new WSEvent('realtime_transaction');
const wsClientRealModel = Container.get(WSClientRealModel);
const userModel = Container.get(UserModel);
const transactionModel = Container.get(TransactionModel);


const getNewData = async (userId: string) => {
  const resPending = await transactionModel.readRealtimeTransaction(
        userId as string, 'pending');

  const resProcessing = await transactionModel.readRealtimeTransaction(
        userId as string, 'processing');
  const resFailed = await transactionModel.readRealtimeTransaction(
          userId as string, 'failed');

  const {dollars, point, orderCount} =
  await transactionModel.readRealtimeCountTransaction( userId as string);

  return {
    dollars,
    point,
    orderCount,
    pending: resPending.map((e) => {
      const res = e;
      return Object.assign(res, {remark: 'remark'});
    }),
    processing: resProcessing.map((e) => {
      const res = e;
      return Object.assign(res, {remark: 'remark'});
    }),
    failed: resFailed.map((e) => {
      const res = e;
      return Object.assign(res, {remark: 'remark'});
    }),
  };
};

// (async () => {
//   console.log(await getNewData('2f556fc1-1888-4123-844c-3344ef535235'));
// })();


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

    const subscriber = await wsClientRealModel.sub(
        async (message: any)=>{
          event.eventName = 'update';
          const d = JSON.parse(message);

          ws.send(event.msg(await getNewData(userId as string)));
        });

    event.eventName = 'ready';
    ws.send(event.msg(await getNewData(userId as string)));

    const timer = setInterval(() => {
      event.eventName = 'bit';
      ws.send(event.msg('bit'));
    }, 4000);

    ws.on('close', () => {
      wsClientRealModel.subscriberQuit(subscriber).then(()=> {});
      clearInterval(timer);
    });
  };
}
