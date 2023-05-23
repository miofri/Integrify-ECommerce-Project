import { createSlice } from "@reduxjs/toolkit";

import { CategoryArray } from "../interface/SingleProductInterface";

let categoryInitialValue: CategoryArray = { categories: [] };

export const categorySlice = createSlice({
  name: "category",
  initialState: categoryInitialValue,
  reducers: {
    setCategory: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;
