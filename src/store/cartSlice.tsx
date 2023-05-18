import { createSlice } from "@reduxjs/toolkit";
import { CartInterface, CartState } from "../interface/cartInterface";

let cartsInitialValue: CartState = { cartItems: [] };

export const cartSlice = createSlice({
  name: "cart",
  initialState: cartsInitialValue,
  reducers: {
    addProduct: (state, action) => {
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
        console.log("NEWITEM", newItem);
        state.cartItems = state.cartItems.concat(newItem);
      }
    },
    deleteProduct: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (data) => data.product.id !== action.payload.id
      );
    },
  },
});

export const { addProduct, deleteProduct } = cartSlice.actions;
