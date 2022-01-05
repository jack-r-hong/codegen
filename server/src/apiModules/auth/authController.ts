import {Request, Response, Application} from "express";
import {Get, Post, Controller, Validator} from "../baseController";
import * as validSchemas from './authSchemas'
import {AuthService, Container} from "./authService"

const authServiceInstance =  Container.get(AuthService);

@Controller('/auth')
export class AuthController { 

    constructor(private app: Application){}

    @Validator(validSchemas.login)
    @Post("/user") 
    async createUser(req: Request, res: Response) {
        const result = await authServiceInstance.createUser(Object.values(req.body));
        res.json({"ok": result})
    }

    @Validator(validSchemas.login)
    @Post("/login") 
    async login(req: Request, res: Response) {
        const {email, password} = req.body
        const result = await authServiceInstance.login(email, password);
        res.json({"ok": result})
    }

}
