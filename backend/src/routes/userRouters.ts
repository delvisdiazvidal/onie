import { Router } from 'express';

import { userController } from '../controllers/userController';
import { checkJwt } from "../middlewares/checkJwt";
import { isAdmin } from '../middlewares/checkRole';

class UserRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        
        this.router.get('/', checkJwt, isAdmin, userController.read);
        this.router.get('/:id', checkJwt, isAdmin, userController.item);
        this.router.get('/valid/:username', checkJwt, isAdmin, userController.isUsedUser);
        this.router.post('/', checkJwt, isAdmin, userController.create);
        this.router.put('/:id', checkJwt, isAdmin, userController.update);
        this.router.put('/profile/:id', checkJwt, isAdmin, userController.profile);
        this.router.put('/change/:id', checkJwt, isAdmin, userController.changePassword);
        
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;