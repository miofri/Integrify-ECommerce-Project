import { createAsyncThunk } from "@reduxjs/toolkit";
import React from "react";
import { CreateNewProduct } from "../../../interface/CreateProductInterface";
import axios from "axios";

export const createProductThunk = createAsyncThunk(
  "product/createProduct",
  async (newProduct: CreateNewProduct) => {
    const url = "https://api.escuelajs.co/api/v1/products/";
    const response = await axios.post(url, newProduct);
    return response.data;
  }
);
