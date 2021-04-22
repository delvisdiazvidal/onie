import { Request, Response } from 'express';

import { IResponse } from 'models/responseModel';
import { personTable, requestTable, Table, View } from '../helpers/tableHelper';
import { sqlHelper } from '../helpers/sqlHelper';
import { IRequest, 
        IRequestStatus, 
        IRequestSearch, 
        IRequestStatusInsert, 
        IRequestData, 
        IAquacultureStateInsert } from './../models/requestModel';
import { licenseTypeTable, requestAquacultureTable } from './../helpers/tableHelper';
import { ILicenseType } from 'models/licenseModel';
import { IPerson } from "../models/userModel";
import { sharedService } from '../services/sharedService';
import { licenseController } from './licenseController';
import { IContractDocs, IDocs } from '../models/filesModel';
import pool from '../config/database';

class RequestController {

    public async read(req: Request, res: Response): Promise<void>{
        const response: IResponse = { result: null, err: null, message: null};
        try {
            let resultRequest: IRequestData[]  = await sqlHelper.selectAll<IRequestData>(View.requestView);
            if (res.locals.jwtPayload.userProvince) { 
                resultRequest = resultRequest.filter(element => element.requestProvinceCode === res.locals.jwtPayload.userProvince);
            } 
            
            const result: IRequest[] = [];
            for (let index = 0; index < resultRequest.length; index++) {
                const element: IRequest = resultRequest[index];
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
            response.result = await sharedService.getRequest(id);
            res.status(200).json(response);
        } catch (err) {
            response.err = err;
            response.message = err.message;
            res.status(500).json(response);
        }
    } 


    public async searchByOrder(req: Request, res: Response): Promise<any> {
        const { orderNumber } = req.params;
        const response: IResponse = { result: null, err: null, message: null};
        try {
            const [result]: any = await sqlHelper.selectBy<any>(Table.requestTable, requestTable.requestOrderNumber, orderNumber);
            const [requestType] = await sqlHelper.selectBy<ILicenseType>(Table.licenseTypeTable, licenseTypeTable.licenseTypeCode, Number(result.requestType));
            result.requestType = requestType;
            response.result = result;
            res.status(200).json(response);
        } catch (err) {
            response.err = err;
            response.result = null;
            response.message = err.message;
            res.status(200).json(response);
        }
    } 

    public async searchByCI(req: Request, res: Response): Promise<any> {
        const { searchText } = req.params;
        const response: IResponse = { result: null, err: null, message: null};
        try {
            const [resultPerson]: any = await sqlHelper.selectBy<IPerson>(Table.personTable, personTable.personCI, searchText);
            const resultRequest: IRequestData[] = await sqlHelper.selectBy<IRequestData>(View.requestView, requestTable.requestPerson, resultPerson.personCode);
            const resultArray: IRequestSearch[] = [];
            for (let index = 0; index < resultRequest.length; index++) {
                const element: IRequestSearch = resultRequest[index];
                const [requestType] = await sqlHelper.selectBy<ILicenseType>(Table.licenseTypeTable, licenseTypeTable.licenseTypeCode, Number(element.requestType));
                const requestStatus = await sqlHelper.selectLastBy<IRequestStatus>(Table.requestStatusTable, requestTable.requestCode, Number(element.requestCode));
                const item: IRequestSearch = { 
                    requestCode: element.requestCode, 
                    requestOrderNumber: element.requestOrderNumber, 
                    requestType: requestType, 
                    requestPerson: resultPerson, 
                    requestStatus: requestStatus.requestStatusName, 
                    requestProvince: element.requestProvince,
                    requestProvinceCode: element.requestProvinceCode,
                    requestDate: element.requestDate,
                }; 
                resultArray.push(item);
            }
            response.result = resultArray;
            res.status(200).json(response);
        } catch (err) {
            response.err = err;
            response.result = null;
            response.message = err.message;
            res.status(200).json(response);
        }
    } 

    public async docs(req: Request, res: Response)  {
        const response: IResponse = { result: null, err: null, message: null};
        const  { requestCode, contractNumber }  = req.body;
        const  files: any = req.files;

        try {
             const docs: IDocs = {
                requestCode: requestCode,
                notTaxDebtFile: files[0].path,
                taxAboutShipPropertyFile: files[1].path,
                certificateOfNavigabilityFile: files[2].path,
                boatRegistrationCertificateFile: files[3].path,
            };
            await sqlHelper.create<IDocs>(Table.docsTable, docs);
            const contract: IContractDocs = {
                requestCode: requestCode,
                contractNumber: contractNumber,
                contractFile: files[4].path,
            }
            await sqlHelper.create<IContractDocs>(Table.contractTable, contract);
            response.message = 'Documentos Subidos Satisfactoriamente';
            res.status(200).json(response);
        } catch (err) {
            response.message = 'Ha ocurrido un error en la subida de los documentos.';
            res.status(500).json(response);
        }
       
    }

    public async aquaDocs(req: Request, res: Response)  {
        const response: IResponse = { result: null, err: null, message: null};
        const  { requestCode, contractNumber }  = req.body;
        const  files: any = req.files;

        try {

             const docs: IDocs = {
                requestCode: requestCode,
                notTaxDebtFile: files[0].path,
                taxAboutShipPropertyFile: files[1].path,
                certificateOfNavigabilityFile: files[2].path,
                boatRegistrationCertificateFile: files[3].path,
            };
            await sqlHelper.create<IDocs>(Table.docsTable, docs);

            const irhUpdate: IAquacultureStateInsert = {
                requestCode: requestCode,
                iRHCertificateFile: files[4].path,
            }
            await sqlHelper.update<IAquacultureStateInsert>(Table.requestAquacultureTable, requestAquacultureTable.requestCode, requestCode, irhUpdate);
            response.message = 'Documentos Subidos Satisfactoriamente';
            res.status(200).json(response);
        } catch (err) {
            response.message = 'Ha ocurrido un error en la subida de los documentos.';
            res.status(500).json(response);
        }
       
    } 

    public async status(req: Request, res: Response)  {
        const response: IResponse = { result: null, err: null, message: null};
        const requestStatusData = req.body.requestStatus;
        pool.beginTransaction(async (err: any) => {
            if (err) { throw err; }
            try {
                const statusData: IRequestStatusInsert = {
                    requestCode: requestStatusData.requestCode,
                    requestStatusName: requestStatusData.requestStatusName,
                    requestUser: requestStatusData.requestUser,
                    requestObservation: requestStatusData.requestObservation
                };
                if (requestStatusData.licenseIdentificator) {
                    await licenseController.create(requestStatusData);
                }
                const result: IRequestStatusInsert = await sqlHelper.create<IRequestStatusInsert>(Table.requestStatusTable, statusData);
                pool.commit(() => {
                    response.result = result;
                    response.message = 'La Solicitud ' + requestStatusData.requestOrderNumber + ' ha sido ' + requestStatusData.requestStatusName;
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

export const requestController = new RequestController();