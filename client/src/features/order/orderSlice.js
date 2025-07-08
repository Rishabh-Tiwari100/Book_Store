import { createSlice } from "@reduxjs/toolkit";
import {
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
  createOrder,
} from "./orderService";
export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    order: {},
    isLoading: false,
    error: null,
    
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getOrdersByUserId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrdersByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        console.log(action.payload);
      })
      .addCase(getOrdersByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedOrder = action.payload;
        state.orders = state.orders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
