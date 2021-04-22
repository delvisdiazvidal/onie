import { Router } from 'express';
import { checkJwt } from '../middlewares/checkJwt';
import { isUser } from '../middlewares/checkRole';
import { licenseController } from './../controllers/licenseController';

class LicenseRouter {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', checkJwt, isUser, licenseController.read);
        this.router.get('/aquaculture-private/:id', licenseController.getAquaculturePrivate);
        this.router.get('/aquaculture-state/:id', licenseController.getAquacultureState);
        this.router.get('/platform-private/:id', licenseController.getPlatform);
        this.router.get('/platform-state/:id', licenseController.getPlatformState);
        this.router.post('/', checkJwt, isUser, licenseController.create);
    }
}

const licenseRouter = new LicenseRouter();
export default licenseRouter.router;