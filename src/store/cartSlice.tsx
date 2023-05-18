import { createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../interface/productsInterface";

let cartsInitialValue: ProductState = { products: [] };

export const cartSlice = createSlice({
  name: "cart",
  initialState: cartsInitialValue,
  reducers: {
    addProduct: (state, action) => {
      state.products = [...state.products, action.payload];
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addProduct, deleteProduct } = cartSlice.actions;
