import { Router } from 'express';

import userRoutes from './userRouters';
import authRoutes from './authRouters';
import companyRouters from './companyRouters';
import requestRouters from './requestRouters';
import licenseRouters from './licenseRouters';
import utilsRouters from './utilsRouters';
import requestAPRouters from './requestAPRouters';
import requestASRouters from './requestASRouters';
import offenderRouters from './offenderRouters';
import requestPlatformRouters from './requestPlatformRouters';
import { isAdmin } from '../middlewares/checkRole';
import { checkJwt } from '../middlewares/checkJwt';

class IndexRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.use('/users', userRoutes);
        this.router.use('/auth', authRoutes);
        this.router.use('/utils', utilsRouters);
        this.router.use('/company', companyRouters);
        this.router.use('/request', requestRouters);
        this.router.use('/request-aquaculture-private', requestAPRouters);
        this.router.use('/request-aquaculture-state', requestASRouters);
        this.router.use('/request-platform', requestPlatformRouters);
        this.router.use('/license', licenseRouters);
        this.router.use('/penalty', offenderRouters);
        // this.router.use('/**', userRoutes);
    }
}


const indexRoutes = new IndexRoutes();
export default indexRoutes.router;