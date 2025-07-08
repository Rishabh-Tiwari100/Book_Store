import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axiosPrivate";


export const createOrder = createAsyncThunk("order/createOrder", async (data, thunkAPI) => {
    try {
        const response = await axios.post("/orders", data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const getAllOrders = createAsyncThunk("order/getAllOrders", async (_, thunkAPI) => {
    try {
        const response = await axios.get("/orders");
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});


export const getOrderById = createAsyncThunk("order/getOrderById", async (id, thunkAPI) => {
    try {
        const response = await axios.get(`/orders/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});


export const deleteOrder = createAsyncThunk("order/deleteOrder", async (id, thunkAPI) => {
    try {
        const response = await axios.delete(`/orders/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});


export const updateOrder = createAsyncThunk("order/updateOrder", async ({ id, data }, thunkAPI) => {
    try {
        console.log("update order")
        console.log(id,data);
        const response = await axios.put(`/orders/${id}`, data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});


export const getOrdersByUserId = createAsyncThunk("order/getOrdersByUserId", async (id, thunkAPI) => {
    try {
        const response = await axios.get(`/orders/user/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
