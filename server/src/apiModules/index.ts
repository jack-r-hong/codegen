import { Application } from 'express'
import { AuthController } from "./auth/authController"

const controllers = [
    AuthController
]


export const registerController = (app : Application) => {
    controllers.forEach(controller =>{
        new controller(app)
        // new controller()

    });
}
