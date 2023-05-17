import { configureStore, createSlice } from "@reduxjs/toolkit";
import { categorySlice } from "./categorySlice";
import { ArrayInitialState } from "../interface/storeState";
import { productSlice } from "./productSlice";
import {
  AllProductsInterface,
  ProductState,
} from "../interface/productsInterface";

export const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
    product: productSlice.reducer,
  },
});

//Maybe need to redefine the type for these?
export type RootState = {
  category: ArrayInitialState;
  product: ProductState;
};

// export const counterSlice = createSlice({
//   name: "counter",
//   initialState: {
//     value: 0,
//   },
//   reducers: {
//     increment: (state) => {
//       state.value += 1;
//     },
//     decrement: (state) => {
//       state.value -= 1;
//     },
//     incrementByAmount: (state, action) => {
//       state.value += action.payload;
//     },
//   },
// });

// const { increment, decrement, incrementByAmount } = counterSlice.actions;

// const store = configureStore({
//   reducer: {
//     counter: counterSlice.reducer,
//   },
// });

// console.log(store.getState());
// store.dispatch(counterSlice.actions.increment());
// console.log(store.getState());
// const newState = counterSlice.reducer(
//   { value: 10 },
//   counterSlice.actions.increment()
// );
// console.log("newstate", newState);
// console.log(store.getState());
