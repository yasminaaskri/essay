"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  _id: string;
  ref: string;
}

const cartSlice = createSlice({
  name: "Cart",
  initialState: [] as Product[],
  reducers: {
    add(state, action: PayloadAction<Product>) {
      state.push({ ...action.payload, ref: Date.now().toString() });
    },
    remove(state, action: PayloadAction<string>) {
      console.log(action);
      return state.filter((item) => item.ref !== action.payload);
    },
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
