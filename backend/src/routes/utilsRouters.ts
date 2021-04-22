import { utilsController } from '../controllers/utilsController';
import { Router } from 'express';

class UtilsRouter {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/provinces', utilsController.province);
        this.router.get('/municipalites', utilsController.municipalite);
        this.router.get('/fishery', utilsController.fishery);
        this.router.get('/fisherycraft', utilsController.fisheryCraft);
    }
}

const utilsRouter = new UtilsRouter();
export default utilsRouter.router;