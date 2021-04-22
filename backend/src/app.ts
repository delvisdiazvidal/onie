import express, { Application } from 'express';
import dotenv  from "dotenv";
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { upload_path, API_URL, API_PORT } from "./config/env";

import indexRoutes from './routes/indexRouters';

class Server{

    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        dotenv.config();
        this.app.all('/*', function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            res.header('Access-Control-Allow-Headers', 'Origin');
            res.header('Access-Control-Allow-Headers', 'Accept');
            res.header('Access-Control-Allow-Headers', 'Authorization');
            next();
        });
        this.app.set('port', API_PORT || 4500);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(upload_path.base, express.static(path.resolve(upload_path.root)));
    }

    routes(): void {
        this.app.use('/api/', indexRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log(`${API_URL} corriendo por el puerto ${API_PORT}`);
          });
    }
}

export const server = new Server();
