import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AllProductsInterface } from "../../interface/productsInterface";
import { defaultState } from "../../interface/singleProductInterface";
import { Button, Fade } from "@mui/material";
import { useHandleGoToHomePage } from "../../utils/buttonNavigate";

export const SingleProduct = () => {
  const { productId } = useParams<{ productId: string }>();
  const [singleProduct, setSingleProduct] =
    useState<AllProductsInterface>(defaultState);
  const url = `https://api.escuelajs.co/api/v1/products/${productId}`;
  const handleGoToHomePage = useHandleGoToHomePage();

  useEffect(() => {
    const waitProduct = async () => {
      const response = await axios.get(url);
      const finalProduct = response.data;
      setSingleProduct(finalProduct);
    };
    waitProduct();
  }, []);

  console.log(singleProduct);

  return (
    <>
      <Button onClick={handleGoToHomePage} variant="outlined">
        Back to homepage
      </Button>
      <div style={{ color: "white" }}>
        {singleProduct.title} {singleProduct.price}e <br />
        {singleProduct.description} <br /> {singleProduct.category.name}
      </div>
    </>
  );
};
