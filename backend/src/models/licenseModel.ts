import { IPerson } from "./userModel";
import { IRequestLicense } from "./requestModel";
import { ICompany, IFishery, IFisheryCraft, IReservoir, IShip } from "./utilsModel";

export interface ILicenseType {
  licenseTypeCode?: number;
  licenseTypeThumbs: string;
  licenseTypeName: string;
}


export interface ILicense{
  licenseCode: number;
  licenseIdentificator: string;
  licenseType: ILicenseType;
  licenseAmount: number;
  licenseStatus: string;
  licensePerson: IPerson;
  licenseProvince: string;
  licenseDate: string;
  licenseNotTaxDebt: string;
  licenseTaxAboutShipProperty: string;
  licenseCertificateOfNavigability: string;
  licenseBoatRegistrationCertificate: string;
  licenseInspector: IPerson;
  licenseRequest: IRequestLicense;
}

export interface ILicenseAquaculturePrivateInsert{
  licenseContractNumber: string;
  licenseContract: string;
}

export interface ILicenseAquaculturePrivate{
  licenseCode: number,
  licenseIdentificator: string,
  licenseType: ILicenseType,
  licenseAmount: number,
  licenseStatus: string,
  licensePerson: IPerson,
  licenseProvince: string,
  licenseDate: string;
  licenseNotTaxDebt: string,
  licenseTaxAboutShipProperty: string,
  licenseCertificateOfNavigability: string,
  licenseBoatRegistrationCertificate: string,
  licenseInspector: IPerson,
  licenseRequest: IRequestLicense
  licenseContractNumber: string;
  licenseContract: string;
}

export class LicenseAquaculturePrivate implements ILicenseAquaculturePrivate {
    public licenseCode: number;
    public licenseIdentificator: string;
    public licenseType: ILicenseType;
    public licenseAmount: number;
    public licenseStatus: string;
    public licensePerson: IPerson;
    public licenseProvince: string;
    public licenseDate: string;
    public licenseNotTaxDebt: string;
    public licenseTaxAboutShipProperty: string;
    public licenseCertificateOfNavigability: string;
    public licenseBoatRegistrationCertificate: string;
    public licenseInspector: IPerson;
    public licenseRequest: IRequestLicense;
    public licenseContractNumber: string;
    public licenseContract: string;
  
    constructor(license: ILicense, aquaculture: ILicenseAquaculturePrivateInsert) {
      this.licenseCode = license.licenseCode;
      this.licenseIdentificator = license.licenseIdentificator;
      this.licenseType = license.licenseType;
      this.licenseAmount = license.licenseAmount;
      this.licenseStatus = license.licenseStatus;
      this.licensePerson = license.licensePerson;
      this.licenseProvince = license.licenseProvince;
      this.licenseDate = license.licenseDate;
      this.licenseNotTaxDebt = license.licenseNotTaxDebt;
      this.licenseTaxAboutShipProperty = license.licenseTaxAboutShipProperty;
      this.licenseCertificateOfNavigability = license.licenseCertificateOfNavigability;
      this.licenseBoatRegistrationCertificate = license.licenseBoatRegistrationCertificate;
      this.licenseInspector = license.licenseInspector;
      this.licenseRequest = license.licenseRequest;
      this.licenseContractNumber = aquaculture.licenseContractNumber;
      this.licenseContract = aquaculture.licenseContract;
    }

} 


export interface ILicenseAquacultureState{
  licenseCode: number;
  licenseIdentificator: string;
  licenseType: ILicenseType;
  licenseAmount: number;
  licenseStatus: string;
  licensePerson: IPerson;
  licenseProvince: string;
  licenseDate: string;
  licenseNotTaxDebt: string;
  licenseTaxAboutShipProperty: string;
  licenseCertificateOfNavigability: string;
  licenseBoatRegistrationCertificate: string;
  licenseInspector: IPerson;
  licenseRequest: IRequestLicense;
  licenseContractNumber: string;
  licenseContract: string;
  licenseCompany: ICompany;
  shipList: IShip[];
  licenseIRHCertificate: string;
  reservoirList: IReservoir[];
}

export interface ILicenseAquacultureStateInsert{
  licenseContractNumber: string;
  licenseContract: string;
  licenseCompany: ICompany;
  shipList: IShip[];
  licenseIRHCertificate: string;
  reservoirList: IReservoir[];
}

export class LicenseAquacultureState implements ILicenseAquacultureState {
  public licenseCode: number;
  public licenseIdentificator: string;
  public licenseType: ILicenseType;
  public licenseAmount: number;
  public licenseStatus: string;
  public licensePerson: IPerson;
  public licenseProvince: string;
  public licenseDate: string;
  public licenseNotTaxDebt: string;
  public licenseTaxAboutShipProperty: string;
  public licenseCertificateOfNavigability: string;
  public licenseBoatRegistrationCertificate: string;
  public licenseInspector: IPerson;
  public licenseRequest: IRequestLicense;
  public licenseContractNumber: string;
  public licenseContract: string;
  public licenseCompany: ICompany;
  public shipList: IShip[];
  public licenseIRHCertificate: string;
  public reservoirList: IReservoir[];

  constructor(license: ILicense, aquaculture: ILicenseAquacultureStateInsert) {
    this.licenseCode = license.licenseCode;
    this.licenseIdentificator = license.licenseIdentificator;
    this.licenseType = license.licenseType;
    this.licenseAmount = license.licenseAmount;
    this.licenseStatus = license.licenseStatus;
    this.licensePerson = license.licensePerson;
    this.licenseProvince = license.licenseProvince;
    this.licenseDate = license.licenseDate;
    this.licenseNotTaxDebt = license.licenseNotTaxDebt;
    this.licenseTaxAboutShipProperty = license.licenseTaxAboutShipProperty;
    this.licenseCertificateOfNavigability = license.licenseCertificateOfNavigability;
    this.licenseBoatRegistrationCertificate = license.licenseBoatRegistrationCertificate;
    this.licenseInspector = license.licenseInspector;
    this.licenseRequest = license.licenseRequest;
    this.licenseContractNumber = aquaculture.licenseContractNumber;
    this.licenseContract = aquaculture.licenseContract;
    this.licenseCompany = aquaculture.licenseCompany;
    this.shipList = aquaculture.shipList;
    this.licenseIRHCertificate = aquaculture.licenseIRHCertificate;
    this.reservoirList = aquaculture.reservoirList;
  }

} 


export interface ILicensePlatform{
  licenseCode: number;
  licenseIdentificator: string;
  licenseType: ILicenseType;
  licenseAmount: number;
  licenseStatus: string;
  licensePerson: IPerson;
  licenseProvince: string;
  licenseDate: string;
  licenseNotTaxDebt: string;
  licenseTaxAboutShipProperty: string;
  licenseCertificateOfNavigability: string;
  licenseBoatRegistrationCertificate: string;
  licenseInspector: IPerson;
  licenseRequest: IRequestLicense;
  licenseShipCaptain: IPerson;
  licenseFisheryType: IFishery[];
  licenseFisheryCraft: IFisheryCraft;
  fisheringAreas: string;
  licenseContractNumber: string;
  licenseContract: string;
  licenseShip: IShip;
}


export interface ILicensePlatformInsert{
  licenseShipCaptain: IPerson;
  licenseFisheryType: IFishery[];
  licenseFisheryCraft: IFisheryCraft;
  fisheringAreas: string;
  licenseContractNumber: string;
  licenseContract: string;
  licenseShip: IShip;
}

export class LicensePlatform implements ILicensePlatform {
  public licenseCode: number;
  public licenseIdentificator: string;
  public licenseType: ILicenseType;
  public licenseAmount: number;
  public licenseStatus: string;
  public licensePerson: IPerson;
  public licenseProvince: string;
  public licenseDate: string;
  public licenseNotTaxDebt: string;
  public licenseTaxAboutShipProperty: string;
  public licenseCertificateOfNavigability: string;
  public licenseBoatRegistrationCertificate: string;
  public licenseInspector: IPerson;
  public licenseRequest: IRequestLicense;
  public licenseShipCaptain: IPerson;
  public licenseFisheryType: IFishery[];
  public licenseFisheryCraft: IFisheryCraft;
  public fisheringAreas: string;
  public licenseContractNumber: string;
  public licenseContract: string;
  public licenseShip: IShip;

  constructor(license: ILicense, aquaculture: ILicensePlatformInsert) {
    this.licenseCode = license.licenseCode;
    this.licenseIdentificator = license.licenseIdentificator;
    this.licenseType = license.licenseType;
    this.licenseAmount = license.licenseAmount;
    this.licenseStatus = license.licenseStatus;
    this.licensePerson = license.licensePerson;
    this.licenseProvince = license.licenseProvince;
    this.licenseDate = license.licenseDate;
    this.licenseNotTaxDebt = license.licenseNotTaxDebt;
    this.licenseTaxAboutShipProperty = license.licenseTaxAboutShipProperty;
    this.licenseCertificateOfNavigability = license.licenseCertificateOfNavigability;
    this.licenseBoatRegistrationCertificate = license.licenseBoatRegistrationCertificate;
    this.licenseInspector = license.licenseInspector;
    this.licenseRequest = license.licenseRequest;
    this.licenseShipCaptain = aquaculture.licenseShipCaptain;
    this.licenseFisheryType = aquaculture.licenseFisheryType;
    this.licenseFisheryCraft = aquaculture.licenseFisheryCraft;
    this.fisheringAreas = aquaculture.fisheringAreas;
    this.licenseContractNumber = aquaculture.licenseContractNumber;
    this.licenseContract = aquaculture.licenseContract;
    this.licenseShip = aquaculture.licenseShip;
  }

} 


export interface ILicensePlatformState{
  licenseCode: number;
  licenseIdentificator: string;
  licenseType: ILicenseType;
  licenseAmount: number;
  licenseStatus: string;
  licensePerson: IPerson;
  licenseProvince: string;
  licenseDate: string;
  licenseNotTaxDebt: string;
  licenseTaxAboutShipProperty: string;
  licenseCertificateOfNavigability: string;
  licenseBoatRegistrationCertificate: string;
  licenseInspector: IPerson;
  licenseRequest: IRequestLicense;
  licenseShipCaptain: IPerson;
  licenseFisheryType: IFishery[];
  licenseFisheryCraft: IFisheryCraft;
  fisheringAreas: string;
  licenseContractNumber: string;
  licenseContract: string;
  licenseShip: IShip;
  licenseCompany: ICompany;
}

export interface ILicensePlatformStateInsert{
  licenseShipCaptain: IPerson;
  licenseFisheryType: IFishery[];
  licenseFisheryCraft: IFisheryCraft;
  fisheringAreas: string;
  licenseContractNumber: string;
  licenseContract: string;
  licenseShip: IShip;
  licenseCompany: ICompany;
}

export class LicensePlatformState implements ILicensePlatformState {
  public licenseCode: number;
  public licenseIdentificator: string;
  public licenseType: ILicenseType;
  public licenseAmount: number;
  public licenseStatus: string;
  public licensePerson: IPerson;
  public licenseProvince: string;
  public licenseDate: string;
  public licenseNotTaxDebt: string;
  public licenseTaxAboutShipProperty: string;
  public licenseCertificateOfNavigability: string;
  public licenseBoatRegistrationCertificate: string;
  public licenseInspector: IPerson;
  public licenseRequest: IRequestLicense;
  public licenseShipCaptain: IPerson;
  public licenseFisheryType: IFishery[];
  public licenseFisheryCraft: IFisheryCraft;
  public fisheringAreas: string;
  public licenseContractNumber: string;
  public licenseContract: string;
  public licenseShip: IShip;
  public licenseCompany: ICompany;

  constructor(license: ILicense, aquaculture: ILicensePlatformStateInsert) {
    this.licenseCode = license.licenseCode;
    this.licenseIdentificator = license.licenseIdentificator;
    this.licenseType = license.licenseType;
    this.licenseAmount = license.licenseAmount;
    this.licenseStatus = license.licenseStatus;
    this.licensePerson = license.licensePerson;
    this.licenseProvince = license.licenseProvince;
    this.licenseDate = license.licenseDate;
    this.licenseNotTaxDebt = license.licenseNotTaxDebt;
    this.licenseTaxAboutShipProperty = license.licenseTaxAboutShipProperty;
    this.licenseCertificateOfNavigability = license.licenseCertificateOfNavigability;
    this.licenseBoatRegistrationCertificate = license.licenseBoatRegistrationCertificate;
    this.licenseInspector = license.licenseInspector;
    this.licenseRequest = license.licenseRequest;
    this.licenseShipCaptain = aquaculture.licenseShipCaptain;
    this.licenseFisheryType = aquaculture.licenseFisheryType;
    this.licenseFisheryCraft = aquaculture.licenseFisheryCraft;
    this.fisheringAreas = aquaculture.fisheringAreas;
    this.licenseContractNumber = aquaculture.licenseContractNumber;
    this.licenseContract = aquaculture.licenseContract;
    this.licenseShip = aquaculture.licenseShip;
    this.licenseCompany = aquaculture.licenseCompany;
  }

} 

