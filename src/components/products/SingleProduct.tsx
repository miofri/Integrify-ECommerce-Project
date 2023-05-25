import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { v4 as uuid } from "uuid";

import { AllProductsInterface } from "../../interface/ProductsInterface";
import { useHandleGoBackOnePage } from "../../utils/buttonNavigate";
import { ContainerStyleSmall } from "../../theme/commonThemes";
import { HeaderBar } from "../header/HeaderAppBar";
import { cartSlice } from "../../store/cartSlice";
import { store } from "../../store/store";
import { randomInt } from "crypto";

export const defaultState = {
  id: 0,
  title: "",
  price: 789,
  description: "",
  images: ["", "", ""],
  creationAt: new Date(),
  updatedAt: new Date(),
  category: {
    id: 0,
    name: "",
    image: "",
    creationAt: new Date(),
    updatedAt: new Date(),
  },
};

export const SingleProduct = () => {
  const { productId } = useParams<{ productId: string }>();
  const [singleProduct, setSingleProduct] =
    useState<AllProductsInterface>(defaultState);
  const url = `https://api.escuelajs.co/api/v1/products/${productId}`;
  const handleGoBackOnePage = useHandleGoBackOnePage();

  const handleAddToCart = (data: AllProductsInterface) => {
    store.dispatch(cartSlice.actions.addProduct(data));
  };

  useEffect(() => {
    const waitProduct = async () => {
      const response = await axios.get(url);
      const finalProduct = response.data;
      setSingleProduct(finalProduct);
    };
    waitProduct();
  }, []);

  return (
    <>
      <HeaderBar />
      <ContainerStyleSmall>
        <Box sx={{ color: "white" }}>
          <div style={{ color: "white" }}>
            <h2>{singleProduct.title}</h2>
            <ImageList sx={{ width: "100%" }} cols={3} rowHeight={"auto"}>
              {singleProduct.images.map((img) => {
                const key = `${uuid()}-${img}`;
                return (
                  <ImageListItem key={key}>
                    <img src={img} alt={singleProduct.title} />
                  </ImageListItem>
                );
              })}
            </ImageList>
            <Typography variant="subtitle2" component="div">
              {singleProduct.price}€
            </Typography>
            <p>{singleProduct.description} </p>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Chip variant="filled" label={singleProduct.category.name}></Chip>
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Button
                  onClick={() => handleAddToCart(singleProduct)}
                  variant="outlined"
                >
                  Add to cart
                </Button>
                <Button onClick={handleGoBackOnePage} variant="outlined">
                  Back
                </Button>
              </Box>
            </Box>
          </div>
        </Box>
      </ContainerStyleSmall>
    </>
  );
};
