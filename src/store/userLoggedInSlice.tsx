import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { UserCredentials, UserLoggedIn } from "../interface/UserInfoInterface";
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
    setLoggedUser: (state, action: PayloadAction<UserLoggedIn>) => {
      const { id, email, password, name, role, avatar, loggedIn } =
        action.payload;
      state.id = id;
      state.email = email;
      state.password = password;
      state.name = name;
      state.role = role;
      state.avatar = avatar;
      state.loggedIn = loggedIn;
    },
    setInitialValue: (state) => {
      state = userInitialState;
    },
  },
});

export const { setLoggedUser, setInitialValue } = LoggedInUserSlice.actions;
