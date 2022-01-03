import { RouterAbstract } from "./routerAbstract";
import { AuthController } from "../controllers/authController";

const enum Methods {
    get="get", 
    post="post",
    put="put",
    delete="delete",
}  

export class AuthRouter extends RouterAbstract{
    controller = new AuthController();
    

    constructor() {
        super();
        this.setRoutes();       
    }

    protected setRoutes() {
        this.getControllerFunction()

        this.router[Methods.get]
        this.router.get('/login', this.controller.login);
    }

    

}
