import axios from "axios";
import { useEffect, useState } from "react";
import { RootState, store } from "../../store/store";
import { productSlice } from "../../store/productSlice";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { AllProductsInterface } from "../../interface/productsInterface";
import { Box, Button } from "@mui/material";

export const AllProducts = () => {
  const selectProductState = (state: RootState) => state.product;
  const selectProduct = createSelector(
    selectProductState,
    (product) => product
  );
  const productFromStore = useSelector(selectProduct).products;
  const [products, setProducts] =
    useState<AllProductsInterface[]>(productFromStore);

  useEffect(() => {
    const waitProducts = async () => {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/products"
      );
      store.dispatch(productSlice.actions.setProduct(response.data));
    };
    waitProducts();
  }, []);

  useEffect(() => {
    setProducts(productFromStore);
  }, [productFromStore]);

  const handleSort = () => {
    const sorted = [...products].sort((a, b) => a.title.localeCompare(b.title));
    setProducts(sorted);
  };

  return (
    <>
      <Box>
        <Button onClick={() => handleSort()} variant="contained">
          Sort by name
        </Button>
      </Box>
      <div>
        {products.map((data) => (
          <li style={{ color: "white" }}>{data.title}</li>
        ))}
      </div>
    </>
  );
};

// localeCompare(): string comparison that's sensitive to language-specific rules and settings, such as alphabetical order, diacritic marks, and case sensitivity.
