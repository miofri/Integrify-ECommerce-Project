import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { Category, CategoryArray } from "../interface/SingleProductInterface";

let categoryInitialValue: CategoryArray = { categories: [] };

export const categorySlice = createSlice({
  name: "category",
  initialState: categoryInitialValue,
  reducers: {
    setCategory: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;
