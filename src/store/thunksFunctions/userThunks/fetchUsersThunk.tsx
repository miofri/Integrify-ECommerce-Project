import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const fetchUsersThunk = createAsyncThunk("users/waitUsers", async () => {
  const response = await axios.get("https://api.escuelajs.co/api/v1/users");
  return response.data;
});
