import { AllProductsInterface } from "./ProductsInterface";

export interface CartInterface {
  product: AllProductsInterface;
  quantity: number;
}

export interface CartState {
  cartItems: CartInterface[];
}
