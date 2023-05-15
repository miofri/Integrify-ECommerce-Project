import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./store/store";

const container = document.getElementById("root")!;
const root = createRoot(container);
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID!;
console.log(CLIENT_ID);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
