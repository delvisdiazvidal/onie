export interface ICompany{
    companyCode: number;
    companyREEUP: string;
    companyName: string;
    companyDir: string;
    companyMunicipalite: string;
    companyProvince: string;
    companyEntity: string;
    companyFishingBrigade: string;
  }

export class Company {
    public companyCode: number;
    public companyREEUP: string;
    public companyName: string;
    public companyDir: string;
    public companyMunicipalite: string;
    public companyProvince: string;
    public companyEntity: string;
    public companyFishingBrigade: string;

    constructor(companyCode: number,
                companyREEUP: string,
                companyName: string,
                companyDir: string,
                companyMunicipalite: string,
                companyProvince: string,
                companyEntity: string,
                companyFishingBrigade: string) {
        this.companyCode = companyCode;
        this.companyREEUP = companyREEUP;
        this.companyName = companyName;
        this.companyDir = companyDir;
        this.companyMunicipalite = companyMunicipalite;
        this.companyProvince = companyProvince;
        this.companyEntity = companyEntity;
        this.companyFishingBrigade = companyFishingBrigade;
    }
}
