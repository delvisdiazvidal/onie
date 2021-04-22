import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import { isUser } from '../middlewares/checkRole';
import { offenderController } from './../controllers/offenderController';

class OffenderRouter {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', offenderController.read);
        this.router.get('/:id', offenderController.item);
        this.router.get('/offender/:personCI', offenderController.getOffenderByCI);
        this.router.post('/', checkJwt, isUser, offenderController.create);
    }
}

const offenderRouter = new OffenderRouter();
export default offenderRouter.router;