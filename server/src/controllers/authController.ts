import {ControllerAbstract} from "./controllerAbstract";
import {Request, Response} from "express";



export class AuthController extends ControllerAbstract{

    constructor(){
        super();

    }

    login(req: Request, res: Response) {
        console.log(req.body);

        res.json({"sss": " zsss"})
    }


}
