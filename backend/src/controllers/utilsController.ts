import { Request, Response } from 'express';

import { IResponse } from 'models/responseModel';
import { Table } from '../helpers/tableHelper';
import { sqlHelper } from '../helpers/sqlHelper';
import { IProvince, IMunicipalite, IFishery, IFisheryCraft } from 'models/utilsModel';

class UtilsController {

    public async province(req: Request, res: Response): Promise<void>{
        const response: IResponse = { result: null, err: null, message: null};
        try {
            const result: IProvince[] = await sqlHelper.selectAll<IProvince>(Table.provinceTable);
            response.result = result;
            res.status(200).json(response);
        } catch (err) {
            response.message = err;
            res.status(500).json(response);
        }
    }

    public async municipalite(req: Request, res: Response): Promise<void>{
        const response: IResponse = { result: null, err: null, message: null};
        try {
            const result: IMunicipalite[] = await sqlHelper.selectAll<IMunicipalite>(Table.municipaliteTable);
            response.result = result;
            res.status(200).json(response);
        } catch (err) {
            response.message = err;
            res.status(500).json(response);
        }
    }

    public async fishery(req: Request, res: Response): Promise<void>{
        const response: IResponse = { result: null, err: null, message: null};
        try {
            const result: IFishery[] = await sqlHelper.selectAll<IFishery>(Table.fisheryTable);
            response.result = result;
            res.status(200).json(response);
        } catch (err) {
            response.message = err;
            res.status(500).json(response);
        }
    }


    public async fisheryCraft(req: Request, res: Response): Promise<void>{
        const response: IResponse = { result: null, err: null, message: null};
        try {
            const result: IFisheryCraft[] = await sqlHelper.selectAll<IFisheryCraft>(Table.fisheryCraftTable);
            response.result = result;
            res.status(200).json(response);
        } catch (err) {
            response.message = err;
            res.status(500).json(response);
        }
    }

}

export const utilsController = new UtilsController();