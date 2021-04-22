import { IPerson } from 'src/app/shared/models/person.model';
import { License, LicenseStatus, LicenseThumbs } from './license.model';
import { IShip } from '../../../shared/models/ship.model';

export interface ILicensePlatformPrivate{
    licenseCode: number;
    licenseOrderNumber: string;
    licenseNotTaxDebt: string;
    licenseTaxAboutShipProperty: string;
    licenseThumbs: string;
    licenseType: string;
    licenseProvince: number;
    licenseStatus: LicenseStatus;
    licenseOwner: IPerson;
    licenseContractNumber: string;
    licenseContract: string;
    licenseShip: IShip;
    licenseEnvironment: string
  }

export class LicensePlatformPrivate extends License{
    public licenseOwner: IPerson;
    public licenseContractNumber: string;
    public licenseContract: string;
    public licenseShip: IShip;
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
                licenseOwner,
                licenseContractNumber,
                licenseContract,
                licenseShip,
                licenseEnvironment) {
        super(licenseCode,
              licenseOrderNumber,
              licenseNotTaxDebt,
              licenseTaxAboutShipProperty,
              licenseCertificateOfNavigability,
              licenseBoatRegistrationCertificate,
              licenseThumbs = LicenseThumbs.PlatformPrivate,
              licenseType = 'Licencia Comercial de Plataforma no Estatal',
              licenseStatus,
              licenseProvince);
        this.licenseOwner = licenseOwner;
        this.licenseContractNumber = licenseContractNumber;
        this.licenseContract = licenseContract;
        this.licenseShip = licenseShip;
        this.licenseEnvironment = licenseEnvironment;
    }
}