import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const existingItem = state.find(item => item.name === action.payload.name);
      if (!existingItem) {
        state.push({ ...action.payload });
      }
    },
    removeFromWishlist(state, action) {
      return state.filter(item => item.name !== action.payload.name);
    }
  }
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
