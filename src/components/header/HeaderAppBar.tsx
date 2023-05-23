import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";

import { RootState, store } from "../../store/store";
import { LoggedInUser } from "../user/LoggedInUser";
import { LoggedInUserSlice } from "../../store/userLoggedInSlice";
import {
  useHandleGoToAllProducts,
  useHandleGoToHomePage,
  useHandleGoToProfilePage,
} from "../../utils/buttonNavigate";
import { useNavigate } from "react-router-dom";
import { CartModal } from "../cart/cartModal";

export const HeaderBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const loggedInValue = useSelector(
    (state: RootState) => state.loggedInUser.loggedIn
  );
  const handleLogOut = () => {
    store.dispatch(LoggedInUserSlice.actions.setInitialValue());
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleGoToProfilePage = useHandleGoToProfilePage();
  const handleGoToHomePage = useHandleGoToHomePage();
  const handleAllProductButton = useHandleGoToAllProducts();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Tooltip title="Menu">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleGoToHomePage}>Home</MenuItem>
            <MenuItem onClick={handleAllProductButton}>All products</MenuItem>
            <MenuItem>
              <CartModal />
            </MenuItem>
          </Menu>
          <Box sx={{ flexGrow: 2 }}>
            <Tooltip title="Back to home page">
              <Typography
                variant="h3"
                component="div"
                onClick={handleGoToHomePage}
              >
                Platzi
              </Typography>
            </Tooltip>
          </Box>
          <Box sx={{ flexGrow: 2 }}>
            <Typography variant="body1" component="div">
              We have everything you need!
            </Typography>
          </Box>
          {loggedInValue ? (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <LoggedInUser />
              <Button onClick={handleGoToProfilePage} variant="outlined">
                Go to profile
              </Button>
              <Button
                href="/"
                onClick={() => handleLogOut()}
                variant="outlined"
              >
                Log out
              </Button>
            </Box>
          ) : (
            <Box>
              <Button href="/login" variant="outlined" type="submit">
                Sign in <LoginIcon />
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
