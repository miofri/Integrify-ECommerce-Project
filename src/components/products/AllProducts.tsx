import axios from "axios";
import { useEffect, useState } from "react";
import { RootState, store } from "../../store/store";
import { productSlice } from "../../store/productSlice";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { AllProductsInterface } from "../../interface/productsInterface";

export const AllProducts = () => {
  const selectProductState = (state: RootState) => state.product;
  const selectProduct = createSelector(
    selectProductState,
    (product) => product
  );

  useEffect(() => {
    const waitProducts = async () => {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/products"
      );
      store.dispatch(productSlice.actions.setProduct(response.data));
    };
    waitProducts();
  }, []);

  const productFromStore = useSelector(selectProduct).products;

  return (
    <div>
      {productFromStore.map((data) => (
        <li style={{ color: "white" }}>{data.title}</li>
      ))}
    </div>
  );
};
