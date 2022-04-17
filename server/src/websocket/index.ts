

import WebSocket, {WebSocketServer} from 'ws';
import {Server} from 'http';

import {
  PhotoScheduleQueueModel,
  PhotoSchedulePurifyStartQueueModel,

} from '../redisClient/models/apiModels';
import {Container} from 'typedi';
import {PhotoModel} from '../apiModules/photo/photo.model';

const apiPModel = Container.get(PhotoModel);

const pSQModel = Container.get(PhotoScheduleQueueModel);
const pSPSQModel = Container.get(PhotoSchedulePurifyStartQueueModel);


export class WebsocketApp {
  wss: WebSocket.Server<WebSocket.WebSocket>;
  constructor(server: Server) {
    this.wss = new WebSocketServer({server});
    this.on();
  }

  on() {
    this.wss.on('connection', function connection(ws) {
      // console.log(await pSQModel.get());
      ws.on('message', function message(data: string) {
        console.log('received: %s', data);
      });

      ws.on('message', async function message(data: string) {
        if (data == 'purifyStart' ) {
        //   console.log('stt');
          ws.send( JSON.stringify('purifyStarting'));
          // await pSQModel.del();
          // await pSPSQModel.del();
          //   await pSQModel.push('5');
          //   await pSQModel.push('6');
          //   await pSQModel.push('3');
          //   await pSQModel.push('4');

          //   console.log(await pSQModel.get());

          await pSQModel.move(pSPSQModel.getKey(), 16);

          const purifyList = await pSPSQModel.get();

        //   console.log(purifyList);

          const filePaths: string[] = [];

          for (const id of purifyList) {
            const result = await apiPModel.readOnePhoto({pathId: parseInt(id)});
            filePaths.push(result.filePath1);
          }

        //   console.log(filePaths);

          ws.send(JSON.stringify({filePaths}));


          //  const  pSPSQModel.get();

          // console.log(await pSQModel.get());
          //   console.log(await pSPSQModel.get());


          setTimeout(async () => {
            const purifyList = (await pSPSQModel.get()).map((id) => {
              return {
                bodyFilePath2: null,
                bodyId: parseInt(id),
                bodyProcess: 3,
                bodyStatus: 3,
                bodyAfterLevel: undefined,
                bodyBeforeLevel: undefined,
              };
            });

            // console.log(purifyList);

            await apiPModel.updateManyPhoto(
                {
                  bodyDataList: purifyList,
                  bodyWhereField: 'id',
                },
            );

            await pSPSQModel.del();

            // console.log(await pSPSQModel.get());

            ws.send(JSON.stringify('purifyEnd'));
          }, 2000);
        }
      });

    //   console.log(JSON.stringify('connection start'));


      ws.send(JSON.stringify('connection start'));
    });
  }
}
