

import WebSocket, {WebSocketServer} from 'ws';
import {IncomingMessage} from 'http';

import {chatroomKey} from '../jwt';

import {Token, Service} from 'typedi';
import {Duplex} from 'stream';
import qs from 'qs';

export const WSToken = new Token('WSToken');

export interface WSOnMessage{
  onStartMessage: (ws: WebSocket, req: IncomingMessage) => void
  wsPath: string
  handleUpgrade: (
    request: IncomingMessage,
    socket: Duplex,
    upgradeHead: Buffer,
    callback: (client: WebSocket.WebSocket, request: IncomingMessage) => void
  ) => void
  onConnection: any
}

export class MyWebSocketServer extends WebSocketServer {
  request!: IncomingMessage;
  socket!: Duplex;
  head!: Buffer;
  events: any[] = [];

  constructor(
  ) {
    super({noServer: true});
  }

  checkToken(url: string | undefined) {
    if (!url) {
      return false;
    }

    const queryString = url.split('?')[1];

    if (!queryString) {
      return false;
    }

    const query = qs.parse(queryString);
    const {token} = query;

    if (!token) {
      return false;
    }

    const tokenV = chatroomKey.tokenVerify(token as string);

    if (!token || !tokenV) {
      return false;
    }

    return tokenV;
  }

  onConnection(
      request: IncomingMessage,
      socket: Duplex,
      head: Buffer,
  ) {
    this.handleUpgrade(request, socket, head, (ws) => {
      ws.send( JSON.stringify({
        event: 'connection',
        data: 'start',
      }));

      for (const event of this.events) {
        event(ws, request);
      }
    });
  }


  // onStartMessage(ws: WebSocket.WebSocket) {
  //   // ws.on('message', async function message(message: string) {
  //   //   const data: WSEvent = event.parse(message);
  //   //   if (data.data == 'start') {
  //   //     ws.send(event.msg('start'));
  //   //   }
  //   // });
  // }
}

type Data = any

@Service()
export class WSEvent {
  eventName;
  data!: Data;
  constructor(eventName: string ) {
    this.eventName = eventName;
  }

  msg(data: Data) {
    return JSON.stringify({
      event: this.eventName,
      data,
    });
  }

  parse(message: string) {
    const self = new WSEvent(this.eventName);
    try {
      self.data = JSON.parse(message);
    } catch {
      self.data = {data: 'parseError'};
    }

    return self;
  }
}
