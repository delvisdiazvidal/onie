import { OrderIngredient } from './order-ingredient.model';

export enum OrderStatus {
    'En Proceso',
    'Trasportando',
    'Entregada',
    'Devuelta'
}

export class Order {

    public orderName: string;
    public orderAmount: number;
    public orderIngredients: OrderIngredient[];
    public orderStatus: OrderStatus;
    public orderShipping = true;

    constructor(
        orderName: string,
        orderAmount: number,
        orderIngredients: OrderIngredient[],
        orderStatus: OrderStatus) {
      this.orderName = orderName;
      this.orderAmount = orderAmount;
      this.orderIngredients = orderIngredients;
      this.orderStatus = orderStatus;
    }
}
