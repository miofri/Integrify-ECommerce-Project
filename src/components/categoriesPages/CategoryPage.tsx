import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid } from "@mui/material";

import { AllProductsInterface } from "../../interface/ProductsInterface";
import { HeaderBar } from "../header/HeaderAppBar";
import { CategoryGrid } from "./CategoryGrid";

export const CategoryPage = () => {
  const [currentItems, setCurrentItems] = useState<AllProductsInterface[]>([]);
  const { categoryId } = useParams<{ categoryId: string }>();
  const url = `https://api.escuelajs.co/api/v1/products/?categoryId=${categoryId}`;

  useEffect(() => {
    const getCurrentItems = async () => {
      const response = await axios.get(url);
      const finalData = response.data;
      setCurrentItems(finalData);
      console.log(currentItems);
    };
    getCurrentItems();
  }, [categoryId]);

  return (
    <>
      <HeaderBar />
      <Container sx={{ maxWidth: "md" }}>
        <Grid container spacing={2}>
          <CategoryGrid currentItems={currentItems} />
        </Grid>
      </Container>
    </>
  );
};
