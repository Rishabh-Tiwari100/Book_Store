import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import bookSlice from "../features/books/bookSlice";
import cartSlice from "../features/cart/cartSlice";
import orderSlice from "../features/order/orderSlice";
import favouriteSlice from "../features/favourite/FavouriteSlice";
const store = configureStore({
    reducer: {
        auth: authSlice,
        books: bookSlice,
        cart: cartSlice,
        order: orderSlice,
        favourite: favouriteSlice
    },
});

export default store;