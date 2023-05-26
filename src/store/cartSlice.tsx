import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { CartInterface, CartState } from "../interface/CartInterface";
import { AllProductsInterface } from "../interface/ProductsInterface";

let cartsInitialValue: CartState = { cartItems: [] };

export const cartSlice = createSlice({
  name: "cart",
  initialState: cartsInitialValue,
  reducers: {
    addProduct: (state, action: PayloadAction<AllProductsInterface>) => {
      const existingItem = state.cartItems.find(
        (data) => data.product.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        const newItem: CartInterface = {
          product: action.payload,
          quantity: 1,
        };
        state.cartItems = state.cartItems.concat(newItem);
      }
    },
    deleteProduct: (state, action: PayloadAction<AllProductsInterface>) => {
      state.cartItems = state.cartItems.filter(
        (data) => data.product.id !== action.payload.id
      );
    },
    reduceQuantity: (state, action: PayloadAction<AllProductsInterface>) => {
      const existingItem = state.cartItems.find(
        (data) => data.product.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity -= 1;
      }
    },
  },
});

export const { addProduct, deleteProduct, reduceQuantity } = cartSlice.actions;
