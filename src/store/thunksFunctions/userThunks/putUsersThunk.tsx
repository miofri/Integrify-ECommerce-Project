import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { UpdateUser } from "../../../interface/UserInfoInterface";

export const putUsersThunk = createAsyncThunk(
  "users/waitUsers",
  async (updatedUser: UpdateUser) => {
    const response = await axios.put(
      `https://api.escuelajs.co/api/v1/users/${updatedUser.id}`,
      updatedUser
    );
    console.log(response.data);

    return response.data;
  }
);
