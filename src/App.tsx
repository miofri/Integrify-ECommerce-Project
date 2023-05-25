import { GoogleLogin } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";

import { mainTheme } from "./theme/commonThemes";
import { HomePage } from "./components/homepage/HomePage";
import { CategoryPage } from "./components/categoriesPages/CategoryPage";
import { AllProductsPage } from "./components/products/AllProductsPage";
import { SingleProduct } from "./components/products/SingleProduct";
import { store } from "./store/store";
import { LoginPage } from "./components/user/LoginPage";
import { usersSlice } from "./store/usersSlice";
import { waitProductsThunk } from "./store/thunksFunctions/productsThunks/waitProductsThunk";
import { useAppDispatch } from "./store/hooks";
import { Profile } from "./components/user/ProfilePage";
import { waitUsersThunk } from "./store/thunksFunctions/userThunks/waitUsersThunk";

const App = () => {
  const dispatch = useAppDispatch();

  /* using setInterval because sometimes products are up to date */
  useEffect(() => {
    dispatch(waitProductsThunk());
    dispatch(waitUsersThunk());

    const interval = setInterval(() => {
      dispatch(waitProductsThunk());
      dispatch(waitUsersThunk());
      console.log("dispatched!2");
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ThemeProvider theme={mainTheme}>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="/all-products" element={<AllProductsPage />} />
            <Route path="/categories/:categoryId" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<SingleProduct />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;

<button type="submit">
  login
  <GoogleLogin
    onSuccess={(credentialResponse) => {
      console.log(credentialResponse);
    }}
    onError={() => {
      console.log("Login Failed");
    }}
  />
</button>;
