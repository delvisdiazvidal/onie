import { Request, Response } from 'express';
import pool from '../config/database';

import { IResponse } from 'models/responseModel';
import { Table, View } from '../helpers/tableHelper';
import { sqlHelper } from '../helpers/sqlHelper';
import { 
    IRequest, 
    IAquaculturePrivate, 
    IRequestAquaculturePrivate, 
    RequestAquaculturePrivate, 
    IRequestData,
    IRequestStatus} from './../models/requestModel';
import { sharedService } from '../services/sharedService';
import { IContractDocsString } from 'models/filesModel';

class RequestAPController {

    public async read(req: Request, res: Response): Promise<void>{
        const response: IResponse = { result: null, err: null, message: null};
        try {
            const resultRequest: any[]  = await sqlHelper.selectAll<any>(View.requestView);
            const requestAP = resultRequest.filter(element => element.requestType === 1);
            const result: IRequest[] = [];
            for (let index = 0; index < requestAP.length; index++) {
                const element: IRequest = requestAP[index];
                const requestItem: IRequest = await sharedService.getRequest(Number(element.requestCode));
                result.push(requestItem);
            }
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
            const request: IRequestData = await sharedService.getRequest(id);
            const contractResult: IContractDocsString = await sharedService.getContract(id);
            const contract: IAquaculturePrivate = {
                requestCode: contractResult.requestCode,
                requestContractNumber: contractResult.contractNumber,
                requestContract: contractResult.contractFile
            }
            const result: IRequestAquaculturePrivate = new RequestAquaculturePrivate(request, contract);
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
        const { newRequest }: any = req.body;
        pool.beginTransaction(async (err: any) => {
            if (err) { throw err; }

            if(!newRequest) {
                response.message = 'Datos Insuficientes para realizar la Inserción.';
                res.status(500).json(response);
            } else {
                try {
                    const personCode = await sharedService.addPersonData(newRequest.requestPerson);
                    const requestResult = await sharedService.addRequestMain(newRequest, personCode);
                    const requestCode = await requestResult.insertId;
                    const requestStatus: IRequestStatus = {
                        requestCode: requestCode,
                        requestStatusName: newRequest.requestStatus,
                        requestUser: personCode, 
                    };
                    await sqlHelper.create<IRequestStatus>(Table.requestStatusTable, requestStatus);
                    pool.commit(() => {
                        response.result = requestCode; 
                        response.message = 'La Solicitud ' + newRequest.requestOrderNumber + ' ha sido Creada Satisfactoriamente.';
                        res.status(200).json(response);
                    });
                } catch (err) {
                    pool.rollback(() => {
                        response.err = err;
                        response.message = err.message;
                        res.status(500).json(response);
                    });
                }  
            }
        });
    }
    
}

export const requestAPController = new RequestAPController();