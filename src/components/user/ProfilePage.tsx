import { useState } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  useHandleGoToHomePage,
  useHandleGoToProfilePage,
} from "../../utils/buttonNavigate";
import { UpdateUser } from "../../interface/UserInfoInterface";
import { useAppDispatch } from "../../store/hooks";
import { RootState } from "../../store/store";
import { putUsersThunk } from "../../store/thunksFunctions/userThunks/putUsersThunk";
import {
  ContainerStyle,
  ContainerStyleSmall,
  mainTheme,
} from "../../theme/commonThemes";
import { HeaderBar } from "../header/HeaderAppBar";
import { UpdateProduct } from "./adminFeatures/UpdateProduct";
import { CreateProduct } from "./adminFeatures/CreateProduct";
import { LoginOutlined } from "@mui/icons-material";
import { LoginPage } from "./LoginPage";
import { AdminProfileView } from "./AdminProfileView";

export const Profile = () => {
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newAvatar, setNewAvatar] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newId, setNewId] = useState(0);

  const selectUserState = (state: RootState) => state.loggedInUser;
  const selectUser = createSelector(selectUserState, (state) => state);
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleGoToHomePage = useHandleGoToHomePage();
  if (!user.loggedIn) {
    navigate("/login");
    return <LoginPage />;
  }

  const handleChangeDetail = () => {
    const updateUser: UpdateUser = {
      id: newId,
    };

    if (newEmail !== "") {
      updateUser.email = newEmail;
    }
    if (newName !== "") {
      updateUser.name = newName;
    }
    if (newPassword !== "") {
      updateUser.password = newPassword;
    }
    if (newAvatar !== "") {
      updateUser.avatar = newAvatar;
    }
    if (Object.keys(updateUser).length > 0) {
      dispatch(putUsersThunk(updateUser));
    }
  };

  if (user.role === "admin") {
    return <AdminProfileView user={user} setNewId={setNewId} setNewName={setNewName} setNewAvatar={setNewAvatar} setNewPassword={setNewPassword} setNewEmail={setNewEmail} handleChangeDetail={handleChangeDetail}/>;
  } else {
    return (
      <>
        <HeaderBar />
        <ContainerStyleSmall sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ color: "white" }}>
            <h2>User profile</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>
              Avatar: <Avatar src={user.avatar}></Avatar>
            </p>
            <p>Customer ID: {user.id}</p>
          </Box>
          <Box sx={{ alignSelf: "flex-end" }}>
            <Button onClick={handleGoToHomePage} variant="outlined">
              Back to home
            </Button>
          </Box>
        </ContainerStyleSmall>
      </>
    );
  }
};
