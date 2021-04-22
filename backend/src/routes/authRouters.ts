import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import { authController } from '../controllers/authController';

class AuthRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.post('/', authController.login);
        this.router.get('/:password', checkJwt, authController.isValidPassword);
        this.router.get('/history/:password', checkJwt, authController.isUsedPassword);
        this.router.put('/disabled', authController.disabledUser);
    }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;