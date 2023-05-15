import { useEffect, useState } from "react";
import axios from "axios";
import { categorySlice, store, RootState } from "../../store/store";
import { Box } from "@mui/material";
import { ContainerStyle } from "../../theme/CommonThemes";
import { useSelector } from "react-redux";
import { ImageListComponent } from "./ImageListComponent";

export const HomePage = () => {
  const [localCategory, setLocalCategory] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const categoryValue = useSelector((state: RootState) => state.category.value);

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get(
        `https://api.escuelajs.co/api/v1/categories`
      );
      store.dispatch(categorySlice.actions.setCategory(response.data));
    };
    getCategories();
  }, []);

  useEffect(() => {
    setLocalCategory(categoryValue);
    if (loading) {
      setLoading(false);
    }
  }, [categoryValue, loading]);

  if (loading === false) {
    return (
      <ContainerStyle>
        <Box>
          <ImageListComponent localCategory={localCategory} />
        </Box>
      </ContainerStyle>
    );
  } else {
    return (
      <ContainerStyle>
        <Box>
          <h2>Loading...</h2>
        </Box>
      </ContainerStyle>
    );
  }
};
