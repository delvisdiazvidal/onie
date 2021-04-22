export enum LicenseStatus {
    Solicitada = 'Solicitada',
    Aprobada = 'Aprobada',
    Denegada = 'Denegada'
  }

export enum LicenseThumbs {
    AquacultureState = 'AE',
    AquaculturePrivate = 'AP',
    PlatformState = 'PE',
    PlatformPrivate = 'PP',
  }

export enum LicenseType {
    AquacultureState = 'Licencia Comercial Acuícola Estatal',
    AquaculturePrivate = 'Licencia Comercial Acuícola no Estatal',
    PlatformState = 'Licencia Comercial de Plataforma Estatal',
    PlatformPrivate = 'Licencia Comercial de Plataforma no Estatal',
  }

export interface ILicenseType {
    licenseTypeCode: number;
    licenseTypeThumbs: string;
    licenseTypeName: string;
  }

export interface ILicense {
    licenseCode: number;
    licenseOrderNumber: string;
    licenseNotTaxDebt: string;
    licenseTaxAboutShipProperty: string;
    licenseCertificateOfNavigability: string;
    licenseBoatRegistrationCertificate: string;
    licenseThumbs: string;
    licenseType: string;
    licenseStatus: LicenseStatus;
    licenseProvince: number;
  }

export class License {
    public licenseCode: number;
    public licenseOrderNumber: string;
    public licenseNotTaxDebt: string;
    public licenseTaxAboutShipProperty: string;
    public licenseCertificateOfNavigability: string;
    public licenseBoatRegistrationCertificate: string;
    public licenseThumbs: string;
    public licenseType: string;
    public licenseStatus: LicenseStatus;
    public licenseProvince: number;

    constructor(licenseCode: number,
                licenseOrderNumber: string,
                licenseNotTaxDebt: string,
                licenseTaxAboutShipProperty: string,
                licenseCertificateOfNavigability: string,
                licenseBoatRegistrationCertificate: string,
                licenseThumbs: string,
                licenseType: string,
                licenseStatus: LicenseStatus,
                licenseProvince: number) {
        this.licenseCode = licenseCode;
        this.licenseOrderNumber = licenseOrderNumber;
        this.licenseNotTaxDebt = licenseNotTaxDebt;
        this.licenseTaxAboutShipProperty = licenseTaxAboutShipProperty;
        this.licenseCertificateOfNavigability = licenseCertificateOfNavigability;
        this.licenseBoatRegistrationCertificate = licenseBoatRegistrationCertificate;
        this.licenseThumbs = licenseThumbs;
        this.licenseType = licenseType;
        this.licenseStatus = licenseStatus;
        this.licenseProvince = licenseProvince;
    }

}
