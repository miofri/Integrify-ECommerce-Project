import { createSlice } from "@reduxjs/toolkit";
import { CategoryState } from "../interface/storeState";

let categoryInitialValue: CategoryState = { value: [] };

export const categorySlice = createSlice({
  name: "category",
  initialState: categoryInitialValue,
  reducers: {
    setCategory: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;
