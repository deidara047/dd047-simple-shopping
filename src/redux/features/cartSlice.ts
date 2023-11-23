import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: 15
  },
  reducers: {
    incrementValue: (state) => {
      state.value += 1;
    },
    decrementValue: (state) => {
      state.value -= 1;
    },
  },
});

export default cartSlice.reducer;

export const { incrementValue, decrementValue } = cartSlice.actions;
