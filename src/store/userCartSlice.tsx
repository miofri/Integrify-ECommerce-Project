import { createSlice } from "@reduxjs/toolkit";
import { UserCredentialsAndCart } from "../interface/userInfoInterface";

let usersInitialValue: UserCredentialsAndCart = { users: [] };

export const userCartSlice = createSlice({
  name: "userCartSlice",
  initialState: usersInitialValue,
  reducers: {
    setUser: (state, action) => {
      state.users = action.payload;
      console.log(state.users);
    },
  },
});

export const { setUser } = userCartSlice.actions;
