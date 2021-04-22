import { Router } from 'express';
import { isUser } from '../middlewares/checkRole';
import { checkJwt } from '../middlewares/checkJwt';
import { requestASController } from './../controllers/requestASController';


class RequestASRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', requestASController.read);
        this.router.get('/:id', requestASController.item);
        this.router.post('/', requestASController.create);
    }
}

const requestASRoutes = new RequestASRoutes();
export default requestASRoutes.router;