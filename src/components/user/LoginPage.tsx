import { Box, Button, TextField, Typography } from "@mui/material";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Link from "@mui/material/Link";

import { RootState, store } from "../../store/store";
import { LoggedInUserSlice } from "../../store/userLoggedInSlice";
import { HeaderBar } from "../header/HeaderAppBar";
import { ContainerStyleSmall } from "../../theme/commonThemes";

export const LoginPage = () => {
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submittedPassword, setSubmittedPassword] = useState("");

  const selectUserState = (state: RootState) => state.users;
  const selectUser = createSelector(selectUserState, (users) => users);
  const usersFromStore = useSelector(selectUser);
  const navigate = useNavigate();

  const handleSignInWithDelay = async () => {
    // Wait for 2 seconds before calling handleSignIn
    await new Promise((resolve) => setTimeout(resolve, 2000));
    handleSignIn();
  };

  const handleSignIn = () => {
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
      navigate("/profile");
    } else {
      window.alert("Incorrect email or password");
    }
  };

  return (
    <>
      <HeaderBar />
      <ContainerStyleSmall>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography component="div" variant="h2">
            Sign in
          </Typography>
          <TextField
            required
            label="Email address"
            defaultValue=""
            onChange={(e) => setSubmittedEmail(e.target.value)}
          />
          <TextField
            required
            label="Password"
            defaultValue=""
            type="password"
            onChange={(e) => setSubmittedPassword(e.target.value)}
          />
          <Button onClick={(e) => handleSignInWithDelay()} variant="outlined">
            Submit
          </Button>
          <Typography variant="subtitle1">
            New user? Register <Link href="/register">here</Link>{" "}
          </Typography>
        </Box>
      </ContainerStyleSmall>
    </>
  );
};
