import { ICompany } from 'src/app/shared/models/company.model';
import { License, LicenseStatus, LicenseThumbs } from './license.model';
import { IShip } from '../../../shared/models/ship.model';
import { Captain } from './../../../shared/models/person.model';

export interface ILicensePlatformState{
    licenseCode: number;
    licenseOrderNumber: string;
    licenseNotTaxDebt: string;
    licenseTaxAboutShipProperty: string;
    licenseCertificateOfNavigability: string;
    licenseBoatRegistrationCertificate:string;
    licenseThumbs: string;
    licenseType: string;
    licenseStatus: LicenseStatus;
    licenseProvince: number
    licenseCompany: ICompany;
    licenseCaptain: Captain;
    licenseShip: IShip;
    licenseFisheryType: string;
    licenseFisheryCraft: string;
    licenseOperationAreas: string;
    licenseEnvironment: string
  }

export class LicensePlatformState extends License{
    public licenseCompany: ICompany;
    public licenseShip: IShip;
    public licenseCaptain: Captain;
    public licenseFisheryType: string;
    public licenseFisheryCraft: string;
    public licenseOperationAreas: string;
    public licenseEnvironment: string

    constructor(licenseCode,
                licenseOrderNumber,
                licenseNotTaxDebt,
                licenseTaxAboutShipProperty,
                licenseCertificateOfNavigability,
                licenseBoatRegistrationCertificate,
                licenseThumbs,
                licenseType,
                licenseStatus,
                licenseProvince,
                licenseCompany,
                licenseShip,
                licenseCaptain,
                licenseFisheryType,
                licenseFisheryCraft,
                licenseOperationAreas,
                licenseEnvironment, ) {
        super(licenseCode,
              licenseOrderNumber,
              licenseNotTaxDebt,
              licenseTaxAboutShipProperty,
              licenseCertificateOfNavigability,
              licenseBoatRegistrationCertificate,
              licenseThumbs = LicenseThumbs.PlatformState,
              licenseType = 'Licencia Comercial de Plataforma Estatal',
              licenseStatus,
              licenseProvince);
        this.licenseCompany = licenseCompany;
        this.licenseShip = licenseShip;
        this.licenseCaptain = licenseCaptain;
        this.licenseFisheryType = licenseFisheryType;
        this.licenseFisheryCraft = licenseFisheryCraft;
        this.licenseOperationAreas = licenseOperationAreas;
        this.licenseEnvironment = licenseEnvironment;
    }
}