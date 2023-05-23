import axios from "axios";
import { useEffect, useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import {
  handleSortByNameAscending,
  handleSortByNameDescending,
  handleSortByPriceAscending,
  handleSortByPriceDescending,
} from "./sortingFunctions";
import { useHandleGoToHomePage } from "../../utils/buttonNavigate";
import { RootState, store } from "../../store/store";
import { AllProductsInterface } from "../../interface/ProductsInterface";
import { cartSlice } from "../../store/cartSlice";
import React from "react";
import { HeaderBar } from "../header/headerAppBar";

export const AllProducts = () => {
  const [filterName, setFilterName] = useState("");
  const [toggle, setToggle] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const selectProductState = (state: RootState) => state.product;
  const selectProduct = createSelector(
    selectProductState,
    (product) => product
  );
  const open = Boolean(anchorEl);

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

  const handleAddToCart = (data: AllProductsInterface) => {
    store.dispatch(cartSlice.actions.addProduct(data));
  };
  const handleNameFilter = () => {
    if (filterName !== "") {
      setToggle(!toggle);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // for the anchor of menu
  const handleAnchorClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
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
          <Box sx={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            <Button onClick={handleAnchorClick} variant="outlined">
              Sort
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem>
                <Typography
                  component={"span"}
                  onClick={() =>
                    handleSortByNameAscending(products, setProducts)
                  }
                >
                  Sort A-Z
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography
                  component={"span"}
                  onClick={() =>
                    handleSortByNameDescending(products, setProducts)
                  }
                >
                  Sort Z-A
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography
                  component={"span"}
                  onClick={() =>
                    handleSortByPriceAscending(products, setProducts)
                  }
                >
                  Sort by lowest price
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography
                  component={"span"}
                  onClick={() =>
                    handleSortByPriceDescending(products, setProducts)
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
          </Box>
        </Container>
        <Container sx={{ maxWidth: "md" }}>
          <Grid container spacing={2}>
            {products.map((data: any) => (
              <Grid item xs={4}>
                <Card sx={{ maxWidth: "sm" }}>
                  <CardMedia
                    component="img"
                    loading="lazy"
                    height="200"
                    image={data.images[0]}
                    alt={data.title}
                  />
                  <CardContent>
                    <Typography variant="h4" component="div">
                      {data.title}
                    </Typography>
                    <Typography variant="body2">{data.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleAddToCart(data)}>
                      Add to cart
                    </Button>
                    <Link to={`/product/${data.id}`}>
                      <Button size="small">More details</Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Container>
    </>
  );
};

// localeCompare(): string comparison that's sensitive to language-specific rules and settings, such as alphabetical order, diacritic marks, and case sensitivity.
