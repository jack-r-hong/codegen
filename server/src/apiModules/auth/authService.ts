
import { Service } from 'typedi';
export { Container } from 'typedi'

import {UserModel} from './Models/userModel'

@Service()
export class AuthService { 

    constructor(
        private userModel: UserModel,
    ) {}

    login(account :string, password  :string){
        return new Promise((resolve, reject) => {
            this.userModel.read()
            resolve(account)
        })
    }
}
