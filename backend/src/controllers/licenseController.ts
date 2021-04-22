import { Request, Response } from 'express';

import { IResponse } from 'models/responseModel';
import { 
    licenseTable, 
    licenseAPTable, 
    licenseASTable, 
    requestTable, 
    licenseTypeTable, 
    personTable, 
    provinceTable, 
    companyTable,
    Table, 
    fisheryCraftTable,
    View} from '../helpers/tableHelper';
import { sqlHelper } from '../helpers/sqlHelper';
import { IPerson } from '../models/userModel';
import { ICompany, IFishery, IFisheryCraft, IProvince, IReservoir, IShip } from '../models/utilsModel';
import { IRequest, IRequestLicense } from '../models/requestModel';
import { 
    ILicenseAquaculturePrivate, 
    ILicenseAquaculturePrivateInsert, 
    ILicenseAquacultureState, 
    ILicenseAquacultureStateInsert, 
    ILicensePlatform, 
    ILicensePlatformInsert, 
    ILicensePlatformState, 
    ILicensePlatformStateInsert, 
    LicenseAquaculturePrivate, 
    LicenseAquacultureState,
    LicensePlatform,
    LicensePlatformState} from '../models/licenseModel';


class LicenseController {

    public async read(req: Request, res: Response): Promise<void>{
        const response: IResponse = { result: null, err: null, message: null};
        try {
            const licenseResult: any[]  = await sqlHelper.selectAll<any>(Table.licenseTable);
            const result: any[] = [];
            for (let index = 0; index < licenseResult.length; index++) {
                const element: any = licenseResult[index];
                const licenseItem: any = await licenseController.setLicenseInfo(Number(element.licenseCode));
                result.push(licenseItem);
            }
            response.result = result;
            res.status(200).json(response);
        } catch (err) {
            response.message = err;
            res.status(500).json(response);
        }
    }

    public async setLicenseInfo(index: any) {
        const result = new Promise<any>(async (resolve, reject) => {
            try {
              
                const [licenseResult]: any[] = await sqlHelper.selectBy<any>(Table.licenseTable, licenseTable.licenseCode, Number(index));
                const [licenseType] = await sqlHelper.selectBy<any>(Table.licenseTypeTable, licenseTypeTable.licenseTypeCode, Number(licenseResult.licenseType));
                const [licensePerson] = await sqlHelper.selectBy<IPerson>(Table.personTable, personTable.personCode, Number(licenseResult.licensePerson));
                const [licenseProvince] = await sqlHelper.selectBy<IProvince>(Table.provinceTable, provinceTable.provinceCode, Number(licenseResult.licenseProvince));
                const [licenseInspector] = await sqlHelper.selectBy<IPerson>(Table.personTable, personTable.personCode, Number(licenseResult.licenseInspector));
                const [request] = await sqlHelper.selectBy<IRequest>(Table.requestTable, requestTable.requestCode, Number(licenseResult.licenseRequestCode));

                const licenseRequest: IRequestLicense = {
                    requestCode: request.requestCode,
                    requestOrderNumber: request.requestOrderNumber,
                    requestDate: request.requestDate,
                }
                const requestItem: any = { 
                    licenseCode: licenseResult.licenseCode, 
                    licenseIdentificator: licenseResult.licenseIdentificator, 
                    licenseType: licenseType, 
                    licenseStatus: licenseResult.licenseStatus, 
                    licensePerson: licensePerson, 
                    licenseProvince: licenseProvince.provinceName,
                    licenseDate: licenseResult.licenseDate,
                    licenseNotTaxDebt: licenseResult.licenseNotTaxDebt,
                    licenseTaxAboutShipProperty: licenseResult.licenseTaxAboutShipProperty,
                    licenseCertificateOfNavigability: licenseResult.licenseCertificateOfNavigability,
                    licenseBoatRegistrationCertificate: licenseResult.licenseBoatRegistrationCertificate,
                    licenseInspector: licenseInspector, 
                    licenseRequest: licenseRequest
                }; 
                resolve(requestItem);
            } catch (err) {
                err.message = 'Error al intentar obtener información sobre las licencias';
                reject(err);
            }
        });
        return result;
    }

    public async setAquaculturePrivate(license: any) {
        const [result]: any[] = await sqlHelper.selectBy<any>(Table.licenseAPTable, licenseAPTable.licenseCode, license.licenseCode);
        const aquaculture: ILicenseAquaculturePrivateInsert = {
            licenseContractNumber: result.licenseContractNumber,
            licenseContract: result.licenseContract
        };
        return aquaculture;
    }


    public async setAquacultureState(license: any) {
        const [result]: any[] = await sqlHelper.selectBy<any>(Table.licenseASTable, licenseASTable.licenseCode, license.licenseCode);
        const [company]: ICompany[] = await sqlHelper.selectBy<ICompany>(Table.companyTable, companyTable.companyCode, result.licenseCompany);
        const shipList: IShip[] = await sqlHelper.selectBy<IShip>(Table.shipTable, requestTable.requestCode, license.licenseRequest.requestCode);
        const reservoirList: IReservoir[] = await sqlHelper.selectBy<IReservoir>(Table.reservoirTable, requestTable.requestCode, license.licenseRequest.requestCode);
        const aquaculture: ILicenseAquacultureStateInsert = {
            licenseContractNumber: result.licenseContractNumber,
            licenseContract: result.licenseContract,
            licenseCompany: company,
            shipList: shipList,
            licenseIRHCertificate: result.licenseIRHCertificate,
            reservoirList: reservoirList
        };
        return aquaculture;
    }


    public async setPlatformPrivate(license: any) {
        const [result]: any[] = await sqlHelper.selectBy<any>(Table.licensePPTable, licenseTable.licenseCode, license.licenseCode);
        const [licenseCaptain] = await sqlHelper.selectBy<IPerson>(Table.personTable, personTable.personCode, Number(result.licenseShipCaptain));
        const requestFishery = await sqlHelper.selectBy<IFishery>(View.lincenseFisheryView, licenseTable.licenseCode, license.licenseCode);
        const [requestFisheryCraft] = await sqlHelper.selectBy<IFisheryCraft>(Table.fisheryCraftTable, fisheryCraftTable.fisherycraftCode, Number(result.licenseFisheryCraft));
        const [requestShip] = await sqlHelper.selectBy<IShip>(View.licenseShipView, licenseTable.licenseCode, license.licenseCode);
        
        const platform: ILicensePlatformInsert = {
            licenseShipCaptain: licenseCaptain,
            licenseFisheryType: requestFishery,
            licenseFisheryCraft: requestFisheryCraft,
            fisheringAreas: result.fisheringAreas,
            licenseContractNumber: result.licenseContractNumber,
            licenseContract: result.licenseContract,
            licenseShip: requestShip
        };
        return platform;
    }

    public async setPlatformState(license: any) {
        const [result] = await sqlHelper.selectBy<any>(Table.licensePPTable, licenseTable.licenseCode, license.licenseCode);
        const [licenseCaptain] = await sqlHelper.selectBy<IPerson>(Table.personTable, personTable.personCode, Number(result.licenseShipCaptain));
        const requestFishery = await sqlHelper.selectBy<IFishery>(View.lincenseFisheryView, licenseTable.licenseCode, license.licenseCode);
        const [requestFisheryCraft] = await sqlHelper.selectBy<IFisheryCraft>(Table.fisheryCraftTable, fisheryCraftTable.fisherycraftCode, Number(result.licenseFisheryCraft));
        const [resultPS] = await sqlHelper.selectBy<any>(Table.licensePSTable, licenseTable.licenseCode, license.licenseCode);
        const [requestCompany] = await sqlHelper.selectBy<ICompany>(Table.companyTable, companyTable.companyCode, resultPS.licenseCompany);
        const [requestShip] = await sqlHelper.selectBy<IShip>(View.licenseShipView, licenseTable.licenseCode, license.licenseCode);

        const platform: ILicensePlatformStateInsert = {
            licenseShipCaptain: licenseCaptain,
            licenseFisheryType: requestFishery,
            licenseFisheryCraft: requestFisheryCraft,
            fisheringAreas: result.fisheringAreas,
            licenseContractNumber: result.licenseContractNumber,
            licenseContract: result.licenseContract,
            licenseShip: requestShip,
            licenseCompany: requestCompany
        };
        return platform;
    }

    public async getAquaculturePrivate(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const response: IResponse = { result: null, err: null, message: null};
        try {
            const licenseItem: any = await licenseController.setLicenseInfo(id);
            const aquaculturePrivate: ILicenseAquaculturePrivateInsert = await licenseController.setAquaculturePrivate(licenseItem);
            const licenseComplete: ILicenseAquaculturePrivate = new LicenseAquaculturePrivate(licenseItem, aquaculturePrivate);
            response.result = licenseComplete;
            res.status(200).json(response);
        } catch (err) {
            response.err = err;
            response.message = err.message;
            res.status(500).json(response);
        }
    }

    public async getAquacultureState(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const response: IResponse = { result: null, err: null, message: null};
        try {
            const licenseItem: any = await licenseController.setLicenseInfo(id);
            const aquacultureState: ILicenseAquacultureStateInsert = await licenseController.setAquacultureState(licenseItem);
            const licenseComplete: ILicenseAquacultureState = new LicenseAquacultureState(licenseItem, aquacultureState);
            response.result = licenseComplete;
            res.status(200).json(response);
        } catch (err) {
            response.err = err;
            response.message = err.message;
            res.status(500).json(response);
        }
    }

    public async getPlatform(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const response: IResponse = { result: null, err: null, message: null};
        try {
            const licenseItem: any = await licenseController.setLicenseInfo(id);
            const platform: ILicensePlatformInsert = await licenseController.setPlatformPrivate(licenseItem);
            const licenseComplete: ILicensePlatform = new LicensePlatform(licenseItem, platform);
            response.result = licenseComplete;
            res.status(200).json(response);
        } catch (err) {
            response.err = err;
            response.message = err.message;
            res.status(500).json(response);
        }
    }

    public async getPlatformState(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        
        const response: IResponse = { result: null, err: null, message: null};
        try {
            const licenseItem: any = await licenseController.setLicenseInfo(id);
            const platform: ILicensePlatformStateInsert = await licenseController.setPlatformState(licenseItem);
            const licenseComplete: ILicensePlatformState = new LicensePlatformState(licenseItem, platform);
            response.result = licenseComplete;
            res.status(200).json(response);
        } catch (err) {
            response.err = err;
            response.message = err.message;
            res.status(500).json(response);
        }
    }

    public async create(licenseItem: any) {
        const result = new Promise<void>(async (resolve, reject) => {
            try {
                const licenseResult = await licenseController.addLicense(licenseItem);
                
                const licenseCode = licenseResult.insertId;
                switch (licenseItem.requestItem.requestType.licenseTypeCode) {
                    case 1:
                        await licenseController.addAquaculturePrivate(licenseItem.requestItem, licenseCode);
                        break;
                    case 2:
                        await licenseController.addAquacultureState(licenseItem.requestItem, licenseCode);
                        break;
                    case 3:
                        await licenseController.addPlatform(licenseItem.requestItem, licenseCode);
                        await licenseController.addFisheryType(licenseItem.requestItem, licenseCode);
                        break;
                    default:
                        await licenseController.addPlatform(licenseItem.requestItem, licenseCode);
                        await licenseController.addFisheryType(licenseItem.requestItem, licenseCode);
                        await licenseController.addPlatformState(licenseItem.requestItem, licenseCode);
                        break;
                }
                resolve();
            } catch (err) {
                err.message = 'Error al intentar Insertar la Licencia';
                reject(err);
            }
        });
        return result;
    }

    public async addLicense(licenseItem: any) {
        const result = new Promise<any>((resolve, reject) => {
            try {
                const newLicense: any = {
                    licenseIdentificator: licenseItem.licenseIdentificator,
                    licenseType: licenseItem.requestItem.requestType.licenseTypeCode,
                    licenseAmount: licenseItem.licenseAmount,
                    licenseStatus: licenseItem.requestStatusName,
                    licensePerson: licenseItem.requestItem.requestPerson.personCode,
                    licenseProvince: licenseItem.requestItem.requestPerson.personProvince,
                    licenseNotTaxDebt: licenseItem.requestItem.requestDocs.notTaxDebtFile,
                    licenseTaxAboutShipProperty: licenseItem.requestItem.requestDocs.taxAboutShipPropertyFile,
                    licenseCertificateOfNavigability: licenseItem.requestItem.requestDocs.certificateOfNavigabilityFile,
                    licenseBoatRegistrationCertificate: licenseItem.requestItem.requestDocs.boatRegistrationCertificateFile,
                    licenseInspector: licenseItem.requestUser,
                    licenseRequestCode: licenseItem.requestCode,
                };
                const sqlResult = sqlHelper.create<any>(Table.licenseTable, newLicense);
                resolve(sqlResult);
            } catch (err) {
                err.message = 'Error al intentar Insertar la Licencia';
                reject(err);
            }
        });
        return result;
    }

    public async addAquaculturePrivate(requestItem: any, licenseCode: number) {
        const result = new Promise<any>((resolve, reject) => {
            try {
                const newLicense: any = {
                    licenseCode: licenseCode,
                    licenseContractNumber: requestItem.requestContractNumber,
                    licenseContract: requestItem.requestContract,
                };
                const sqlResult = sqlHelper.create<any>(Table.licenseAPTable, newLicense);
                resolve(sqlResult);
            } catch (err) {
                err.message = 'Error al intentar Insertar la Licencia Acuícola No Estatal';
                reject(err);
            }
        });
        return result;
    }

    public async addAquacultureState(requestItem: any, licenseCode: number) {
        const result = new Promise<any>((resolve, reject) => {
            try {
                const newLicense: any = {
                    licenseCode: licenseCode,
                    licenseCompany: requestItem.requestCompany.companyCode,
                    licenseIRHCertificate: requestItem.iRHCertificateFile,
                };
                const sqlResult = sqlHelper.create<any>(Table.licenseASTable, newLicense);
                resolve(sqlResult);
            } catch (err) {
                err.message = 'Error al intentar Insertar la Licencia Acuícola Estatal';
                reject(err);
            }
        });
        return result;
    }

    public async addPlatform(requestItem: any, licenseCode: number) {
        const result = new Promise<any>((resolve, reject) => {
            try {
                const newLicense: any = {
                    licenseCode: licenseCode,
                    licenseShipCaptain: requestItem.requestShipCaptain.personCode,
                    licenseFisheryCraft: requestItem.requestFisheryCraft.fisherycraftCode,
                    fisheringAreas: requestItem.fisheringAreas,
                    licenseContractNumber: requestItem.requestContractNumber,
                    licenseContract: requestItem.requestContract
                };
                
                const sqlResult = sqlHelper.create<any>(Table.licensePPTable, newLicense);
                resolve(sqlResult);
            } catch (err) {
                err.message = 'Error al intentar Insertar la Licencia de Plataforma No Estatal';
                reject(err);
            }
        });
        return result;
    }

    public async addFisheryType(requestItem: any, licenseCode: number) {
        const result = new Promise<void>((resolve, reject) => {
            try {
                requestItem.requestFisheryType.forEach((element: any) => {
                    const fisheryData = {
                        licenseCode: licenseCode,
                        fisheryCode: element.fisheryCode
                    };
                    sqlHelper.create<any>(Table.licenseFisheryTable, fisheryData);
                });
                resolve();
            } catch (err) {
                err.message = 'Error al intentar Insertar el Tipo de Pesquería';
                reject(err);
            }
            
        });
        return result;
    }

    public async addPlatformState(requestItem: any, licenseCode: number) {
        const result = new Promise<any>((resolve, reject) => {
            try {
                const newLicense: any = {
                    licenseCode: licenseCode,
                    licenseCompany: requestItem.requestCompany.companyCode
                };
                const sqlResult = sqlHelper.create<any>(Table.licensePSTable, newLicense);
                resolve(sqlResult);
            } catch (err) {
                err.message = 'Error al intentar Insertar la Licencia de Plataforma Estatal';
                reject(err);
            }
        });
        return result;
    }

}

export const licenseController = new LicenseController();