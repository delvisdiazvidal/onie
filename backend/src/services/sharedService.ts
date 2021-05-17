import pool from '../config/database';
import { sqlHelper } from "../helpers/sqlHelper";
import { ILicenseType } from "models/licenseModel";
import { IRequestData, IRequestInsert, IRequestStatus, IRequestStatusInsert } from "models/requestModel";
import { IPerson, IUser, IUserPerson, IUserRole, User } from "../models/userModel";
import { ICompany, IMunicipalite, IProvince } from "../models/utilsModel";
import {    licenseTypeTable, 
            personTable, 
            municipaliteTable,
            provinceTable,
            requestTable, 
            Table, 
            userRoleTable,
            roleTable,
            userTable, 
            View } from "../helpers/tableHelper";
import { IContractDocs, IContractDocsString, IDocs } from "../models/filesModel";
import { IRoles } from "../models/rolesModel";

class SharedService {
    
    public async getRequest(index: any) {

        try {
            const [result]: IRequestData[] = await sqlHelper.selectBy<IRequestData>(View.requestView, requestTable.requestCode, Number(index));
            const [requestType] = await sqlHelper.selectBy<ILicenseType>(Table.licenseTypeTable, licenseTypeTable.licenseTypeCode, Number(result.requestType));
            const [requestPerson] = await sqlHelper.selectBy<IPerson>(Table.personTable, personTable.personCode, Number(result.requestPerson));
            const requestStatus = await sqlHelper.selectLastBy<IRequestStatus>(Table.requestStatusTable, requestTable.requestCode, Number(result.requestCode));
            const [requestDocs] = await sqlHelper.selectBy<IDocs>(Table.docsTable, requestTable.requestCode, Number(result.requestCode));
            const requestItem: IRequestData = { 
                requestCode: result.requestCode, 
                requestOrderNumber: result.requestOrderNumber, 
                requestType: requestType, 
                requestPerson: requestPerson, 
                requestStatus: requestStatus.requestStatusName, 
                requestProvince: result.requestProvince,
                requestProvinceCode: result.requestProvinceCode,
                requestDate: result.requestDate,
                requestDocs: requestDocs
            }; 
            return requestItem;
        } catch (err) {
            err.message = 'Solicitud Inexistente';
            return err;
        }
    }

    public async getContract(requestCode: any) {
        const result = new Promise<any>(async (resolve, reject) => {
            try {
                const [result] = await sqlHelper.selectBy<IContractDocsString>(Table.contractTable, requestTable.requestCode, Number(requestCode));
                resolve(result);
            } catch (err) {
                err.message = 'Contrato Inexistente';
                reject(err);
            }
        });
        return result;
    }

    public async checkPerson(personData: any): Promise<number> {
        const result = new Promise<number>((resolve, reject) => {
            
            pool.query('SELECT * FROM person_table WHERE firstName = ? AND lastName = ?  AND personCI = ?', 
                [personData.personName,
                personData.personLastName,
                personData.personCI],
            (err: any, rows: any) => {
                if (err) { reject(err);} 
                if (rows && rows.length < 1) { resolve(0);} 
                else { resolve(rows[0].personCode); }
            });
        });
        return result;
    }

    public async addPersonData(requestPerson: any) {
        const result = new Promise<any>(async (resolve, reject) => {
          
            try {
                const personData: IPerson = {
                    firstName: requestPerson.personName,
                    lastName: requestPerson.personLastName,
                    personCI: requestPerson.personCI,
                    personDir: requestPerson.personDir,
                    personMunicipalite: requestPerson.personMunicipalite,
                    personProvince: requestPerson.personProvince,
                    personPhone: requestPerson.personPhone,
                    personEmail: requestPerson.personEmail,
                };
                
                const personCode = await this.checkPerson(requestPerson);
                if (personCode === 0) {
                    const resultPerson: any = await sqlHelper.create<any>(Table.personTable, personData);
                    resolve(resultPerson.insertId); 
                } else {
                    await sqlHelper.update<IPerson>(Table.personTable, personTable.personCode, personCode, personData);
                    resolve(personCode);
                }
            } catch (err) {
                err.message = 'Error al intentar Insertar información sobre la persona.';
                reject(err);
            }
            
        });
        return result;
    }

    public async getPersonData(userCode: any) {
        const result = new Promise<any>(async (resolve, reject) => {
          
            try {
                const [personResult]: IUserPerson[]  = await sqlHelper.filterBy<IUserPerson>(View.userView, userTable.userCode, Number(userCode));
                if (personResult) {
                    const [municipaliteResult]: IMunicipalite[]  = await sqlHelper.selectBy<IMunicipalite>(Table.municipaliteTable, municipaliteTable.municipaliteCode, personResult.personMunicipalite);
                    const [provinceResult]: IProvince[]  = await sqlHelper.selectBy<IProvince>(Table.provinceTable, provinceTable.provinceCode, personResult.personProvince);
                    const [roleResult]: IUserRole[]  = await sqlHelper.selectBy<IUserRole>(Table.userRoleTable, userRoleTable.userCode, Number(userCode));
                    const [userRoleResult]: IRoles[]  = await sqlHelper.selectBy<IRoles>(Table.roleTable, roleTable.roleCode, Number(roleResult.roleCode));
                    
                    
                    const personData: IUser = {
                        userCode: userCode,
                        username: personResult.username,
                        firstName: personResult.firstName,
                        lastName: personResult.lastName,
                        personCI: personResult.personCI,
                        personDir: personResult.personDir,
                        personMunicipalite: municipaliteResult,
                        personProvince: provinceResult,
                        personPhone: personResult.personPhone,
                        personEmail: personResult.personEmail,
                        userRol: userRoleResult,
                        createAt: personResult.createAt,
                        modifyAt: personResult.modifyAt,
                        expiredAt: personResult.expiredAt,
                    };

                    const personUser = new User(personData);
                   // console.log(personUser);
                    resolve(personUser);
                } else {
                    console.log(userCode);
                    resolve(personResult);
                }
            } catch (err) {
                err.message = 'Error al intentar Obtener información sobre la persona.';
                reject(err);
            }
        });
        return result;
    }

    public async addRequestMain(requestData: any, personCode: any) {
        const result = new Promise<any>((resolve, reject) => {
            try {
                const requestMainData: IRequestInsert = {
                    requestOrderNumber: requestData.requestOrderNumber,
                    requestType: requestData.requestType.licenseTypeCode,
                    requestPerson: personCode,
                    requestProvince: requestData.requestProvince,
                };
                const sqlResult = sqlHelper.create<IRequestInsert>(Table.requestTable, requestMainData);
                resolve(sqlResult);
            } catch (err) {
                err.message = 'Error al intentar crear la Solicitud.';
                reject(err);
            }
        });
        return result;
    }

    /** POR LLAMAR */
    public async addContractDocs(requestCode: any, personCode: any) {
        const result = new Promise<any>((resolve, reject) => {
            try {
                const requestAP: IContractDocs = {
                    requestCode: requestCode,
                    contractNumber: '',
                    contractFile: requestCode
                };
                const sqlResult = sqlHelper.create<IContractDocs>(Table.requestTable, requestCode);
                resolve(sqlResult);
            } catch (err) {
                err.message = 'Error al intentar Insertar el Contrato.';
                reject(err);
            }
        });
        return result;
    }

    public async addCompany(requestCompany: ICompany) {
        const result = new Promise<any>((resolve, reject) => {
            try {
                const company: ICompany = {
                    companyCode: requestCompany.companyCode,
                    companyREEUP: requestCompany.companyREEUP,
                    companyName: requestCompany.companyName,
                    companyDir: requestCompany.companyDir,
                    companyMunicipalite: requestCompany.companyMunicipalite,
                    companyProvince: requestCompany.companyProvince,
                    companyEntity: requestCompany.companyEntity,
                    companyFishingBrigade: requestCompany.companyFishingBrigade,
                };
                const sqlResult = sqlHelper.create<ICompany>(Table.companyTable, company);
                resolve(sqlResult);
            } catch (err) {
                err.message = 'Error al intentar Insertar información sobre la Empresa.';
                reject(err);
            }
        });
        return result;
    }

    public async addRequestStatus(requestData: any) {
        const result = new Promise<any>((resolve, reject) => {

            const requestStatus: IRequestStatusInsert = {
                requestCode: requestData.requestCode,
                requestStatusName: requestData.requestStatus,
                requestUser: requestData.requestPerson.personCode,
                requestObservation: '',
            };
            const result: any = sqlHelper.create<IRequestStatusInsert>(Table.requestStatusTable, requestStatus);
            resolve(result);
        });
        return result;
    }
}

export const sharedService = new SharedService();
