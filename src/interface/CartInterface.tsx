import { Products } from "./ProductsInterface";

export interface CartInterface {
  product: Products;
  quantity: number;
}

export interface CartState {
  cartItems: CartInterface[];
}
