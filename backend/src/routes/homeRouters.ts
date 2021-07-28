import { Router } from 'express';
import { homeController } from './../controllers/homeController';

class HomeRouter {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', homeController.read);
    }
}

const homeRouter = new HomeRouter();
export default homeRouter.router;