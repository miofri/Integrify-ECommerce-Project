import { createSlice } from "@reduxjs/toolkit";
import { UserCredentials, UserLoggedIn } from "../interface/userInfoInterface";
import { store } from "./store";

const userInitialState: UserLoggedIn = {
  id: 0,
  email: "",
  password: "",
  name: "",
  role: "",
  avatar: "",
  loggedIn: false,
};

export const LoggedInUserSlice = createSlice({
  name: "loggedInUser",
  initialState: userInitialState,
  reducers: {
    setLoggedUser: (state, action) => {
      const { id, email, password, name, role, avatar } = action.payload;
      state.id = id;
      state.email = email;
      state.password = password;
      state.name = name;
      state.role = role;
      state.avatar = avatar;
      state.loggedIn = true;
    },
  },
});

export const { setLoggedUser } = LoggedInUserSlice.actions;
