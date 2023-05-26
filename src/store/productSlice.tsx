import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import {
  AllProductsInterface,
  ProductState,
} from "../interface/ProductsInterface";
import { waitProductsThunk } from "./thunksFunctions/productsThunks/waitProductsThunk";

let productsInitialValue: ProductState = {
  products: [],
  status: "",
  error: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState: productsInitialValue,
  reducers: {
    setProduct: (state, action: PayloadAction<AllProductsInterface[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(waitProductsThunk.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(waitProductsThunk.fulfilled, (state, action) => {
      state.status = "succeeded";

      state.products = action.payload;
    });
    builder.addCase(waitProductsThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { setProduct } = productSlice.actions;
