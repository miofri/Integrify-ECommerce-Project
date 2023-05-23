import { Box, Button, TextField, Typography } from "@mui/material";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { RootState, store } from "../../store/store";
import { LoggedInUserSlice } from "../../store/userLoggedInSlice";
import { useAppDispatch } from "../../store/hooks";
import { postUsersThunk } from "../../store/thunksFunctions/userThunks/postUsersThunk";
import { HeaderBar } from "../header/HeaderAppBar";
import { ContainerStyleSmall } from "../../theme/commonThemes";

export const LoginPage = () => {
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submittedPassword, setSubmittedPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerAvatar, setRegisterAvatar] = useState("");

  const selectUserState = (state: RootState) => state.users;
  const selectUser = createSelector(selectUserState, (users) => users);
  const usersFromStore = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      navigate("/");
    } else {
      window.alert("Incorrect email or password");
    }
  };

  const handleRegistration = async () => {
    const checkUserExist = usersFromStore.users.find((user) => {
      return user.email === registerEmail;
    });

    if (!checkUserExist) {
      const newUser = {
        name: registerName,
        avatar: registerAvatar,
        email: registerEmail,
        password: registerPassword,
      };
      await dispatch(postUsersThunk(newUser));
      navigate("/");
    } else {
      window.alert("user already exists");
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
          <Button onClick={(e) => handleSignIn()} variant="outlined">
            Submit
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            mt: "2rem",
          }}
        >
          <Typography component="div" variant="h5">
            New user? Register below
          </Typography>
          <TextField
            required
            label="Name"
            defaultValue=""
            onChange={(e) => setRegisterName(e.target.value)}
          />
          <TextField
            required
            label="Link to avatar"
            defaultValue=""
            onChange={(e) => setRegisterAvatar(e.target.value)}
          />
          <TextField
            required
            label="Email address"
            defaultValue=""
            onChange={(e) => setRegisterEmail(e.target.value)}
          />
          <TextField
            required
            label="Password"
            defaultValue=""
            type="password"
            onChange={(e) => setRegisterPassword(e.target.value)}
          />
          <Button onClick={() => handleRegistration()} variant="outlined">
            Register
          </Button>
        </Box>
      </ContainerStyleSmall>
    </>
  );
};
