import { Router } from 'express';
import { duser } from '../middlewares/multer';
import { checkJwt } from '../middlewares/checkJwt';

import { requestController } from './../controllers/requestController';
import { isUser } from '../middlewares/checkRole';

class RequestRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', checkJwt, isUser, requestController.read);
        this.router.get('/:id', requestController.item);
        this.router.post('/', requestController.status);
        this.router.get('/search-order/:orderNumber', requestController.searchByOrder);
        this.router.get('/search-id/:searchText', requestController.searchByCI);
        this.router.post('/add-files', duser.array('fileToUpload', 5), requestController.docs);
        this.router.post('/add-aqua-files', duser.array('fileToUpload', 5), requestController.aquaDocs);
    }
}

const requestRoutes = new RequestRoutes();
export default requestRoutes.router;