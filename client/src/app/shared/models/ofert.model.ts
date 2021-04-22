import { Ingredient } from 'src/app/shared/models/ingredient.model';

export interface IOfert{
    ofertId: number;
    ofertName: string;
    ofertDescription: string;
    ofertPrice: number;
    ofertImagePath: string;
    ofertIngredient: Ingredient[];
}

export class Ofert {

    public ofertId: number;
    public ofertName: string;
    public ofertDescription: string;
    public ofertPrice: number;
    public ofertImagePath: string;
    public ofertIngredient: Ingredient[];

    constructor(ofert: IOfert) {
      this.ofertId = ofert.ofertId;
      this.ofertName = ofert.ofertName;
      this.ofertDescription = ofert.ofertDescription;
      this.ofertPrice = ofert.ofertPrice;
      this.ofertImagePath = ofert.ofertImagePath;
      this.ofertIngredient = ofert.ofertIngredient;
    }
}
