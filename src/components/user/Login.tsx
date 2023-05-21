import { Button, TextField } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { store } from "../../store/store";
import { LoggedInUserSlice } from "../../store/userLoggedInSlice";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e: React.FormEvent<HTMLButtonElement>) => {
    const submittedUser = {
      email: email,
      password: password,
    };
    store.dispatch(LoggedInUserSlice.actions.setLoggedUser(submittedUser));
  };
  return (
    <form>
      <TextField
        required
        label="Email address"
        defaultValue=""
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        required
        label="Password"
        defaultValue=""
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={(e) => handleSignIn(e)} variant="outlined">
        Submit
      </Button>
      <Button variant="outlined">Register</Button>
    </form>
  );
};

{
  /* <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      /> */
}
