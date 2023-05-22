import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import LoginIcon from "@mui/icons-material/Login";
import { Box, Button } from "@mui/material";

import { store, RootState } from "../../store/store";
import { ContainerStyle } from "../../theme/commonThemes";
import { ImageListComponent } from "./ImageListComponent";
import { categorySlice } from "../../store/categorySlice";
import { Users } from "../../interface/UserInfoInterface";
import { LoggedInUser } from "../user/LoggedInUser";
import { useHandleGoToProfilePage } from "../../utils/buttonNavigate";
import { LoggedInUserSlice } from "../../store/userLoggedInSlice";
import { useAppDispatch } from "../../store/hooks";
import { waitCategoryThunk } from "../../store/thunksFunctions/categoriesThunk";
import {
  Category,
  CategoryArray,
} from "../../interface/SingleProductInterface";

export const HomePage = () => {
  const [localCategory, setLocalCategory] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const loggedInValue = useSelector(
    (state: RootState) => state.loggedInUser.loggedIn
  );
  const categoryValue = useSelector(
    (state: RootState) => state.category.categories
  );
  const handleGoToProfilePage = useHandleGoToProfilePage();
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
      <ContainerStyle>
        <Box>
          {loggedInValue ? (
            <>
              <LoggedInUser />
              <Button onClick={handleGoToProfilePage} variant="outlined">
                Go to profile
              </Button>
              <Button
                href="/"
                onClick={() => handleLogOut()}
                variant="outlined"
              >
                Log out
              </Button>
            </>
          ) : (
            <Button href="/login" variant="outlined" type="submit">
              Sign in <LoginIcon />
            </Button>
          )}

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
