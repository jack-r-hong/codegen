import  {BaseController, Get, controller} from "../baseController";
import {Request, Response, Router} from "express";



@controller("/auth")
export class AuthController{

    // constructor(){
    //     super();

    // }

    @Get("/login")
    login(req: Request, res: Response) {
        console.log(req.body);
        console.log(this)
        res.json({"sss": " zsss"})
    }


}
