import { Button, Menu, MenuItem, TextField, Typography } from "@mui/material";
import {
  handleSortByNameAscending,
  handleSortByNameDescending,
  handleSortByPriceAscending,
  handleSortByPriceDescending,
} from "./sortingFunctions";
import { AllProductsInterface } from "../../interface/ProductsInterface";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface SortByNameOrPriceProps {
  products: AllProductsInterface[];
  setProducts: React.Dispatch<React.SetStateAction<AllProductsInterface[]>>;
  setSortedProducts: React.Dispatch<
    React.SetStateAction<AllProductsInterface[]>
  >;
}

export const SortByNameOrPrice = ({
  products,
  setProducts,
  setSortedProducts,
}: SortByNameOrPriceProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [filterName, setFilterName] = useState("");
  const [toggle, setToggle] = useState(true);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const getFiltered = async () => {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/products/?title=${filterName}`
      );
      setSortedProducts(response.data);
    };
    getFiltered();
  }, [toggle]);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAnchorClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNameFilter = () => {
    if (filterName !== "") {
      setToggle(!toggle);
    }
  };
  return (
    <>
      <Button onClick={handleAnchorClick} variant="outlined">
        Sort
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem>
          <Typography
            component={"span"}
            onClick={() =>
              handleSortByNameAscending(products, setSortedProducts)
            }
          >
            Sort A-Z
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography
            component={"span"}
            onClick={() =>
              handleSortByNameDescending(products, setSortedProducts)
            }
          >
            Sort Z-A
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography
            component={"span"}
            onClick={() =>
              handleSortByPriceAscending(products, setSortedProducts)
            }
          >
            Sort by lowest price
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography
            component={"span"}
            onClick={() =>
              handleSortByPriceDescending(products, setSortedProducts)
            }
          >
            Sort by highest price
          </Typography>
        </MenuItem>
      </Menu>
      <TextField
        label="Find item"
        defaultValue=""
        onChange={(e) => setFilterName(e.target.value)}
      />
      <Button variant="outlined" onClick={() => handleNameFilter()}>
        Go
      </Button>
    </>
  );
};

export const SortByPriceRange = ({
  products,
  setProducts,
  setSortedProducts,
}: SortByNameOrPriceProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  // for the anchor of menu
  const handleAnchorClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);

  const noFilter = () => {
    setSortedProducts(products);
    console.log(products);
  };
  const below99 = () => {
    const newProducts = products.filter((product) => product.price < 100);
    setSortedProducts(newProducts);
    console.log(products);
  };
  const above99 = () => {
    const newProducts = products.filter(
      (product) => product.price > 99 && product.price < 500
    );
    setSortedProducts(newProducts);
    console.log(products);
  };
  const above499 = () => {
    const newProducts = products.filter(
      (product) => product.price > 499 && product.price < 999
    );
    setSortedProducts(newProducts);
  };
  const above999 = () => {
    const newProducts = products.filter((product) => product.price > 999);
    setSortedProducts(newProducts);
  };

  return (
    <>
      <Button onClick={handleAnchorClick} variant="outlined">
        Price range
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => noFilter()}>No filter</MenuItem>
        <MenuItem onClick={() => below99()}>0e-99e</MenuItem>
        <MenuItem onClick={() => above99()}>100e-499e</MenuItem>
        <MenuItem onClick={() => above499()}>500e-999e</MenuItem>
        <MenuItem onClick={() => above999()}>{">"} 999e </MenuItem>
      </Menu>
      <Button onClick={() => noFilter()} variant="outlined">
        Clear filter
      </Button>
    </>
  );
};
