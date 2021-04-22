import { Request, Response } from 'express';
import pool from '../config/database';

import { IResponse } from 'models/responseModel';
import { requestTable, Table, View } from '../helpers/tableHelper';
import { sqlHelper } from '../helpers/sqlHelper';
import { 
    IRequest, 
    IAquacultureState, 
    IRequestAquacultureState, 
    RequestAquacultureState, 
    IRequestData,
    IAquacultureStateInsert,
    IRequestStatus} from '../models/requestModel';
import { companyTable } from './../helpers/tableHelper';
import { sharedService } from '../services/sharedService';
import { IShipInsert } from 'models/utilsModel';
import { IReservoirInsert } from './../models/utilsModel';

class RequestASController {

    public async read(req: Request, res: Response): Promise<void>{
        const response: IResponse = { result: null, err: null, message: null};
        try {
            const resultRequest = await sqlHelper.selectAll<any>(View.requestView);
            const requestAS = resultRequest.filter(element => element.requestType === 2);
            
            const result: IRequest[] = [];
            for (let index = 0; index < requestAS.length; index++) {
                const element: IRequest = requestAS[index];
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

    public async getRequestAS(request: IRequest) {
        const [requestAs]: any[] = await sqlHelper.selectBy<any>(Table.requestAquacultureTable, requestTable.requestCode, request.requestCode);
        const [companyResult]: any[] = await sqlHelper.selectBy<any>(Table.companyTable, companyTable.companyCode, requestAs.requestCompany);
        const shipResult: any[] = await sqlHelper.selectBy<any>(Table.shipTable, requestTable.requestCode, request.requestCode);
        const reservoirResult: any[] = await sqlHelper.selectBy<any>(Table.reservoirTable, requestTable.requestCode, request.requestCode);
        const asResult: IAquacultureState = {
            requestCode: request.requestCode,
            requestContractNumber: requestAs.requestContractNumber,
            requestContract: requestAs.requestContract,
            requestCompany: companyResult,
            requestShipList: shipResult,
            iRHCertificateFile: requestAs.iRHCertificateFile,
            requestReservoirList: reservoirResult
        };
        return asResult;
    }

    public async item(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const response: IResponse = { result: null, err: null, message: null};
        try {
            const request: IRequestData = await sharedService.getRequest(id);
            const requestAS: IAquacultureState = await requestASController.getRequestAS(request);
            const finalRequest: IRequestAquacultureState = new RequestAquacultureState(request, requestAS);
            response.result = finalRequest;
            res.status(200).json(response);
        } catch (err) {
            response.err = err;
            response.message = err.message;
            res.status(500).json(response);
        }
    } 

    public async create(req: Request, res: Response)  {
        const response: IResponse = { result: null, err: null, message: null};
        const requestData: any = req.body.newRequest;
        pool.beginTransaction(async (err: any) => {
            if (err) { throw err; }
        

            const addRequestAquacultureState = (requestCode: number, companyCode: number) =>
                new Promise<void>(async (resolve, reject) => {
                    const requestAP: IAquacultureStateInsert = {
                        requestCode: requestCode,
                        requestCompany: companyCode
                    };
                    try {
                        await sqlHelper.create<IAquacultureStateInsert>(Table.requestAquacultureTable, requestAP);
                    } catch (err) {
                        err.message = 'Error al intentar crear la Solicitud de Licencia Acuícola Estatal';
                        reject(err);
                    }
                    resolve();
                });

            const addShipsList = (requestCode: number) =>
                new Promise<void>((resolve, reject) => {
                    requestData.requestShipList.forEach( async (shipItem: IShipInsert) => {
                        shipItem.requestCode = requestCode;
                        try {
                            await sqlHelper.create<IShipInsert>(Table.shipTable, shipItem);
                        } catch (err) {
                            err.message = 'Error al intentar insertar el listado de barcos.';
                            reject(err);
                        }
                        resolve();
                    });
                });

            const addReservoirList = (requestCode: number) =>
                new Promise<void>((resolve, reject) => {
                    requestData.requestReservoirList.forEach( async (reservoirItem: IReservoirInsert) => {
                        reservoirItem.requestCode = requestCode;
                        try {
                            await sqlHelper.create<IReservoirInsert>(Table.reservoirTable, reservoirItem);
                        } catch (err) {
                            err.message = 'Error al intentar insertar el listado de embalses.';
                            reject(err);
                        }
                        resolve();
                    });
                });

            try {
                const personCode = await sharedService.addPersonData(requestData.requestPerson);
                const requestResult = await sharedService.addRequestMain(requestData, personCode);
                const requestCode = await requestResult.insertId;
                const companyResult = await sharedService.addCompany(requestData.requestCompany);
                const companyCode = await companyResult.insertId;
                await addRequestAquacultureState(requestCode, companyCode);
                await addShipsList(requestCode);
                await addReservoirList(requestCode);
                const requestStatus: IRequestStatus = {
                    requestCode: requestCode,
                    requestStatusName: requestData.requestStatus,
                    requestUser: personCode, 
                };
                await sqlHelper.create<IRequestStatus>(Table.requestStatusTable, requestStatus);
                pool.commit(() => {
                    response.result = requestCode;
                    response.message = 'La Solicitud ' + requestData.requestOrderNumber + ' ha sido Creada Satisfactoriamente.';
                    res.status(200).json(response);
                });
            } catch (err) {
                pool.rollback(() => {
                    response.err = err;
                    response.message = err.message;
                    res.status(500).json(response);
                });
            } 
        });
    } 

}

export const requestASController = new RequestASController();