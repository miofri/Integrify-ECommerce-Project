import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import LoginIcon from "@mui/icons-material/Login";
import { Box, Button } from "@mui/material";

import { store, RootState } from "../../store/store";
import { ContainerStyle } from "../../theme/commonThemes";
import { ImageListComponent } from "./ImageListComponent";
import { categorySlice } from "../../store/categorySlice";
import { Users } from "../../interface/userInfoInterface";

export const HomePage = () => {
  const [localCategory, setLocalCategory] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const loggedInValue = useSelector(
    (state: RootState) => state.loggedInUser.loggedIn
  );
  const categoryValue = useSelector((state: RootState) => state.category.value);

  console.log(loggedInValue);

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
    console.log(categoryValue);

    return (
      <ContainerStyle>
        <Box>
          {loggedInValue ? (
            <></>
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
