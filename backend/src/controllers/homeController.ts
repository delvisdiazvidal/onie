import { Request, Response } from 'express';

import { IResponse } from 'models/responseModel';
const { name, 
        version,
        description,
        author } = require('../../package.json');

class HomeController {

    public async read(req: Request, res: Response): Promise<void>{
        
        const response: IResponse = { result: null, err: null, message: null};
            const result = {
                name: name,
                version: version,
                description: description,
                company: author.company,
                developer: author.name,
            }

        response.result = result;
        response.message = description + ' corriendo Satisfactoriamente.';
        res.status(200).json(response);
    }

}

export const homeController = new HomeController();