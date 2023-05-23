import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import { store, RootState } from "../../store/store";
import { ContainerStyle } from "../../theme/commonThemes";
import { ImageListComponent } from "./ImageListComponent";

import { useHandleGoToProfilePage } from "../../utils/buttonNavigate";
import { LoggedInUserSlice } from "../../store/userLoggedInSlice";
import { useAppDispatch } from "../../store/hooks";
import { waitCategoryThunk } from "../../store/thunksFunctions/categoriesThunk";
import { Category } from "../../interface/SingleProductInterface";
import { HeaderBar } from "../header/HeaderAppBar";

export const HomePage = () => {
  const [localCategory, setLocalCategory] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const loggedInValue = useSelector(
    (state: RootState) => state.loggedInUser.loggedIn
  );
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

  const handleLogOut = () => {
    store.dispatch(LoggedInUserSlice.actions.setInitialValue());
  };

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
