import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsThunk = createAsyncThunk(
  "product/waitProduct",
  async () => {
    const response = await axios.get(
      "https://api.escuelajs.co/api/v1/products"
    );
    return response.data;
  }
);
