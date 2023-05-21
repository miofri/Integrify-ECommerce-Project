import { createSlice } from "@reduxjs/toolkit";
import { UserCredentials } from "../interface/userInfoInterface";
import { store } from "./store";

const userInitialState: UserCredentials = {
  id: 0,
  email: "",
  password: "",
  name: "",
  role: "",
  avatar: "",
};

export const LoggedInUserSlice = createSlice({
  name: "loggedInUser",
  initialState: userInitialState,
  reducers: {
    setLoggedUser: (state, action) => {
      const { email, password } = action.payload;
      // state.id = id;
      state.email = email;
      state.password = password;
      console.log(state);

      // state.name = name;
      // state.role = role;
      // state.avatar = avatar;
    },
  },
});

export const { setLoggedUser } = LoggedInUserSlice.actions;
