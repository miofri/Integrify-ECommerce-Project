import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { categorySlice } from "../categorySlice";
import { store } from "../store";

export const waitCategoryThunk = createAsyncThunk(
  "category/waitCategory",
  async () => {
    const response = await axios.get(
      `https://api.escuelajs.co/api/v1/categories`
    );
    store.dispatch(categorySlice.actions.setCategory(response.data));
  }
);
