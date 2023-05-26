import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { UserCredentials, Users } from "../interface/UserInfoInterface";
import { waitUsersThunk } from "./thunksFunctions/userThunks/waitUsersThunk";

let usersInitialValue: Users = { users: [] };

export const usersSlice = createSlice({
  name: "users",
  initialState: usersInitialValue,
  reducers: {
    setUser: (state, action: PayloadAction<UserCredentials[]>) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(waitUsersThunk.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      waitUsersThunk.fulfilled,
      (state, action: PayloadAction<UserCredentials[]>) => {
        state.status = "succeeded";
        state.users = action.payload;
      }
    );
    builder.addCase(waitUsersThunk.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { setUser } = usersSlice.actions;
