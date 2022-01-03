import {Router} from "express";

export abstract class RouterAbstract {
    protected router = Router();
    protected abstract controller: any;
    protected abstract setRoutes(): void;

    // constructor(controller: any){
    //     // this.controller = controller;
    //     // this.getControllerFunction()
    // }

    public getRouter() {
        return this.router;
    }

    protected getControllerFunction(){
        console.log( Object.getOwnPropertyNames(Object.getPrototypeOf(this.controller)))

    }
}
