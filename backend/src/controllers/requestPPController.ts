import { Request, Response } from 'express';
import pool from '../config/database';

import { IResponse } from 'models/responseModel';
import { 
    personTable, 
    requestTable, 
    fisheryCraftTable,
    Table, 
    View } from '../helpers/tableHelper';
import { sqlHelper } from '../helpers/sqlHelper';
import { 
    IRequest, 
    IRequestStatus,
    IRequestPlatformInsert,
    IRequestPlatform,
    IRequestData,
    RequestPlatform,
    IRequestPlatformPrivate} from '../models/requestModel';
import { sharedService } from '../services/sharedService';
import { IFishery, IFisheryCraft, IShip, IShipPlatform } from 'models/utilsModel';
import { IPerson } from '../models/userModel';
import { IContractDocsString } from '../models/filesModel';


class RequestPPController {

    public async read(req: Request, res: Response): Promise<void>{
        const response: IResponse = { result: null, err: null, message: null};
        try {
            const resultRequest = await sqlHelper.selectAll<any>(View.requestView);
            const requestPP = resultRequest.filter(element => element.requestType === 3);
            
            const result: IRequest[] = [];
            for (let index = 0; index < requestPP.length; index++) {
                const element: IRequest = requestPP[index];
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

    public async getRequest(request: IRequest, contract: IContractDocsString) {
        const [result]: IRequestPlatform[] = await sqlHelper.selectBy<IRequestPlatform>(Table.requestPPTable, requestTable.requestCode, request.requestCode);
        const [requestCaptain] = await sqlHelper.selectBy<IPerson>(Table.personTable, personTable.personCode, Number(result.requestShipCaptain));
        const requestFishery:IFishery[] = await sqlHelper.selectBy<IFishery>(View.fisheryView, requestTable.requestCode, request.requestCode);
        const [requestFisheryCraft] = await sqlHelper.selectBy<IFisheryCraft>(Table.fisheryCraftTable, fisheryCraftTable.fisherycraftCode, Number(result.requestFisheryCraft));
        const [requestShip] = await sqlHelper.selectBy<IShip>(Table.shipTable, requestTable.requestCode, request.requestCode);
        const ppResult: IRequestPlatform = {
            requestCode: result.requestCode,
            requestShipCaptain: requestCaptain,
            requestFisheryType: requestFishery,
            requestFisheryCraft: requestFisheryCraft,
            fisheringAreas: result.fisheringAreas,
            requestContractNumber: contract.contractNumber,
            requestContract: contract.contractFile,
            requestShip: requestShip
        }; 
        return ppResult;
    }

    public async item(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const response: IResponse = { result: null, err: null, message: null};

        try {
            const request: IRequestData = await sharedService.getRequest(id);
            const contract: IContractDocsString = await sharedService.getContract(id);
            const requestPP: IRequestPlatform = await requestPPController.getRequest(request, contract);
            const finalRequest: IRequestPlatformPrivate = new RequestPlatform(request, requestPP);
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
                    err.message = 'Error al intentar crear la Solicitud de Licencia de Plataforma No Estatal';
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

         const addShip = (requestCode: number) =>
            new Promise<void>(async (resolve, reject) => {
                const newShip: IShipPlatform = requestData.requestShip;
                newShip.requestCode = requestCode;
                try {
                    await sqlHelper.create<IShipPlatform>(Table.shipTable, newShip);
                } catch (err) {
                    err.message = 'Error al intentar insertar información de la embarcación';
                    reject(err);
                }
                resolve();
            });

        
            try {
                const personCode = await sharedService.addPersonData(requestData.requestPerson);
                const requestResult = await sharedService.addRequestMain(requestData, personCode);
                const requestCode = await requestResult.insertId;
                const captainCode = await sharedService.addPersonData(requestData.requestShipCaptain);
                await addRequestPlatform(requestCode, captainCode);
                await addFisheryType(requestCode);
                await addShip(requestCode);
                const requestStatus: IRequestStatus = {
                    requestCode: requestCode,
                    requestStatusName: requestData.requestStatus,
                    requestUser: personCode, 
                };
                sqlHelper.create<IRequestStatus>(Table.requestStatusTable, requestStatus);
                
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

export const requestPPController = new RequestPPController();
