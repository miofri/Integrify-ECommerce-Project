import { GoogleLogin } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Button, ThemeProvider } from "@mui/material";

import { mainTheme } from "./theme/commonThemes";
import { HomePage } from "./components/homepage/HomePage";
import { CategoryPages } from "./components/categoriesPages/categoryPages";
import { AllProducts } from "./components/products/AllProducts";
import { SingleProduct } from "./components/products/SingleProduct";
import axios from "axios";
import { useEffect } from "react";
import { productSlice } from "./store/productSlice";
import { store } from "./store/store";
import { Login } from "./components/user/Login";
import { userCartSlice } from "./store/userCartSlice";

const App = () => {
  useEffect(() => {
    const waitProducts = async () => {
      const response = await axios.get(
        "https://api.escuelajs.co/api/v1/products"
      );
      store.dispatch(productSlice.actions.setProduct(response.data));
    };

    const waitUsers = async () => {
      const response = await axios.get("https://api.escuelajs.co/api/v1/users");
      store.dispatch(userCartSlice.actions.setUser(response.data));
    };
    waitProducts();
    waitUsers();
  }, []);

  return (
    <ThemeProvider theme={mainTheme}>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/categories/:categoryId" element={<CategoryPages />} />
            <Route path="/product/:productId" element={<SingleProduct />} />
            <Route path="/login" element={<Login />} />
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
