import { AllProductsInterface } from "./productsInterface";

export interface CartInterface {
  product: AllProductsInterface;
  quantity: number;
}

export interface CartState {
  cartItems: CartInterface[];
}
