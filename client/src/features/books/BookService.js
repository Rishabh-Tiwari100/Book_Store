import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axiosPrivate";

export const getAllBooks = createAsyncThunk(
  "books/getAllBooks",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/books");
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getBookById = createAsyncThunk(
  "books/getBookById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/books/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createBook = createAsyncThunk(
  "books/createBook",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post("/books", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/books/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateBook = createAsyncThunk(
  "books/updateBook",
  async ({ id, data }, thunkAPI) => {
    data.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    try {
      const response = await axios.put(`/books/${id}`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);
