import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axiosPrivate";
export const getCart = createAsyncThunk("cart/getCart", async (_, thunkAPI) => {
    try {
        const response = await axios.get("/carts");
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const addToCart = createAsyncThunk("cart/addToCart", async (data, thunkAPI) => {
    try {
        const response = await axios.post("/carts", data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const removeFromCart = createAsyncThunk("cart/removeFromCart", async (id, thunkAPI) => {
    try {
        const response = await axios.delete(`/carts/${id}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});


export const clearCart = createAsyncThunk("cart/clearCart", async (_, thunkAPI) => {
    try {
        const response = await axios.delete("/carts");
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});


export const updateCart = createAsyncThunk("cart/updateCart", async ({ id, data }, thunkAPI) => {
    try {
        const response = await axios.put(`/carts/${id}`, data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});