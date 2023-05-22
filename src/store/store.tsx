import { configureStore, createSlice } from "@reduxjs/toolkit";
import { categorySlice } from "./categorySlice";
import { ArrayInitialState } from "../interface/StoreState";
import { productSlice } from "./productSlice";
import { ProductState } from "../interface/ProductsInterface";
import { cartSlice } from "./cartSlice";
import { CartState } from "../interface/CartInterface";
import { usersSlice } from "./usersSlice";
import { UserLoggedIn, Users } from "../interface/UserInfoInterface";
import { LoggedInUserSlice } from "./userLoggedInSlice";
import { CategoryArray } from "../interface/SingleProductInterface";

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
  category: CategoryArray;
  product: ProductState;
  cart: CartState;
  users: Users;
  loggedInUser: UserLoggedIn;
};
