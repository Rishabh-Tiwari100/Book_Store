import { createSlice } from "@reduxjs/toolkit";
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "./BookService";

export const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    isLoading: false,
    error: null,
    book: null,
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
      })
      .addCase(getAllBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getBookById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBookById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.book = action.payload;
      })
      .addCase(getBookById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = state.books.map((book) =>
          book._id === action.payload._id ? action.payload : book
        );
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = state.books.filter((book) => book._id !== action.payload);
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books.push(action.payload);
      })
      .addCase(createBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setBooks, setLoading, setError } = bookSlice.actions;
export default bookSlice.reducer;