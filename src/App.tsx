import { GoogleLogin } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import { mainTheme } from "./theme/commonThemes";
import { HomePage } from "./components/homepage/HomePage";
import { CategoryPages } from "./components/categories-pages/categoryPages";

const App = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />}></Route>
            <Route
              path="/categories/:categoryId"
              element={<CategoryPages />}
            ></Route>
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
