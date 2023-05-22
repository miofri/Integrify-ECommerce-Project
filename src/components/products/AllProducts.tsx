import { useEffect, useState } from "react";
import { RootState, store } from "../../store/store";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { AllProductsInterface } from "../../interface/ProductsInterface";
import { Box, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import {
  handleSortByName,
  handleSortByPriceAscending,
  handleSortByPriceDescending,
} from "./sortingFunctions";
import { useHandleGoToHomePage } from "../../utils/buttonNavigate";
import axios from "axios";

export const AllProducts = () => {
  const [filterName, setFilterName] = useState("");
  const [toggle, setToggle] = useState(true);

  const handleGoToHomePage = useHandleGoToHomePage();
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

  useEffect(() => {
    const getFiltered = async () => {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products/?title=${filterName}`
      );
      setProducts(response.data);
    };
    getFiltered();
  }, [toggle]);

  const handleNameFilter = () => {
    if (filterName !== "") {
      setToggle(!toggle);
    }
  };
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
        <Button onClick={handleGoToHomePage} variant="outlined">
          Back to homepage
        </Button>
      </Box>
      <Box>
        <TextField
          label="Find item"
          defaultValue=""
          onChange={(e) => setFilterName(e.target.value)}
        />
        <Button variant="outlined" onClick={() => handleNameFilter()}>
          Filter by name
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
