import { Request, Response } from 'express';
import pool from '../config/database';

import { IResponse } from 'models/responseModel';
import { requestTable, Table, View } from '../helpers/tableHelper';
import { sqlHelper } from '../helpers/sqlHelper';
import { 
    IRequest, 
    IRequestStatus,
    IRequestData,
    IRequestPlatformInsert,
    RequestPlatformState,
    IRequestPlatform} from '../models/requestModel';
import { companyTable } from './../helpers/tableHelper';
import { sharedService } from '../services/sharedService';
import { ICompany, IShipPlatform } from 'models/utilsModel';
import { IRequestPlatformState } from './../models/requestModel';
import { requestPPController } from './requestPPController';
import { IContractDocsString } from 'models/filesModel';


class RequestPSController {

    public async read(req: Request, res: Response): Promise<void>{
        const response: IResponse = { result: null, err: null, message: null};
        try {
            const resultRequest = await sqlHelper.selectAll<any>(View.requestView);
            const requestPS = resultRequest.filter(element => element.requestType === 4);
            
            const result: IRequest[] = [];
            for (let index = 0; index < requestPS.length; index++) {
                const element: IRequest = requestPS[index];
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
            const contract: IContractDocsString = await sharedService.getContract(id);
            const requestPP: IRequestPlatform = await requestPPController.getRequest(request, contract);
            const [requestPS] = await sqlHelper.selectBy<IRequestPlatformState>(Table.requestPSTable, requestTable.requestCode, Number(request.requestCode));
            const [companyResult] = await sqlHelper.selectBy<ICompany>(Table.companyTable, companyTable.companyCode, requestPS.requestCompany);
            const finalRequest: IRequestPlatform = new RequestPlatformState(request, requestPP, companyResult);
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
       

         const addRequestPlatform = (requestCode: number, captainCode: number) =>
            new Promise<void>(async (resolve, reject) => {
                const requestPlatform: IRequestPlatformInsert = {
                    requestCode: requestCode,
                    requestShipCaptain: captainCode,
                    requestFisheryCraft: requestData.requestFisheryCraft,
                    fisheringAreas: requestData.fisheringAreas,
                };
                try {
                    await sqlHelper.create<IRequestPlatformInsert>(Table.requestPPTable, requestPlatform);
                } catch (err) {
                    err.message = 'Error al intentar crear la Solicitud de Licencia de Plataforma Estatal';
                    reject(err);
                }
                resolve();
            });

        const addFisheryType = (requestCode: number) =>
            new Promise<void>(async (resolve, reject) => {
                
                try {
                    requestData.requestFisheryType.forEach((element: any) => {
                        const fisheryData = {
                            requestCode: requestCode,
                            fisheryCode: element
                        };
                        sqlHelper.create<any>(Table.requestFisheryTable, fisheryData);
                    });
                } catch (err) {
                    err.message = 'Error al intentar Insertar los Tipos de Pesquerías';
                    reject(err);
                }
                resolve();
            });

         const addShipsList = (requestCode: number) =>
            new Promise<void>(async (resolve, reject) => {
                const newShip: IShipPlatform = requestData.requestShip;
                newShip.requestCode = requestCode;
                try {
                    await sqlHelper.create<IShipPlatform>(Table.shipTable, newShip);
                } catch (err) {
                    err.message = 'Error al intentar Insertar información de la embarcación';
                    reject(err);
                }
                resolve();
            });

         const addRequestPlatformState = (requestCode: number, companyCode: number) =>
            new Promise<void>(async (resolve, reject) => {
                const platformState: IRequestPlatformState = {
                    requestCode: requestCode,
                    requestCompany: companyCode
                };
                try {
                    await sqlHelper.create<IRequestPlatformState>(Table.requestPSTable, platformState);
                } catch (err) {
                    err.message = 'Error al intentar Insertar en ' + Table.requestPSTable;
                    reject(err);
                }
                resolve();
            });

            try {
                const personCode = await sharedService.addPersonData(requestData.requestPerson);
                const requestResult = await sharedService.addRequestMain(requestData, personCode);
                const requestCode = await requestResult.insertId;
                const companyResult = await sharedService.addCompany(requestData.requestCompany);
                const companyCode = await companyResult.insertId;
                const captainCode = await sharedService.addPersonData(requestData.requestShipCaptain);
                await addRequestPlatform(requestCode, captainCode);
                await addRequestPlatformState(requestCode, companyCode);
                await addFisheryType(requestCode);
                await addShipsList(requestCode);
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

export const requestPSController = new RequestPSController();
