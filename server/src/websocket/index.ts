

import WebSocket from 'ws';
import {Server} from 'http';


import {Container} from 'typedi';
import parse from 'url-parse';
import {WSOnMessage, WSToken} from './base';

import './purify';
import './notify';


export class WebsocketApp {
  wss: WebSocket.Server<WebSocket.WebSocket>;
  ws!: WebSocket.WebSocket;
  path = '/ws';
  server;

  constructor(server: Server) {
    this.server = server;
    this.wss = new WebSocket.Server({noServer: true});
    this.onUpgrade();
  }

  onUpgrade() {
    this.server.on('upgrade', (request, socket, head) => {
      const pathname = parse(request.url!).pathname;

      const notMatch = Container.getMany<WSOnMessage>(WSToken).some((e) =>{
        if (pathname === `${this.path}${e.wsPath}`) {
          e.onConnection(request, socket, head);
          return true;
        }
        return false;
      });

      if (!notMatch) {
        socket.destroy();
      }
    });
  }
}
