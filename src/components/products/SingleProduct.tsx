import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Fade,
  ImageList,
  ImageListItem,
} from "@mui/material";

import { AllProductsInterface } from "../../interface/ProductsInterface";
import { defaultState } from "../../interface/SingleProductInterface";

import {
  useHandleGoBackOnePage,
  useHandleGoToHomePage,
} from "../../utils/buttonNavigate";
import { ContainerStyle } from "../../theme/commonThemes";

export const SingleProduct = () => {
  const { productId } = useParams<{ productId: string }>();
  const [singleProduct, setSingleProduct] =
    useState<AllProductsInterface>(defaultState);
  const url = `https://api.escuelajs.co/api/v1/products/${productId}`;
  const handleGoToHomePage = useHandleGoToHomePage();
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
    <ContainerStyle>
      <Box sx={{ color: "white" }}>
        <Button onClick={handleGoToHomePage} variant="outlined">
          Back to homepage
        </Button>
        <Button onClick={handleGoBackOnePage} variant="outlined">
          Back to previous page
        </Button>
        <div style={{ color: "white" }}>
          <h2>{singleProduct.title}</h2>
          <ImageList sx={{ width: "100%" }} cols={3} rowHeight={"auto"}>
            {singleProduct.images.map((img) => (
              <ImageListItem>
                <img src={img} alt={singleProduct.title} />
              </ImageListItem>
            ))}
          </ImageList>
          <p>{singleProduct.price}e</p>
          <p>{singleProduct.description} </p>
          <Chip variant="filled" label={singleProduct.category.name}></Chip>
        </div>
      </Box>
    </ContainerStyle>
  );
};
