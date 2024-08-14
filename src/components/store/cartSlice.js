import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    cartStatus: false, // To track cart visibility
  },
  reducers: {
    addItem(state, action) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
          id: action.payload.id,
          title: action.payload.title,
          price: action.payload.price,
          quantity: 1,
          totalPrice: action.payload.price,
        });
      }
    },
    removeItem(state, action) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      }
    },
    toggleCart(state) {
      state.cartStatus = !state.cartStatus;
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
