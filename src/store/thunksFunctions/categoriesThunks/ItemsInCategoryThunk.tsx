import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "inspector";
import React from "react";
import { AllProductsInterface } from "../../../interface/ProductsInterface";

export const ItemsInCategoryThunk = createAsyncThunk(
  "category/waitItemsInCategory",
  async ({
    setCurrentItems,
    url,
  }: {
    setCurrentItems: React.Dispatch<
      React.SetStateAction<AllProductsInterface[]>
    >;
    currentItems: AllProductsInterface[];
    url: string;
  }) => {
    const response = await axios.get(url);
    const finalData = response.data;
    setCurrentItems(finalData);
  }
);
