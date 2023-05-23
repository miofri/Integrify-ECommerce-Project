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

import { AllProductsInterface } from "../../interface/ProductsInterface";
import { defaultState } from "../../interface/SingleProductInterface";

import { useHandleGoBackOnePage } from "../../utils/buttonNavigate";
import { ContainerStyleSmall } from "../../theme/commonThemes";
import { HeaderBar } from "../header/HeaderAppBar";

export const SingleProduct = () => {
  const { productId } = useParams<{ productId: string }>();
  const [singleProduct, setSingleProduct] =
    useState<AllProductsInterface>(defaultState);
  const url = `https://api.escuelajs.co/api/v1/products/${productId}`;
  const handleGoBackOnePage = useHandleGoBackOnePage();

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
              {singleProduct.images.map((img) => (
                <ImageListItem>
                  <img src={img} alt={singleProduct.title} />
                </ImageListItem>
              ))}
            </ImageList>
            <Typography variant="subtitle2" component="div">
              {singleProduct.price}€
            </Typography>
            <p>{singleProduct.description} </p>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Chip variant="filled" label={singleProduct.category.name}></Chip>
              <Button onClick={handleGoBackOnePage} variant="outlined">
                Back
              </Button>
            </Box>
          </div>
        </Box>
      </ContainerStyleSmall>
    </>
  );
};
