import { configureStore, createSlice } from "@reduxjs/toolkit";

type CategoryState = {
  value: string[];
};

let categoryInitialValue: CategoryState = { value: [] };

export const categorySlice = createSlice({
  name: "category",
  initialState: categoryInitialValue,
  reducers: {
    setCategory: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;

export const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
  },
});

export type RootState = {
  category: CategoryState;
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
