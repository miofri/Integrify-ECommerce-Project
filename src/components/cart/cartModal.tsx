import { Box, Button, Modal, Typography } from "@mui/material";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState, store } from "../../store/store";

import { cartSlice } from "../../store/cartSlice";
import { AllProductsInterface } from "../../interface/ProductsInterface";

//Copy pasted style from MUI just to make sure modal is working
const style = {
  position: "absolute" as "absolute",
  color: "white",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const CartModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const selectCartState = (state: RootState) => state.cart;
  const selectCart = createSelector(selectCartState, (cart) => cart);
  const cartFromStore = useSelector(selectCart).cartItems;

  const handleCartItemDelete = (data: AllProductsInterface) => {
    store.dispatch(cartSlice.actions.deleteProduct(data));
  };
  const handleAddItem = (data: AllProductsInterface) => {
    store.dispatch(cartSlice.actions.addProduct(data));
  };
  const handleReduceQuantity = (data: AllProductsInterface) => {
    const item = cartFromStore.find(
      (cartData) => cartData.product.id === data.id
    );
    if (item && item.quantity > 1) {
      store.dispatch(cartSlice.actions.reduceQuantity(data));
    } else {
      store.dispatch(cartSlice.actions.deleteProduct(data));
    }
  };

  return (
    <>
      <Typography onClick={handleOpen} component={"span"}>
        Cart
      </Typography>
      <Modal open={open} onClose={handleClose}>
        {cartFromStore.length < 1 ? (
          <Box sx={style}> Cart is empty</Box>
        ) : (
          <Box sx={style}>
            {cartFromStore.map((data) => (
              <Box sx={{ marginTop: "10px" }}>
                <div>
                  {data.product.title} {data.product.price}e
                </div>
                <div>{data.product.description}</div>
                <Button onClick={() => handleCartItemDelete(data.product)}>
                  Delete Item
                </Button>
                <div>
                  <Button
                    variant="outlined"
                    onClick={() => handleAddItem(data.product)}
                  >
                    +
                  </Button>
                  {data.quantity}
                  <Button
                    variant="outlined"
                    onClick={() => handleReduceQuantity(data.product)}
                  >
                    -
                  </Button>
                </div>
              </Box>
            ))}
          </Box>
        )}
      </Modal>
    </>
  );
};
