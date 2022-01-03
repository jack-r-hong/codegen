import {Request, Response, Application} from "express";
import {Get, Post, Controller, Validator} from "../baseController";
import {login} from './authSchemas'
import {AuthService, Container} from "./authService"

const authServiceInstance =  Container.get(AuthService);

@Controller('/auth')
export class AuthController { 

    constructor(private app: Application){}

    @Validator(login)
    @Post("/login") 
    async login(req: Request, res: Response) {
        const {account, password} = req.body
        const result = await authServiceInstance.login(account, password);
        res.json({"sss": result})
    }

}
