import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import { RootState, store } from "../../store/store";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { cartSlice } from "../../store/cartSlice";
import { AllProductsInterface } from "../../interface/productsInterface";

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

  return (
    <>
      <Button onClick={handleOpen} variant="outlined">
        Cart
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {cartFromStore.map((data) => (
            <Box sx={{ marginTop: "10px" }}>
              <div>
                {data.product.title} {data.product.price}e QUANTITY:{" "}
                {data.quantity}
              </div>
              <div>{data.product.description}</div>
              <Button onClick={() => handleCartItemDelete(data.product)}>
                Delete Item
              </Button>
            </Box>
          ))}
        </Box>
      </Modal>
    </>
  );
};
