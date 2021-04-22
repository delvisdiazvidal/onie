
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

export class Province {
    public provinceCode: number;
    public provinceName: string;
    public provinceAB: string;
    public provinceDescription: string;

    constructor(provinceCode: number,
                provinceName: string,
                provinceAB: string,
                provinceDescription: string) {
        this.provinceCode = provinceCode;
        this.provinceName = provinceName;
        this.provinceAB = provinceAB;
        this.provinceDescription = provinceDescription;
    }
  }



