import { createSlice } from "@reduxjs/toolkit";
import {
  UserCart,
  UserCredentialsAndCart,
} from "../interface/userInfoInterface";

let userInitialValue: UserCredentialsAndCart = { users: [] };

// export const userSlice = createSlice({
//   name: "users",
//   initialState: userInitialValue,
//   reducers: {
//     addUser: (state, action) => {
//       if (
//         state.users.find((item) => {
//           item.user.id !== action.payload.user.id;
//         })
//       ) {
//         const newUser: UserCart = {
//           user: action.payload,
//           cart: [],
//         };
//         state.users = state.users.concat(newUser);
//       } else {
//         const existingUser = state.users.find((item) => {
//           item.user.id === action.payload.id;
//         });
//         if (existingUser) {
//           existingUser.cart = existingUser.cart.concat(action.payload.cart);
//         }
//         //maybe need a slice for saving ALL user and also a slice for CURRENT user?
//       }
//     },
//   },
// });
