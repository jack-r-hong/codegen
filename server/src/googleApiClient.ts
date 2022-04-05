
import path from 'path';
import {google} from 'googleapis';
import {OAuth2Client} from 'google-auth-library';

const people = google.people('v1');

export class GoogleApiOperation {
  private static instance: GoogleApiOperation;

  private oauth2Client: OAuth2Client;


  scopes: string[] = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ];

  private constructor() {
    const keyFile = require(path.join(__dirname, '../oauth2.keys.json'));
    const keys = keyFile.installed || keyFile.web;
    const redirectUri = keys.redirect_uris[keys.redirect_uris.length - 1];

    this.oauth2Client = new google.auth.OAuth2(
        keys.client_id,
        keys.client_secret,
        redirectUri,
    );

    this.oauth2Client.on('tokens', (tokens: any) => {
      if (tokens.refresh_token) {
        /* store the refresh_token in my database! */
        console.log('refresh!');
      }
      /* console.log('access_token', tokens.access_token); */
    });
  }

  public static getInstance(): GoogleApiOperation {
    if (!GoogleApiOperation.instance) {
      GoogleApiOperation.instance = new GoogleApiOperation();
    }

    return GoogleApiOperation.instance;
  }

  public getAuthUrl() {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: this.scopes,
      prompt: 'consent',
    });
  }

  public async getUserInfo(code: string) {
    const {tokens} = await this.oauth2Client.getToken(code);
    this.oauth2Client.setCredentials(tokens);

    google.options({auth: this.oauth2Client});

    const res = await people.people.get({
      resourceName: 'people/me',
      personFields: 'emailAddresses,names,photos',
    });
    return res.data;
  }
}

GoogleApiOperation.getInstance();
