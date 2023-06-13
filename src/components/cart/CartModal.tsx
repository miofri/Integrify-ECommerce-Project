import {
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import { createSelector } from "@reduxjs/toolkit";
import { createSelectorHook, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState, store } from "../../store/store";

import { cartSlice } from "../../store/cartSlice";
import { Products } from "../../interface/ProductsInterface";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { mainTheme } from "../../theme/commonThemes";

//Copy pasted style from MUI just to make sure modal is working
const style = {
  position: "absolute" as "absolute",
  color: "white",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 6,
  borderRadius: "2rem",
};

export const CartModal = () => {
  const [open, setOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const selectCartState = (state: RootState) => state.cart;
  const selectCart = createSelector(selectCartState, (cart) => cart);
  const cartFromStore = useSelector(selectCart).cartItems;

  const handleCartItemDelete = (data: Products) => {
    store.dispatch(cartSlice.actions.deleteProduct(data));
  };
  const handleAddItem = (data: Products) => {
    store.dispatch(cartSlice.actions.addProduct(data));
  };
  const handleReduceQuantity = (data: Products) => {
    const item = cartFromStore.find(
      (cartData) => cartData.product.id === data.id
    );
    if (item && item.quantity > 1) {
      store.dispatch(cartSlice.actions.reduceQuantity(data));
    } else {
      store.dispatch(cartSlice.actions.deleteProduct(data));
    }
  };
  useEffect(() => {
    const allPrices = cartFromStore.map(
      (data) => data.product.price * data.quantity
    );
    const initialValue = 0;
    const total = allPrices.reduce(
      (acc, currVal) => acc + currVal,
      initialValue
    );
    setTotalPrice(total);
  }, [cartFromStore]);

  return (
    <>
      <Tooltip title="Cart" onClick={handleOpen}>
        <IconButton>
          <ShoppingCartIcon />
        </IconButton>
      </Tooltip>
      <Modal open={open} onClose={handleClose}>
        {cartFromStore.length < 1 ? (
          <Box sx={style}> Cart is empty</Box>
        ) : (
          <Box sx={style}>
            {cartFromStore.map((data) => (
              <Box key={data.product.id} sx={{ marginTop: "10px" }}>
                <Typography component="div" variant="h5">
                  {data.product.title}
                </Typography>
                <Typography component="div" variant="subtitle2">
                  {data.product.price}€
                </Typography>
                <Typography component="div" variant="body1">
                  {data.product.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={() => handleCartItemDelete(data.product)}
                    variant="outlined"
                    sx={{ my: "1rem" }}
                  >
                    Delete Item
                  </Button>
                  <Box>
                    <Button
                      variant="text"
                      onClick={() => handleAddItem(data.product)}
                    >
                      +
                    </Button>
                    {data.quantity}
                    <Button
                      variant="text"
                      onClick={() => handleReduceQuantity(data.product)}
                    >
                      -
                    </Button>
                  </Box>
                </Box>
                <Divider variant="middle" />
              </Box>
            ))}
            <Box
              sx={{
                backgroundColor: mainTheme.palette.divider,
                padding: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>Total: {totalPrice}€</Box>
              <Box>
                <Button variant="contained">Purchase</Button>
              </Box>
            </Box>
          </Box>
        )}
      </Modal>
    </>
  );
};
