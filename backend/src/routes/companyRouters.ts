import { Router } from 'express';
import { companyController } from './../controllers/companyController';

class CompanyRouter {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.get('/', companyController.read);
        this.router.get('/:id', companyController.item);
        this.router.post('/', companyController.create);
    }
}

const companyRouter = new CompanyRouter();
export default companyRouter.router;