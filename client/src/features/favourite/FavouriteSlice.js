import { createSlice } from "@reduxjs/toolkit";
import { addToFavourite, getFavourite } from "./FavouriteService";
 const favouriteSlice = createSlice({
  name: "favourite",
  initialState: {
    favouriteBooks: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFavourite.fulfilled, (state, action) => {
        console.log(action.payload);
        state.favouriteBooks = action.payload;
      })
      .addCase(addToFavourite.fulfilled, (state, action) => {
        state.favouriteBooks.push(action.payload);
      });
     
  },
});


export default favouriteSlice.reducer;