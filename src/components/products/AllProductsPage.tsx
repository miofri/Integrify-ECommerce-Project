import { useEffect, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { Box, Container, Typography } from "@mui/material";

import { RootState } from "../../store/store";
import { AllProductsInterface } from "../../interface/ProductsInterface";
import { HeaderBar } from "../header/HeaderAppBar";
import { SortByNameOrPrice, SortByPriceRange } from "./SortingComponents";
import { ProductListGrid } from "./ProductListGrid";

export const AllProductsPage = () => {
  const selectProductState = (state: RootState) => state.product;
  const selectProduct = createSelector(
    selectProductState,
    (product) => product
  );
  const productFromStore = useSelector(selectProduct).products;
  const [products, setProducts] =
    useState<AllProductsInterface[]>(productFromStore);
  const [sortedProducts, setSortedProducts] =
    useState<AllProductsInterface[]>(productFromStore);

  useEffect(() => {
    setProducts(productFromStore);
    setSortedProducts(productFromStore);
  }, [productFromStore]);

  return (
    <>
      <HeaderBar />
      <Container
        sx={{
          maxWidth: "md",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Container>
          <Typography component="div" variant="h2" sx={{ color: "white" }}>
            All products
          </Typography>
        </Container>
        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <SortByNameOrPrice
              products={products}
              setProducts={setProducts}
              setSortedProducts={setSortedProducts}
            />
            <SortByPriceRange
              products={products}
              setProducts={setSortedProducts}
              setSortedProducts={setSortedProducts}
            />
          </Box>
        </Container>
        <Container sx={{ maxWidth: "md" }}>
          <ProductListGrid products={sortedProducts} />
        </Container>
      </Container>
    </>
  );
};

// localeCompare(): string comparison that's sensitive to language-specific rules and settings, such as alphabetical order, diacritic marks, and case sensitivity.
