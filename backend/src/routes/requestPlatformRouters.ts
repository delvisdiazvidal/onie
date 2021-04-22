import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import { isUser } from '../middlewares/checkRole';
import { requestPPController } from '../controllers/requestPPController';
import { requestPSController } from '../controllers/requestPSController';


class RequestPlatformRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/private/', requestPPController.read);
        this.router.get('/private/:id', requestPPController.item);
        this.router.post('/private/', requestPPController.create);
        this.router.get('/state/', requestPSController.read);
        this.router.get('/state/:id', requestPSController.item);
        this.router.post('/state/', requestPSController.create);
    }
}

const requestPlatformRoutes = new RequestPlatformRoutes();
export default requestPlatformRoutes.router;