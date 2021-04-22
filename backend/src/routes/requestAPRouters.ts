import { Router } from 'express';
import { isUser } from '../middlewares/checkRole';
import { checkJwt } from '../middlewares/checkJwt';
import { requestAPController } from './../controllers/requestAPController';


class RequestAPRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', requestAPController.read);
        this.router.get('/:id', requestAPController.item);
        this.router.post('/', requestAPController.create);
    }
}

const requestAPRoutes = new RequestAPRoutes();
export default requestAPRoutes.router;