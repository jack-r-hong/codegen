
import { Service } from 'typedi';
export { Container } from 'typedi'

import {UserModel} from './Models/userModel'

@Service()
export class AuthService { 

    constructor(
        private userModel: UserModel,
    ) {}

    createUser([email, password, name]: string[]){
        return new Promise((resolve, reject) => {
            const user = this.userModel.create([email, password, name])
            resolve(user)
        })
    }

    login(email :string, password  :string){
        return new Promise((resolve, reject) => {
            const user = this.userModel.read(email)
            resolve(user)
        })
    }
}
