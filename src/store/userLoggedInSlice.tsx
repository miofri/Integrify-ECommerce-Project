import { createSlice } from "@reduxjs/toolkit";
import { UserCredentials } from "../interface/userInfoInterface";

const userInitialState: UserCredentials = {
  id: 0,
  email: "",
  password: "",
  name: "",
  role: "",
  avatar: "",
};

export const userLoggedInSlice = createSlice({
  name: "loggedInUser",
  initialState: userInitialState,
  reducers: {
    setLoggedUser: (state, action) => {},
  },
});
