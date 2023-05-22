import { Button, TextField } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { RootState, store } from "../../store/store";
import { LoggedInUserSlice } from "../../store/userLoggedInSlice";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const Login = () => {
  const [submittedEmail, setsubmittedEmail] = useState("");
  const [submittedPassword, setsubmittedPassword] = useState("");
  const selectUserState = (state: RootState) => state.users;
  const selectUser = createSelector(selectUserState, (user) => user);
  const usersFromStore = useSelector(selectUser);
  console.log("users:", usersFromStore);

  const handleSignIn = (e: React.FormEvent<HTMLButtonElement>) => {
    const checkUserExist = usersFromStore.users.find((user) => {
      return (
        user.email === submittedEmail && user.password === submittedPassword
      );
    });
    if (checkUserExist) {
      const submittedUser = {
        id: checkUserExist.id,
        email: submittedEmail,
        password: submittedPassword,
        name: checkUserExist.name,
        role: checkUserExist.role,
        avatar: checkUserExist.avatar,
        loggedIn: true,
      };
      store.dispatch(LoggedInUserSlice.actions.setLoggedUser(submittedUser));
      console.log("logged in");
    } else {
      window.alert("user does not exist");
    }
  };
  return (
    <form>
      <TextField
        required
        label="Email address"
        defaultValue=""
        onChange={(e) => setsubmittedEmail(e.target.value)}
      />
      <TextField
        required
        label="Password"
        defaultValue=""
        type="password"
        onChange={(e) => setsubmittedPassword(e.target.value)}
      />
      <Button onClick={(e) => handleSignIn(e)} variant="outlined">
        Submit
      </Button>
      <Button variant="outlined">Register</Button>
      <Button href="/" variant="outlined">
        Back to start
      </Button>
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
