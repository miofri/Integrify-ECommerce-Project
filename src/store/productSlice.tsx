import { createSlice } from "@reduxjs/toolkit";
import { ProductState } from "../interface/productsInterface";

let productsInitialValue: ProductState = { products: [] };

export const productSlice = createSlice({
  name: "product",
  initialState: productsInitialValue,
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProduct } = productSlice.actions;
