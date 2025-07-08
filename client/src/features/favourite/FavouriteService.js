import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axiosPrivate";

export const getFavourite = createAsyncThunk("favourite/getFavourite", async (_, thunkAPI) => {
    try {
        const response = await axios.get("/books/favourites");
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const addToFavourite = createAsyncThunk("favourite/addToFavourite", async (data, thunkAPI) => {
    try {
        const response = await axios.post("/books/favourites", data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});




