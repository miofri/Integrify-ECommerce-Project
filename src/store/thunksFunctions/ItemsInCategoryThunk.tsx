import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url } from "inspector";
import React from "react";
import { AllProductsInterface } from "../../interface/ProductsInterface";

export const ItemsInCategoryThunk = (
  setCurrentItems: React.Dispatch<React.SetStateAction<AllProductsInterface[]>>,
  currentItems: AllProductsInterface[],
  url: string
) =>
  createAsyncThunk("category/waitItemsInCategory", async () => {
    const response = await axios.get(url);
    const finalData = response.data;
    setCurrentItems(finalData);
    console.log(currentItems);
  });
