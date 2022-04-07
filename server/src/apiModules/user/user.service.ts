import {Service, Inject} from 'typedi';
import {UserModel} from './user.model';
import * as requestTypes from './user.parameters';
import {errors} from '../../errors';
// custom begin import
import {GoogleApiOperation} from '../../googleApiClient';
const googleApi = GoogleApiOperation.getInstance();
import {EventEmitter} from 'events';
class GoogleLoginEmitter extends EventEmitter {
  override emit(id: symbol, action: GoogleLoginAction, data: string) {
    return super.emit(id, action, data);
  }
  override once(
      id: symbol,
      listener: ( action: GoogleLoginAction, data: string) => void): this {
    return super.once(id, listener);
  }
}
enum GoogleLoginAction{
  Ok=1
}
const gLoginEmitter = new GoogleLoginEmitter();

// custom end import


@Service()
export class UserService {
  @Inject()
  private userModel!: UserModel;

  async googleLogin(
      param :requestTypes.GoogleLoginParams,
      session: Express.Request['session'],
  ) {
    // custom begin googleLogin
    console.log(param.queryProcess);

    switch (param.queryProcess) {
      case 'start':
        console.log(session.googleLoginToken);
        
        const id = Symbol('googleLogin');
        session.googleLoginToken = {
          id: 'googleLogin',
          status: 1,
          data: '',
        };
        console.log('start', session.googleLoginToken );
        const url = googleApi.getAuthUrl();
        return url;
      case 'wait':
        console.log('wait', session.googleLoginToken );
        return '???';
        // const res = await new Promise((resolve, reject) => {
        //   gLoginEmitter.once(
        //       session.googleLoginToken!.id,
        //       async (action, data) => {
        //         switch (action) {
        //           case GoogleLoginAction.Ok:
        //             // session.destroy(() => {});
        //             const user = await googleApi.getUserInfo(data)
        //                 .catch((e)=>{
        //                   throw e;
        //                 });
        //             if (user) {
        //               const email = user!.emailAddresses![0]?.value!;
        //               const res = await this.userModel.googleLogin(
        //                   param,
        //                   {email},
        //               )
        //                   .catch((e) => {
        //                     throw e;
        //                   });
        //               if (res !== null ) {
        //                 resolve( 'signUp');
        //               } else {
        //                 return resolve('ok');
        //               }
        //               session.userInfo = {
        //                 id: '',
        //                 userStatus: res.userStatus,
        //                 authRole: res.auth?.role!,
        //               };
        //             } else {
        //               throw new errors.AuthenticationFailedError;
        //             }
        //           default:
        //             throw new errors.AuthenticationFailedError;
        //         }
        //       });
        // });
        // return res;
      default:
        return 'error';
    }

    // custom end googleLogin
  }
  async oauthcallback(
      param :requestTypes.OauthcallbackParams,
      session: Express.Request['session'],
  ) {
    // custom begin oauthcallback
    console.log('oauthcallback', session.googleLoginToken);


    // gLoginEmitter.emit(
    //     session.googleLoginToken!.id, GoogleLoginAction.Ok, param.queryCode,
    // );

    // custom end oauthcallback
  }
  async createOneUser(
      param :requestTypes.CreateOneUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin createOneUser

    // custom end createOneUser
    const res = await this.userModel.createOneUser(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
  async loginUser(
      param :requestTypes.LoginUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin loginUser

    // custom end loginUser
  }
  async logoutUser(
      param :requestTypes.LogoutUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin logoutUser

    // custom end logoutUser
  }
  async deleteOneUser(
      param :requestTypes.DeleteOneUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin deleteOneUser

    // custom end deleteOneUser
    const res = await this.userModel.deleteOneUser(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
  async readOneUser(
      param :requestTypes.ReadOneUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin readOneUser

    // custom end readOneUser
    const res = await this.userModel.readOneUser(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
  async updateOneUser(
      param :requestTypes.UpdateOneUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin updateOneUser

    // custom end updateOneUser
    const res = await this.userModel.updateOneUser(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
  async createManyUser(
      param :requestTypes.CreateManyUserParams,
      session: Express.Request['session'],
  ) {
    // custom begin createManyUser

    // custom end createManyUser
    const res = await this.userModel.createManyUser(
        param,
    ).catch((e) =>{
      throw e;
    });
    return res;
  }
}

