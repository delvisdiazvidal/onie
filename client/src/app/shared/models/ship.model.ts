export interface IShipAquaculture {
    shipCode: number;
    shipName: string;
    shipRegistry: string;
    shipFolio: string;
    shipLength: number;
    shipBreadth: number;
}

export interface IShipPlatform {
    shipCode: number;
    shipName: string;
    shipRegistry: string;
    shipFolio: string;
    shipLength: number;
    shipBreadth: number;
    shipPort: string;
    shipRegistryBrut: string;
    shipEngine: string;
}

export interface IShip {
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

export class Ship implements IShip {
    public shipCode?: number;
    public shipName: string;
    public shipRegistry: string;
    public shipFolio: string;
    public shipLength: number;
    public shipBreadth: number;
    public shipPort?: string;
    public shipRegistryBrut?: string;
    public shipEngine?: string;
    constructor(ship: any) {
                this.shipCode = ship.shipCode;
                this.shipName = ship.shipName;
                this.shipRegistry = ship.shipRegistry;
                this.shipFolio = ship.shipFolio;
                this.shipLength = ship.shipLength;
                this.shipBreadth = ship.shipBreadth;
                this.shipPort = ship.shipPort;
                this.shipRegistryBrut = ship.shipRegistryBrut;
                this.shipEngine = ship.shipEngine;
    }

}
