import { GoogleLogin } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import { mainTheme } from "./theme/commonThemes";
import { HomePage } from "./components/homepage/HomePage";
import { CategoryPages } from "./components/categoriesPages/categoryPages";
import { AllProducts } from "./components/products/AllProducts";

const App = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="/categories/:categoryId" element={<CategoryPages />} />
            <Route path="/all-products" element={<AllProducts />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;

/* <button type="submit">
        login
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </button> */
