import { createAsyncThunk } from "@reduxjs/toolkit";
import React from "react";
import { Products, Category } from "../../../interface/ProductsInterface";
import { optionalId } from "../../../interface/UpdateProductInterface";
import axios from "axios";

export const updateProductThunk = createAsyncThunk(
  "product/updateProduct",
  async (productToUpdate: Products) => {
    const url = `https://api.escuelajs.co/api/v1/products/${productToUpdate.id}`;
    const productCopy = { ...(productToUpdate as optionalId) };
    delete productCopy.id;
    const response = await axios.put(url, productCopy);
    console.log(response.data);

    return response.data;
  }
);
