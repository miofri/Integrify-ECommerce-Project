import {
  Box,
  Container,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import React from "react";
import { UserLoggedIn } from "../../interface/UserInfoInterface";
import { mainTheme } from "../../theme/commonThemes";
import { HeaderBar } from "../header/HeaderAppBar";
import { CreateProduct } from "./adminFeatures/CreateProduct";
import { UpdateProduct } from "./adminFeatures/UpdateProduct";

interface inputAdminProfileView {
  user: UserLoggedIn;
  setNewId: (value: React.SetStateAction<number>) => void;
  setNewName: (value: React.SetStateAction<string>) => void;
  setNewAvatar: React.Dispatch<React.SetStateAction<string>>;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  setNewEmail: (value: React.SetStateAction<string>) => void;
  handleChangeDetail: () => void;
}

export const AdminProfileView = (
{user, setNewId, setNewName, setNewAvatar, setNewPassword, setNewEmail, handleChangeDetail}: inputAdminProfileView
) => {
  return (
    <>
      {" "}
      <HeaderBar />
      <Box sx={{ p: "2rem" }}>
        <Container>
          <Box
            sx={{
              color: "white",
              backgroundColor: mainTheme.palette.background.paper,
              padding: "2rem",
              borderRadius: "2rem",
            }}
          >
            <h2>User profile</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Avatar: </p>
            <Avatar alt={user.name} src={user.avatar}></Avatar>
            <p>Customer ID: {user.id}</p>
          </Box>
          <Box
            sx={{
              color: "white",
              mt: "2rem",
              backgroundColor: mainTheme.palette.background.paper,
              padding: "2rem",
              borderRadius: "2rem",
            }}
          >
            <Typography variant={"h4"}>Edit user</Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flexFlow: "row wrap",
                gap: "1rem",
              }}
            >
              <TextField
                label="User ID"
                type="number"
                defaultValue=""
                name="User ID"
                onChange={(e) => setNewId(Number(e.target.value))}
              />
              <TextField
                label="Name"
                defaultValue=""
                name="name"
                onChange={(e) => setNewName(e.target.value)}
              />
              <TextField
                label="Link to avatar"
                defaultValue=""
                name="avatar"
                onChange={(e) => setNewAvatar(e.target.value)}
              />
              <TextField
                label="Email address"
                defaultValue=""
                name="email"
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <TextField
                label="Password"
                defaultValue=""
                type="password"
                name="password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Button onClick={() => handleChangeDetail()} variant="contained">
                Save
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              color: "white",
              mt: "2rem",
              backgroundColor: mainTheme.palette.background.paper,
              padding: "2rem",
              borderRadius: "2rem",
            }}
          >
            <UpdateProduct />
          </Box>
          <Box
            sx={{
              color: "white",
              mt: "2rem",
              backgroundColor: mainTheme.palette.background.paper,
              padding: "2rem",
              borderRadius: "2rem",
            }}
          >
            <CreateProduct />
          </Box>
        </Container>
      </Box>
    </>
  );
};
