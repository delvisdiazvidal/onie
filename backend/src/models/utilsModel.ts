export enum licenseType {
    AquaculturePrivate = 1,
    AquacultureState = 2,
    PlatformPrivate = 3,
    PlatformState = 4
  }
  
export interface IMunicipalite {
    municipaliteCode: number;
    municipaliteName: string;
    municipaliteProvince: number;
    municipalitePopulation: number;
    municipaliteArea: number;
    municipaliteDescription: string;
}

export interface IProvince {
    provinceCode: number;
    provinceName: string;
    provinceAB: string;
    provinceDescription: string;
}

export interface IShip {
    shipCode: number;
    shipName: string;
    shipPort: string;
    shipFolio: string;
    shipLength: number;
    shipBreadth: number;
}

export interface IShipPlatform {
    requestCode?: number;
    shipCode?: number;
    shipName: string;
    shipRegistry: string;
    shipFolio: string;
    shipLength: number;
    shipBreadth: number;
    shipPort?: string;
    shipRegistryBrut?: string;
    shipEngine?: string;
}

export interface IShipInsert {
    requestCode: number;
    shipName: string;
    shipRegistry: string;
    shipFolio: string;
    shipLength: number;
    shipBreadth: number;
}

export interface ICompany{
    companyCode?: number;
    companyREEUP: string;
    companyName: string;
    companyDir: string;
    companyMunicipalite: number;
    companyProvince: number;
    companyEntity: string;
    companyFishingBrigade: string;
}

export interface IReservoir {
    reservoirCode: number;
    reservoirName: string;
    reservoirSurface: number;
}

export interface IReservoirInsert {
    requestCode: number;
    reservoirName: string;
    reservoirSurface: number;
}

export interface IFishery {
    fisheryCode: number;
    fisheryName: string;
    fisheryAmount: number;
    fisheryClasif: string;
}

export interface IFisheryCraft {
    fisherycraftCode: number;
    fisherycraftName: string;
    fisherycraftMaxCant: number;
    fisherycraftDescription: string;
}
