import { Service } from 'typedi';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

@Service()
export class UserModel { 

    create([email, password, name]: string[]){
        return new Promise(async(res) => {
            const result = await prisma.user.create({
                data: { 
                    email, 
                    password, 
                    name, 
                    auth:{}

                },
              })
        
            res(result)         
        })
    }

    read(email: string){
        return new Promise(async(res) => {
            const user = await prisma.user.findUnique({
                where:{
                    email: email
                }
            })            
            res(user)         
        })
    }

    update(){

    }

    delete(){

    }
}
