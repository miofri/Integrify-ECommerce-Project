import { useEffect, useState } from "react";
import { RootState, store } from "../../store/store";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { AllProductsInterface } from "../../interface/productsInterface";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

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

  const handleSortByName = () => {
    const sorted = [...products].sort((a, b) => a.title.localeCompare(b.title));
    setProducts(sorted);
  };

  const handleSortByPriceAscending = () => {
    const sorted = [...products].sort((a, b) => a.price - b.price);
    setProducts(sorted);
  };

  const handleSortByPriceDescending = () => {
    const sorted = [...products].sort((a, b) => b.price - a.price);
    setProducts(sorted);
  };

  return (
    <>
      <Box>
        <Button onClick={() => handleSortByName()} variant="contained">
          Sort by Name
        </Button>
        <Button
          onClick={() => handleSortByPriceAscending()}
          variant="contained"
        >
          Sort by lowest price
        </Button>
        <Button
          onClick={() => handleSortByPriceDescending()}
          variant="contained"
        >
          Sort by highest price
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
