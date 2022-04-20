

import WebSocket from 'ws';

import {
  PhotoScheduleQueueModel,
  PhotoSchedulePurifyStartQueueModel,

} from '../redisClient/models/apiModels';
import {Container, Service} from 'typedi';
import {PhotoModel} from '../apiModules/photo/photo.model';
import {WSToken, WSOnMessage, MyWebSocketServer, WSEvent} from './base';


const apiPModel = Container.get(PhotoModel);

const pSQModel = Container.get(PhotoScheduleQueueModel);
const pSPSQModel = Container.get(PhotoSchedulePurifyStartQueueModel);


@Service({id: WSToken, multiple: true})
export class OnPurifyWS extends MyWebSocketServer implements WSOnMessage {
  wsPath: string = '/purify';
  constructor() {
    super();
    this.events.push(this.onMessage);
  };

  onMessage(ws: WebSocket.WebSocket) {
    const event = new WSEvent('purify');

    ws.on('message', async function message(message: string) {
      const data: WSEvent = event.parse(message);
      if (data.data == 'start') {
        ws.send(event.msg('start'));

        await pSQModel.move(pSPSQModel.getKey(), 16);

        const purifyList = await pSPSQModel.get();

        const filePaths: string[] = [];

        for (const id of purifyList) {
          const result = await apiPModel.readOnePhoto({pathId: parseInt(id)});
          filePaths.push(result.filePath1);
        }

        ws.send(event.msg({filePaths}));

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

          await apiPModel.updateManyPhoto(
              {
                bodyDataList: purifyList,
                bodyWhereField: 'id',
              },
          );

          await pSPSQModel.del();

          ws.send(event.msg('end'));
        }, 66000);
      }
    });
  };
}


