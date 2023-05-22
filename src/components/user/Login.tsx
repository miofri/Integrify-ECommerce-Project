import { Button, TextField } from "@mui/material";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { RootState, store } from "../../store/store";
import { LoggedInUserSlice } from "../../store/userLoggedInSlice";
import { useAppDispatch } from "../../store/hooks";
import { postUsersThunk } from "../../store/thunksFunctions/postUsersThunk";

export const Login = () => {
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [submittedPassword, setSubmittedPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerAvatar, setRegisterAvatar] = useState("");

  const selectUserState = (state: RootState) => state.users;
  const selectUser = createSelector(selectUserState, (user) => user);
  const usersFromStore = useSelector(selectUser).users;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignIn = () => {
    const checkUserExist = usersFromStore.find((user) => {
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

  const handleRegistration = () => {
    const checkUserExist = usersFromStore.find((user) => {
      return user.email === registerEmail;
    });

    if (!checkUserExist) {
      const newUser = {
        name: registerName,
        avatar: registerAvatar,
        email: registerEmail,
        password: registerPassword,
      };
      dispatch(postUsersThunk(newUser));
    } else {
      window.alert("user already exists");
    }
  };

  return (
    <>
      <Button href="/" variant="outlined">
        Back to start
      </Button>
      <form>
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

        <h2>New user? Register below</h2>
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
      </form>
    </>
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
