import { Ofert } from './ofert.model';

export class OrderIngredient {

    public orderOferts: Ofert;
    public ofertCant: number;

    constructor(
        orderOferts: Ofert,
        ofertCant: number) {
      this.orderOferts = orderOferts;
      this.ofertCant = ofertCant;
    }
}
