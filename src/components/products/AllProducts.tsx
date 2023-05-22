import { useEffect, useState } from "react";
import { RootState, store } from "../../store/store";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { AllProductsInterface } from "../../interface/productsInterface";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import {
  handleSortByName,
  handleSortByPriceAscending,
  handleSortByPriceDescending,
} from "./sortingFunctions";

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
    setProducts(productFromStore);
  }, [productFromStore]);

  return (
    <>
      <Box>
        <Button
          onClick={() => handleSortByName(products, setProducts)}
          variant="contained"
        >
          Sort by Name
        </Button>
        <Button
          onClick={() => handleSortByPriceAscending(products, setProducts)}
          variant="contained"
        >
          Sort by lowest price
        </Button>
        <Button
          onClick={() => handleSortByPriceDescending(products, setProducts)}
          variant="contained"
        >
          Sort by highest price
        </Button>
        <Button href="/" variant="outlined">
          Back to homepage
        </Button>
      </Box>
      <div>
        {products.map((data) => (
          <Link to={`/product/${data.id}`}>
            <li style={{ color: "white" }}>
              {data.title} {data.price}
            </li>
          </Link>
        ))}
      </div>
    </>
  );
};

// localeCompare(): string comparison that's sensitive to language-specific rules and settings, such as alphabetical order, diacritic marks, and case sensitivity.
