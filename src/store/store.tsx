import { configureStore, createSlice } from "@reduxjs/toolkit";
import { categorySlice } from "./categorySlice";
import { ArrayInitialState } from "../interface/storeState";
import { productSlice } from "./productSlice";
import { ProductState } from "../interface/productsInterface";
import { cartSlice } from "./cartSlice";
import { CartState } from "../interface/cartInterface";
import { usersSlice } from "./usersSlice";
import { Users } from "../interface/userInfoInterface";
import { LoggedInUserSlice } from "./userLoggedInSlice";

export const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
    product: productSlice.reducer,
    cart: cartSlice.reducer,
    users: usersSlice.reducer,
    loggedInUser: LoggedInUserSlice.reducer,
  },
});

//Maybe need to redefine the type for these?
export type RootState = {
  category: ArrayInitialState;
  product: ProductState;
  cart: CartState;
  users: Users;
};
