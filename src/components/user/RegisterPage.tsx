import { Box, Typography, TextField, Button } from "@mui/material";
import { createSelector } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../store/hooks";
import { RootState } from "../../store/store";
import { postUsersThunk } from "../../store/thunksFunctions/userThunks/postUsersThunk";
import { useNavigate } from "react-router-dom";
import { ContainerStyleSmall } from "../../theme/commonThemes";
import { HeaderBar } from "../header/HeaderAppBar";

export const RegisterPage = () => {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerAvatar, setRegisterAvatar] = useState("");

  const selectUserState = (state: RootState) => state.users;
  const selectUser = createSelector(selectUserState, (users) => users);
  const usersFromStore = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      navigate("/login");
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
