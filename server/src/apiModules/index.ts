import {Application} from 'express';
import './user/user.controller';
import './transaction/transaction.controller';
import './bankAccount/bankAccount.controller';
import './userVerifyPhoto/userVerifyPhoto.controller';
import './exchangeRateBuy/exchangeRateBuy.controller';
import './exchangeRateSell/exchangeRateSell.controller';
import './payManage/payManage.controller';
import './backstageAdmin/backstageAdmin.controller';
import './chatroom/chatroom.controller';
import './cashFlow/cashFlow.controller';
import './userLevel/userLevel.controller';
import path from 'path';
import fs from 'fs';


import {ControllerToken, Controller} from './baseController';

import {Container} from 'typedi';

function fromDir(startPath: string, filter: RegExp, callback: any) {
  if (!fs.existsSync(startPath)) {
    console.log('no dir ', startPath);
    return;
  }

  const files=fs.readdirSync(startPath);
  for (let i=0; i<files.length; i++) {
    const filename=path.join(startPath, files[i]!);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter, callback); // recurse
    } else if (filter.test(filename)) callback(filename);
  };
};

const requireController = () => {
  return new Promise((res) => {
    fromDir('./src/apiModules',
        /\.controller\.ts$/,
        function(filename: string) {
          // console.log(path.join(process.cwd(), filename));
          require(path.join(process.cwd(), filename));
        });
    res(true);
  });
};

export const registerController = (app : Application) => {
  const controllers = Container.getMany(ControllerToken);

  controllers.map((e: Controller) => {
    e.appUse.use(app);
  });
};
