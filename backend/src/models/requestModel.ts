import { ILicenseType } from './licenseModel';
import { IPerson } from './userModel';
import { ICompany, IShip, IReservoir, IFishery, IFisheryCraft } from "./utilsModel";
import { IDocs } from './filesModel';

export interface IRequestStatus {
  requestStatusCode?: number;
  requestCode: number;
  requestStatusName: string;
  requestUser: number; 
  requestObservation?: string;
  requestStatusDate?: Date;
}

export interface IRequestStatusInsert {
  requestCode: number;
  requestStatusName: string;
  requestUser: number; 
  requestObservation: string;
}

export interface IRequest {
  requestCode: number;
  requestOrderNumber: string;
  requestType: ILicenseType;
  requestStatus: string;
  requestProvince: string;
  requestDate: string;
}

export interface IRequestLicense {
  requestCode: number;
  requestOrderNumber: string;
  requestDate: string;
}

export interface IRequestSearch {
  requestCode: number;
  requestOrderNumber: string;
  requestType: ILicenseType;
  requestPerson: IPerson;
  requestStatus: string;
  requestProvince: string;
  requestProvinceCode?: number;
  requestDate: string;
}

export interface IRequestData {
  requestCode: number;
  requestOrderNumber: string;
  requestType: ILicenseType;
  requestPerson: IPerson;
  requestStatus: string;
  requestProvince: string;
  requestProvinceCode?: number;
  requestDate: string;
  requestDocs: IDocs;
}

export interface IRequestInsert {
  requestOrderNumber: string;
  requestType: ILicenseType;
  requestPerson: IPerson;
  requestProvince: string;
}

export interface IAquaculturePrivate{
  requestCode: number;
  requestContractNumber: string;
  requestContract: string;
}

export interface IRequestAquaculturePrivate{
  requestCode?: number;
  requestOrderNumber: string;
  requestType: ILicenseType;
  requestPerson: IPerson;
  requestStatus: string;
  requestProvince: string;
  requestDate?: string;
  requestDocs: IDocs;
  requestContractNumber: string;
  requestContract: string;
}

export class RequestAquaculturePrivate implements IRequestAquaculturePrivate {
  public requestCode: number;
  public requestOrderNumber: string;
  public requestType: ILicenseType;
  public requestPerson: IPerson;
  public requestStatus: string;
  public requestProvince: string;
  public requestDate: string;
  public requestDocs: IDocs;
  public requestContractNumber: string;
  public requestContract: string;

  constructor(request: IRequestData, aquaculturePrivate: IAquaculturePrivate) {
    this.requestCode = request.requestCode;
    this.requestOrderNumber = request.requestOrderNumber;
    this.requestType = request.requestType;
    this.requestPerson = request.requestPerson;
    this.requestStatus = request.requestStatus;
    this.requestProvince = request.requestProvince;
    this.requestDate = request.requestDate;
    this.requestDocs = request.requestDocs;
    this.requestContractNumber = aquaculturePrivate.requestContractNumber;
    this.requestContract = aquaculturePrivate.requestContract;
  }

}

export interface IAquacultureStateInsert{
  requestCode: number;
  requestCompany?: number;
  iRHCertificateFile?: string;
}

export interface IAquacultureState{
  requestCode: number;
  requestContractNumber: string;
  requestContract: string;
  requestCompany: ICompany;
  requestShipList: IShip[];
  iRHCertificateFile: string;
  requestReservoirList: IReservoir[];
}

export interface IRequestAquacultureState{
  requestCode: number;
  requestOrderNumber: string;
  requestType: ILicenseType;
  requestPerson: IPerson;
  requestStatus: string;
  requestProvince: string;
  requestDate: string;
  requestDocs: IDocs;
  requestContractNumber: string;
  requestContract: string;
  requestCompany: ICompany;
  requestShipList: IShip[];
  iRHCertificateFile: string;
  requestReservoirList: IReservoir[];
}

export class RequestAquacultureState implements IRequestAquacultureState {
  public requestCode: number;
  public requestOrderNumber: string;
  public requestType: ILicenseType;
  public requestPerson: IPerson;
  public requestStatus: string;
  public requestProvince: string;
  public requestDate: string;
  public requestDocs: IDocs;
  public requestContractNumber: string;
  public requestContract: string;
  public requestCompany: ICompany;
  public requestShipList: IShip[];
  public iRHCertificateFile: string;
  public requestReservoirList: IReservoir[];

  constructor(request: IRequestData, aquacultureState: IAquacultureState) {
    this.requestCode = request.requestCode;
    this.requestOrderNumber = request.requestOrderNumber;
    this.requestType = request.requestType;
    this.requestPerson = request.requestPerson;
    this.requestStatus = request.requestStatus;
    this.requestProvince = request.requestProvince;
    this.requestDate = request.requestDate;
    this.requestDocs = request.requestDocs;
    this.requestContractNumber = aquacultureState.requestContractNumber;
    this.requestContract = aquacultureState.requestContract;
    this.requestCompany = aquacultureState.requestCompany;
    this.requestShipList = aquacultureState.requestShipList;
    this.iRHCertificateFile = aquacultureState.iRHCertificateFile;
    this.requestReservoirList = aquacultureState.requestReservoirList;
  }

}

export interface IRequestPlatformInsert{
  requestCode?: number;
  requestShipCaptain: number;
  requestFisheryCraft: number;
  fisheringAreas: string;
}

export interface IRequestPlatform{
  requestCode: number;
  requestShipCaptain: IPerson;
  requestFisheryType: IFishery[];
  requestFisheryCraft: IFisheryCraft;
  fisheringAreas: string;
  requestContractNumber: string;
  requestContract: string;
  requestShip: IShip;
}

export interface IRequestPlatformPrivate{
  requestCode: number;
  requestOrderNumber: string;
  requestType: ILicenseType;
  requestPerson: IPerson;
  requestStatus: string;
  requestProvince: string;
  requestDate: string;
  requestDocs: IDocs;
  requestShipCaptain: IPerson;
  requestFisheryType: IFishery[];
  requestFisheryCraft: IFisheryCraft;
  fisheringAreas: string;
  requestContractNumber: string;
  requestContract: string;
  requestShip: IShip;
}

export class RequestPlatform implements IRequestPlatformPrivate{
  public requestCode: number;
  public requestOrderNumber: string;
  public requestType: ILicenseType;
  public requestPerson: IPerson;
  public requestStatus: string;
  public requestProvince: string;
  public requestDate: string;
  public requestDocs: IDocs;
  public requestShipCaptain: IPerson;
  public requestFisheryType: IFishery[];
  public requestFisheryCraft: IFisheryCraft;
  public fisheringAreas: string;
  public requestContractNumber: string;
  public requestContract: string;
  public requestShip: IShip;

  constructor(request: IRequestData, platform: IRequestPlatform) {
    this.requestCode = request.requestCode;
    this.requestOrderNumber = request.requestOrderNumber;
    this.requestType = request.requestType;
    this.requestPerson = request.requestPerson;
    this.requestStatus = request.requestStatus;
    this.requestProvince = request.requestProvince;
    this.requestDate = request.requestDate;
    this.requestDocs = request.requestDocs;
    this.requestShipCaptain = platform.requestShipCaptain;
    this.requestFisheryType = platform.requestFisheryType;
    this.requestFisheryCraft = platform.requestFisheryCraft;
    this.fisheringAreas = platform.fisheringAreas;
    this.requestContractNumber = platform.requestContractNumber;
    this.requestContract = platform.requestContract;
    this.requestShip = platform.requestShip;
  }

}

export interface IRequestPlatformState{
  requestCode: number;
  requestCompany: number;
}

export interface IPlatformState{
  requestCode: number;
  requestOrderNumber: string;
  requestType: ILicenseType;
  requestPerson: IPerson;
  requestStatus: string;
  requestProvince: string;
  requestDate: string;
  requestDocs: IDocs;
  requestShipCaptain: IPerson;
  requestFisheryType: IFishery[];
  requestFisheryCraft: IFisheryCraft;
  fisheringAreas: string;
  requestContractNumber: string;
  requestContract: string;
  requestShip: IShip;
  requestCompany: ICompany;
}

export class RequestPlatformState implements IPlatformState{
  public requestCode: number;
  public requestOrderNumber: string;
  public requestType: ILicenseType;
  public requestPerson: IPerson;
  public requestStatus: string;
  public requestProvince: string;
  public requestDate: string;
  public requestDocs: IDocs;
  public requestShipCaptain: IPerson;
  public requestFisheryType: IFishery[];
  public requestFisheryCraft: IFisheryCraft;
  public fisheringAreas: string;
  public requestContractNumber: string;
  public requestContract: string;
  public requestShip: IShip;
  public requestCompany: ICompany;

  constructor(request: IRequestData, platform: IRequestPlatform, requestCompany: ICompany) {
    this.requestCode = request.requestCode;
    this.requestOrderNumber = request.requestOrderNumber;
    this.requestType = request.requestType;
    this.requestPerson = request.requestPerson;
    this.requestStatus = request.requestStatus;
    this.requestProvince = request.requestProvince;
    this.requestDate = request.requestDate;
    this.requestDocs = request.requestDocs;
    this.requestShipCaptain = platform.requestShipCaptain;
    this.requestFisheryType = platform.requestFisheryType;
    this.requestFisheryCraft = platform.requestFisheryCraft;
    this.fisheringAreas = platform.fisheringAreas;
    this.requestContractNumber = platform.requestContractNumber;
    this.requestContract = platform.requestContract;
    this.requestShip = platform.requestShip;
    this.requestCompany = requestCompany;
  }

}
