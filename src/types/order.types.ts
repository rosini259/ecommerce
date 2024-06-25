import { TProduct } from "./products.types";

export type TOrderItem = {
    id:number
    userId:number
    subtotal:number
    items:TProduct[]
};
