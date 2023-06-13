import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Products, ProductState } from "../interface/ProductsInterface";
import { fetchProductsThunk } from "./thunksFunctions/productsThunks/fetchProductsThunk";

let productsInitialValue: ProductState = {
  products: [],
  status: "",
  error: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState: productsInitialValue,
  reducers: {
    setProduct: (state, action: PayloadAction<Products[]>) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductsThunk.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProductsThunk.fulfilled, (state, action) => {
      state.status = "succeeded";

      state.products = action.payload;
    });
    builder.addCase(fetchProductsThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { setProduct } = productSlice.actions;
