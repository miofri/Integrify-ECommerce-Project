import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RegisterUser, UpdateUser } from "../../interface/userInfoInterface";

export const putUsersThunk = createAsyncThunk(
  "users/updateUsers",
  async (updatedUser: UpdateUser) => {
    const response = await axios.put(
      `https://api.escuelajs.co/api/v1/users/${updatedUser.id}`,
      updatedUser
    );
    console.log(response.data);
    return response.data;
  }
);
