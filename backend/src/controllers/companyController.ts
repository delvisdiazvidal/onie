import { Request, Response } from 'express';

import { IResponse } from 'models/responseModel';
import { companyTable, Table } from '../helpers/tableHelper';
import { sqlHelper } from '../helpers/sqlHelper';
import { ICompany } from 'models/utilsModel';

class CompanyController {

    public async read(req: Request, res: Response): Promise<void>{
        
        const response: IResponse = { result: null, err: null, message: null};
        try {
            const result: ICompany[] = await sqlHelper.selectAll<ICompany>(Table.companyTable);
            response.result = result;
            res.status(200).json(response);
        } catch (err) {
            response.message = err;
            res.status(500).json(response);
        }
    }

    public async item(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const response: IResponse = { result: null, err: null, message: null};
        try {
            const [result]: ICompany[] = await sqlHelper.selectBy<ICompany>(Table.companyTable, companyTable.companyCode, id);
            response.result = result;
            res.status(200).json(response);
        } catch (err) {
            response.err = err;
            response.message = err.message;
            res.status(500).json(response);
        }
    } 

    public async create(req: Request, res: Response)  {
        const response: IResponse = { result: null, err: null, message: null};
        const companyData = req.body;
        try {
            const result: any = await sqlHelper.create<ICompany>(Table.companyTable, companyData);
            response.result = result;
            res.status(200).json(response);
        } catch (err) {
            response.err = err;
            response.message = err.message;
            res.status(500).json(response);
        } 
    } 

}

export const companyController = new CompanyController();