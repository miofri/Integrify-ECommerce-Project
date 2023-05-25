import { createAsyncThunk } from "@reduxjs/toolkit";
import React from "react";
import { updateImg } from "../../../interface/UpdateProductInterface";
import axios from "axios";

export const uploadNewProductImageThunk = createAsyncThunk(
  "product/uploadNewProductImage",
  async (dispatchData: { img: string[]; id: number }) => {
    const url = `https://api.escuelajs.co/api/v1/products/${dispatchData.id}`;
    const response = await axios.put(url, { images: dispatchData.img });
    console.log(response.data);

    return response.data;
  }
);
