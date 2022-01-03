import express, {Application, Router} from 'express';
import bodyParser  from 'body-parser';
import compression  from 'compression';
import cors from 'cors';
import helmet  from "helmet";
import { registerController}  from './apiModules';

export class ExpressApp {
    private app: Application = express();
    private port: number = 4000; 

    constructor(){
        this.middleware();
        registerController(this.app);
        this.listen();
    }
    
    private listen(): void{
        // this.app.param('user',(req, res) =>{

        // })
        this.app.listen(this.port, () => {
            console.log(`server running on port ${this.port}`);
        });        
    }

    private middleware(): void{
        const corsOptions: cors.CorsOptions = {
            allowedHeaders: [
              'Origin',
              'X-Requested-With',
              'Content-Type',
              'Accept',
              'X-Access-Token',
            ],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            origin: "127.0.0.1",
            preflightContinue: false,
        };
        this.app.use(helmet());
        this.app.use(cors(corsOptions))
        this.app.use(compression())
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json())
    }
}