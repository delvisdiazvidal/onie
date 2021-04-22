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

export interface IOurEntity{
    ourEntityCode: number;
    ourEntityName: string;
    ourEntityDir: string;
    ourEntityMunicipalite: number;
    ourEntityProvince: number;
    ourEntityEmail: string;
    ourEntityPhone: string[];
}
