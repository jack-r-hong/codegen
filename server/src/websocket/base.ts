

import WebSocket, {WebSocketServer} from 'ws';
import {IncomingMessage} from 'http';


import {Token} from 'typedi';
import {Duplex} from 'stream';


export const WSToken = new Token('WSToken');

export interface WSOnMessage{
  onMessage: (ws: WebSocket) => void
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

  onConnection(
      request: IncomingMessage,
      socket: Duplex,
      head: Buffer,
  ) {
    this.handleUpgrade(request, socket, head, (ws) => {
      ws.send( JSON.stringify({
        event: 'connection',
        msg: 'start',
      }));

      for (const event of this.events) {
        event(ws);
      }
    });
  }
}

export class WSEvent {
  eventName;
  data!: Object;
  constructor(eventName: string ) {
    this.eventName = eventName;
  }

  msg(data: Object) {
    return JSON.stringify({
      event: this.eventName,
      data: data,
    });
  }

  parse(message: string) {
    const self = new WSEvent(this.eventName);
    self.data = JSON.parse(message).data;
    return self;
  }
}
