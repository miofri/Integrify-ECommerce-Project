import { createSlice } from "@reduxjs/toolkit";

import { Users } from "../interface/userInfoInterface";
import { waitUsersThunk } from "./thunksFunctions/waitUsersThunk";

let usersInitialValue: Users = { users: [] };

export const usersSlice = createSlice({
  name: "users",
  initialState: usersInitialValue,
  reducers: {
    setUser: (state, action) => {
      state.users = action.payload;
      console.log(state.users);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(waitUsersThunk.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(waitUsersThunk.fulfilled, (state, action) => {
      state.status = "succeeded";

      state.users = action.payload;
    });
    builder.addCase(waitUsersThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { setUser } = usersSlice.actions;
