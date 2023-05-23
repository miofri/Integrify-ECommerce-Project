import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { Avatar, Box } from "@mui/material";

import { RootState } from "../../store/store";

export const LoggedInUser = () => {
  const selectUserState = (state: RootState) => state.loggedInUser;
  const selectUser = createSelector(selectUserState, (user) => user);
  const user = useSelector(selectUser);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Avatar alt={user.name} src={user.avatar}></Avatar>
      {user.name}
    </Box>
  );
};
