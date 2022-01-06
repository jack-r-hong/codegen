
import { Service } from 'typedi';
export { Container } from 'typedi'
import {FindManyOption} from './authSchemas'
import {UserModel} from './Models/userModel'
import { User } from '@prisma/client'


@Service()
export class AuthService { 

    constructor(
        private userModel: UserModel,
    ) {}

    async findUser(id: number){
        const user  = await this.userModel.findUser(id)
            .catch(e =>{
                throw e;
            });

        return user;
    }

    async findUsers(findManyOption: FindManyOption){
        const user  = await this.userModel.findUsers(findManyOption)
            .catch(e =>{
                throw e;
            });

        return user;
    }

    async createUser([email, password, name]: string[]){
        const user  = await this.userModel.create([email, password, name])
            .catch(e =>{
                throw e;
            });

        return user;
    }

    async updateUser(id:number ,[password, name]: string[], authLevel?: number){
        const user  = await this.userModel.update(id ,password, name, authLevel)
            .catch(e =>{
                throw e;
            });

        return user;
    }

    async deleteUser(id:number){
        const user  = await this.userModel.delete(id)
            .catch(e =>{
                throw e;
            });

        return user;
    }

    async login(email :string, password  :string){
        const user  = await this.userModel.findUser(email)
            .catch(e =>{
                throw e;
            });

        if((<User>user).password === password){
            return user;
        }else{
            throw Error('wrongPassword');
        }    
    }
}
