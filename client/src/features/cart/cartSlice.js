import { createSlice } from "@reduxjs/toolkit";
import { addToCart, removeFromCart, getCart, updateCart } from "./cartService";
 const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart.push(action.payload);
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.cart = state.cart.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addMatcher(
        (action) =>
          action.type.startsWith("cart/") && action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("cart/") && action.type.endsWith("/fulfilled"),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        (action) =>
          action.type.startsWith("cart/") && action.type.endsWith("/rejected"),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export default cartSlice.reducer;
