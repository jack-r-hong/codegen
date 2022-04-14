import 'reflect-metadata';
import fs from 'fs';
import http from 'http';
import https from 'https';

import {ExpressApp} from './expressApp';

const privateKey = fs.readFileSync('./certreq/localhost.key', 'utf8');
const certificate = fs.readFileSync('./certreq/localhost.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

const app = new ExpressApp();

const httpServer = http.createServer(app.app);
const httpsServer = https.createServer(credentials, app.app);

const PORT = 4000;
const SSLPORT = 4443;

httpServer.listen(PORT, function() {
  console.log('HTTP Server is running on: http://0.0.0.0:%s', PORT);
});
httpsServer.listen(SSLPORT, function() {
  console.log('HTTPS Server is running on: https://0.0.0.0:%s', SSLPORT);
});


