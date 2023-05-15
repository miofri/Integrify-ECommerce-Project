import { GoogleLogin } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material";

import { mainTheme } from "./theme/CommonThemes";
import { HomePage } from "./components/HomePage/HomePage";

const App = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />}></Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;

{
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
}
