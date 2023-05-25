import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import { RootState } from "../../store/store";
import { ContainerStyle } from "../../theme/commonThemes";
import { ImageListComponent } from "./ImageListComponent";
import { useAppDispatch } from "../../store/hooks";
import { waitCategoryThunk } from "../../store/thunksFunctions/categoriesThunks/categoriesThunk";
import { Category } from "../../interface/SingleProductInterface";
import { HeaderBar } from "../header/HeaderAppBar";

export const HomePage = () => {
  const [localCategory, setLocalCategory] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryValue = useSelector(
    (state: RootState) => state.category.categories
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(waitCategoryThunk());
  }, []);

  useEffect(() => {
    setLocalCategory(categoryValue);
    if (loading) {
      setLoading(false);
    }
  }, [categoryValue, loading]);

  if (loading === false) {
    return (
      <>
        <HeaderBar />
        <ContainerStyle>
          <Box>
            <ImageListComponent localCategory={localCategory} />
          </Box>
        </ContainerStyle>
      </>
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
