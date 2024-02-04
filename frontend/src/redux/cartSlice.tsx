// Cartslice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  // Add other properties based on the actual product structure
}

const cartSlice = createSlice({
  name: "Cart",
  initialState: [] as Product[],
  reducers: {
    add(state, action: PayloadAction<Product>) {
      state.push(action.payload);
    },
    remove(state, action: PayloadAction<number>) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
