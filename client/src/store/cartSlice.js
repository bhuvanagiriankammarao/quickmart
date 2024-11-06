import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add(state, action) {
      const existingItem = state.find(item => item.name === action.payload.name);
      if (existingItem) {
        existingItem.quantity += 1; // If item exists, increase quantity
      } else {
        state.push({ ...action.payload, quantity: 1 }); // Add new item with initial quantity
      }
    },
    remove(state, action) {
      return state.filter(item => item.name !== action.payload.name);
    },
    increment(state, action) {
      const item = state.find(item => item.name === action.payload.name);
      if (item) {
        item.quantity += 1;
      }
    },
    decrement(state, action) {
      const item = state.find(item => item.name === action.payload.name);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else if (item && item.quantity === 1) {
        // Optionally remove the item if the quantity is 1 and user tries to decrement
        return state.filter(cartItem => cartItem.name !== action.payload.name);
      }
    }


    
 
 
  }
  
});

export const { add, remove, increment, decrement } = cartSlice.actions;
export default cartSlice.reducer;
export const selectTotalPrice = (state) =>
  state.cart.reduce((total, product) => total + product.price * product.quantity, 0);
